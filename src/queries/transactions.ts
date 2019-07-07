import gql from 'graphql-tag'

export interface ITransaction {
  id: string
  ethAmount: string
  __typename: 'Transaction'
}

export interface ITransactionsQueryData {
  transactions: ITransaction[]
}

export interface ITransactionsQueryVars {
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
