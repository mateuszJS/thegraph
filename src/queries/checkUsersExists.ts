import gql from 'graphql-tag'

export interface IUserQueryData {
  users: Array<{ id: string, __typename: 'User' }>
}

export interface IUserQueryVars {
  ids: [string, string]
}

export default gql`
  query Check_Users_Query($ids: [ID!]) {
    users(where: {
      id_in: $ids
    }) {
      id
    }
  }
`

// export default gql`
//   query Check_Users_Query($sender: ID!, $recipient: ID!) {
//     users(where: {
//       id_in: [
//         $sender,
//         $recipient
//       ]
//     }) {
//       id
//     }
//   }
// `
