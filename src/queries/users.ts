import gql from 'graphql-tag'
import { numberOfUsersToLoad } from '../consts'

export interface IExchangeBalance {
  ethSold: string
  ethBought: string
  __typename: 'UserExchangeData'
}

export interface IUser {
  id: string
  exchangeBalances: IExchangeBalance[]
  __typename: 'User'
}

export interface IUsersQueryData {
  users: IUser[]
}

export interface IUsersQueryVars {
  skip?: number
  first?: number
}

export default gql`
  query Users_Query($skip: Int = 0, $first: Int = ${numberOfUsersToLoad}) {
    users(skip: $skip, first: $first) {
      id
      exchangeBalances {
        ethSold
        ethBought
      }
    }
  }
`
