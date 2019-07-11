import React from 'react'
import { Query } from 'react-apollo'
import { DialogContent, DialogActions, Button, Modal } from '../common'
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
  <Modal
    isOpen={!!userId}
    close={closeModal}
    title={messages.transactionsTitle}
  >
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
  </Modal>
)

export default Transactions
