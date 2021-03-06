import React from 'react'
import { QueryResult } from 'react-apollo'
import styled from 'styled-components'
import {
  List, ListItem, CircularProgress, ListItemText, ErrorText, Typography,
} from '../common'
import {
  ITransactionsQueryData,
  ITransactionsQueryVars,
} from '../../queries/transactions'
import messages from '../../messages'

type IProps = QueryResult<ITransactionsQueryData, ITransactionsQueryVars>

const LoaderWrapper = styled.div`
  text-align: center;
`

const getDetails = (ethAmount: string) =>
  `${messages.amount}: ${ethAmount}  ${messages.ethSymbol}`

const TransactionsList: React.FC<IProps> = ({
  data,
  error,
  loading,
}) => {
  if (loading) {
    return (
      <LoaderWrapper>
        <CircularProgress />
      </LoaderWrapper>
    )
  }
  if (error) {
    return <ErrorText>{error.message}</ErrorText>
  }
  if (data && data.transactions.length) {
    return (
      <List>
        {data.transactions.map(({ id, event, ethAmount }) => (
          <ListItem divider key={id}>
            <ListItemText
              primary={event}
              secondary={getDetails(ethAmount)}
            />
          </ListItem>
        ))}
      </List>
    )
  }
  return <Typography>{messages.zeroTransactions}</Typography>
}

export default TransactionsList
