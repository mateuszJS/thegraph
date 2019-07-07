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

const LoaderWrapper = styled.div`
  text-align: center;
`
const { amount, ethSymbol, zeroTransactions } = messages

const renderContent = ({
  data,
  error,
  loading,
}: QueryResult<ITransactionsQueryData, ITransactionsQueryVars>) => {
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
    return data.transactions.map(({ id, event, ethAmount }) => (
      <List key={id}>
        <ListItem divider>
          <ListItemText
            primary={event}
            secondary={`${amount}: ${ethAmount}  ${ethSymbol}`}
          />
        </ListItem>
      </List>
    ))
  }
  return <Typography>{zeroTransactions}</Typography>
}

export default renderContent
