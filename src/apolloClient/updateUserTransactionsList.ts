import uuid from 'uuid/v4'
import TRANSACTIONS_QUERY,
{
  ITransactionsQueryData,
  ITransaction,
} from '../queries/transactions'
import { tokenEthPurchase, eventEthPurchase } from '../consts'
import { IApolloClient } from './resolvers'

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
    event: isSender ? eventEthPurchase : tokenEthPurchase,
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

export default updateUserTransactionsList
