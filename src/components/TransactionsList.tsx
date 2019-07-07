import React from 'react'
import { Query, QueryResult } from 'react-apollo'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import ListItemText from '@material-ui/core/ListItemText'
import TRANSACTIONS_QUERY,
{
  TransactionsQueryData,
  TransactionsQueryVars,
} from '../queries/transactions'
import messages from '../messages'

const LoaderWrapper = styled.div`
  text-align: center;
`

interface IProps {
  userId: string | null
  hideTransactions: VoidFunction
}
const getContent = ({
  data,
  error,
  loading,
}: QueryResult<TransactionsQueryData, TransactionsQueryVars>) => {

  if (loading) {
    return (
      <LoaderWrapper>
        <CircularProgress />
      </LoaderWrapper>
    )
  }

  if (error || !data) {
    return <p>Error: {error}</p>
  }

  return data.transactions.map(transaction => (
    <List
      component="nav"
      aria-label="Main mailbox folders"
      key={transaction.id}
    >
      <ListItem button>
        <ListItemText
          primary={transaction.id}
          secondary={transaction.ethAmount}
        />
      </ListItem>
    </List>
  ))
}

const TransactionsList: React.FC<IProps> = ({ userId, hideTransactions }) => (
  <Dialog
    open={!!userId}
    onClose={hideTransactions}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    fullWidth
    maxWidth="sm"
  >
    <DialogTitle id="alert-dialog-title">
      {messages.transactionsTitle}
    </DialogTitle>
    <DialogContent>
      <Query<TransactionsQueryData, TransactionsQueryVars>
        query={TRANSACTIONS_QUERY}
        variables={{ id: userId || '' }}
      >
        {getContent}
      </Query>
    </DialogContent>
    <DialogActions>
      <Button onClick={hideTransactions} color="primary" autoFocus>
        Ok
        </Button>
    </DialogActions>
  </Dialog>
)

export default TransactionsList
