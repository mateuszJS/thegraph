import React from 'react'
import { Query } from 'react-apollo'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '../common'
import TRANSACTIONS_QUERY, {
  ITransactionsQueryData, ITransactionsQueryVars,
} from '../../queries/transactions'
import TransactionsList from './TransactionsList'
import messages from '../../messages'

interface IProps {
  userId: string | null
  closeModal: VoidFunction
}

const Transactions: React.FC<IProps> = ({ userId, closeModal }) => (
  <Dialog
    open={!!userId}
    onClose={closeModal}
    fullWidth
    maxWidth="sm"
  >
    <DialogTitle id="alert-dialog-title">
      {messages.transactionsTitle}
    </DialogTitle>
    <DialogContent>
      <Query<ITransactionsQueryData, ITransactionsQueryVars>
        query={TRANSACTIONS_QUERY}
        variables={{ id: userId || '' }}
      >
        {results => <TransactionsList {...results} />}
      </Query>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeModal} autoFocus>
        {messages.close}
      </Button>
    </DialogActions>
  </Dialog>
)

export default Transactions
