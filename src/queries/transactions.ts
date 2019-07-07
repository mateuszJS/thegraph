import gql from 'graphql-tag'

export interface ITransaction {
  id: string
  ethAmount: string
  __typename: string
}

export interface TransactionsQueryData {
  transactions: ITransaction[]
}

export interface TransactionsQueryVars {
  id: string
}

export default gql`
  query Transactions_Query($id: ID!) {
    transactions(where: {
      user: $id
    }) {
      id
      ethAmount
    }
  }
`
