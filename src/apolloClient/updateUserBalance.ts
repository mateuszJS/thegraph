import { IApolloClient } from './resolvers'
import USERS_QUERY, { IUsersQueryData } from '../queries/users'
import messages from '../messages'

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

export default updateUserBalance
