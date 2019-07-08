import ApolloClient, { Resolvers } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import uuid from 'uuid/v4'
import USERS_QUERY, { IUsersQueryData } from '../queries/users'
import USER_QUERY,
{
  IUserQueryData,
  IUserQueryVars,
} from '../queries/checkUsersExists'
import TRANSACTIONS_QUERY,
{
  ITransactionsQueryData,
  ITransaction,
} from '../queries/transactions'
import messages from '../messages';
import { evenEthPurchase } from '../consts';

type IApolloClient = ApolloClient<NormalizedCacheObject>

const defaultTransactionsQueryData = {
  transactions: [],
}
const getTransactionsData = async (client: IApolloClient, id: string) => {
  try {
    const queryOptions = {
      query: TRANSACTIONS_QUERY,
      variables: { id },
    }
    // NOTE: If transactions for this user weren't fetched yet,
    // it will make a request to API,
    // so we will have external and local transactions together in store
    await client.query(queryOptions)
    const data = client.readQuery<ITransactionsQueryData>(queryOptions)

    return data || defaultTransactionsQueryData
  } catch (e) {
    return defaultTransactionsQueryData
  }
}

const updateUserTransactionsList = async (
  client: IApolloClient,
  id: string,
  amount: number,
  isSender: boolean,
) => {
  const transactionsData = await getTransactionsData(client, id)
  const newTransaction: ITransaction = {
    id: uuid(),
    ethAmount: `${amount}`,
    event: evenEthPurchase,
    __typename: 'Transaction',
  }

  transactionsData.transactions = [
    ...transactionsData.transactions,
    newTransaction,
  ]

  client.writeQuery({
    query: TRANSACTIONS_QUERY,
    variables: { id },
    data: transactionsData,
  })
}

const checkIfBothUsersExists = async (
  client: IApolloClient,
  sender: string,
  recipient: string,
) => {
  const exists = await client.query<IUserQueryData, IUserQueryVars>({
    query: USER_QUERY,
    variables: { ids: [sender, recipient] },
  })

  if (exists.data.users.length < 2) {
    throw new Error(messages.invalidIds)
  }
}

const updateUserBalance = (
  client: IApolloClient,
  id: string,
  amount: number,
  isSender: boolean,
) => {
  const data = client.readQuery<IUsersQueryData>({ query: USERS_QUERY })
  if (!data) {
    throw new Error(messages.errorTransaction)
  }

  data.users = data.users.map(user => {
    if (user.id === id) {
      return {
        ...user,
        exchangeBalances: [
          ...user.exchangeBalances,
          {
            __typename: 'UserExchangeData',
            ethBought: isSender ? '0' : `${amount}`,
            ethSold: isSender ? `${amount}` : '0',
          },
        ],
        __typename: 'User',
      }
    }
    return user
  })

  client.writeQuery({ query: USERS_QUERY, data })
}

const resolvers: Resolvers = {
  Mutation: {
    transfer: async (_, variables, { client }) => {
      const { fromUser, toUser, amount } = variables
      const amountNumber = parseFloat(amount)

      await checkIfBothUsersExists(client, fromUser, toUser)
      updateUserBalance(client, fromUser, amountNumber, true)
      updateUserBalance(client, toUser, amountNumber, false)
      await updateUserTransactionsList(client, fromUser, amountNumber, true)
      await updateUserTransactionsList(client, toUser, amountNumber, false)

      return null
    },
  },
}

export default resolvers
