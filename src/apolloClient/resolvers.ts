import ApolloClient, { Resolvers } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import USERS_QUERY, { UsersQueryData } from '../queries/users'
import TRANSACTIONS_QUERY,
{
  TransactionsQueryData,
  ITransaction,
} from '../queries/transactions'

type IApolloClient = ApolloClient<NormalizedCacheObject>

const getTransactionsData = (client: IApolloClient, id: string) => {
  try {
    const data = client.readQuery({
      query: TRANSACTIONS_QUERY,
      variables: { id },
    }) as TransactionsQueryData
    return data
  } catch (e) {
    return {
      transactions: [],
    }
  }
}

const updateUserTransactionsList = (
  client: IApolloClient,
  id: string,
  amount: number,
  isSender: boolean,
) => {
  const transactionsData = getTransactionsData(client, id)
  const newTransaction: ITransaction = {
    id: `${Math.random()}`,
    ethAmount: `${amount}`,
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

const updateUserBalance = (
  client: ApolloClient<NormalizedCacheObject>,
  id: string,
  amount: number,
  isSender: boolean,
) => {
  const data: UsersQueryData | null = client.readQuery({ query: USERS_QUERY })
  if (!data) {
    throw new Error(
      'Transactions cannot be performed before users\'ll be loaded',
    )
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
    transfer: (_, variables, { client }) => {
      const { fromUser, toUser, amount } = variables
      const amountNumber = parseFloat(amount)

      updateUserTransactionsList(client, fromUser, amountNumber, true)
      updateUserTransactionsList(client, toUser, amountNumber, false)
      updateUserBalance(client, fromUser, amountNumber, true)
      updateUserBalance(client, toUser, amountNumber, false)

      return null
    },
  },
}

export default resolvers
