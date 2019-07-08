import ApolloClient, { Resolvers } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import checkIfBothUsersExists from './checkIfBothUsersExists'
import updateUserBalance from './updateUserBalance'
import updateUserTransactionsList from './updateUserTransactionsList'

export type IApolloClient = ApolloClient<NormalizedCacheObject>

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
