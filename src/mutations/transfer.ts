import gql from 'graphql-tag'

export interface TransferMutationData {
  fromId: string
  toId: string
  amount: string
}

export interface TransferMutationVars {
  sender: string
  recipient: string
  amount: string
}

export default gql`
  mutation Transfer_Mutation($sender: ID!, $recipient: ID!, $amount: Float!) {
    transfer(
      fromUser: $sender,
      toUser: $recipient,
      amount: $amount
    )  @client {
      fromUser: ID
      toUser: ID
      amount: Float
    }
  }
`
