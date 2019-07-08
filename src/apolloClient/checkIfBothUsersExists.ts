import USER_QUERY,
{
  IUserQueryData,
  IUserQueryVars,
} from '../queries/checkUsersExists'
import messages from '../messages'
import { IApolloClient } from './resolvers'

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

export default checkIfBothUsersExists
