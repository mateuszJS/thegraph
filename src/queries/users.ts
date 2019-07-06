import gql from 'graphql-tag'

export interface IUser {
  id: string
}

export interface UsersQueryData {
  users: IUser[]
}

export interface UsersQueryVars {
  skip?: number
  first?: number
}

const perPage = 3

export default gql`
  query Users_Query($skip: Int = 0, $first: Int = ${perPage}) {
    users(skip: $skip, first: $first) {
      id
    }
  }
`
