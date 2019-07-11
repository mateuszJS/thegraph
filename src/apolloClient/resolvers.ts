import ApolloClient, { Resolvers } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import checkIfBothUsersExists from './checkIfBothUsersExists'
import updateUserBalance from './updateUserBalance'
import updateUserTransactions from './updateUserTransactions'

export type IApolloClient = ApolloClient<NormalizedCacheObject>

const resolvers: Resolvers = {
  Mutation: {
    transfer: async (_, variables, { client }) => {
      const { fromUser, toUser, amount } = variables
      const amountNumber = parseFloat(amount)

      await checkIfBothUsersExists(client, fromUser, toUser)
      updateUserBalance(client, fromUser, amountNumber, true)
      updateUserBalance(client, toUser, amountNumber, false)
      await updateUserTransactions(client, fromUser, amountNumber, true)
      await updateUserTransactions(client, toUser, amountNumber, false)

      return null
    },
  },
}

export default resolvers
