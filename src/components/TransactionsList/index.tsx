import React from 'react'
import { Query } from 'react-apollo'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '../common'
import TRANSACTIONS_QUERY, {
  ITransactionsQueryData, ITransactionsQueryVars,
} from '../../queries/transactions'
import renderContent from './renderContent'
import messages from '../../messages'

interface IProps {
  userId: string | null
  closeModal: VoidFunction
}

const TransactionsList: React.FC<IProps> = ({ userId, closeModal }) => (
  <Dialog
    open={!!userId}
    onClose={closeModal}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
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
        {renderContent}
      </Query>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeModal} color="primary" autoFocus>
        {messages.close}
      </Button>
    </DialogActions>
  </Dialog>
)

export default TransactionsList
