import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

interface IProps {
  userId: string | null
  hideTransactions: VoidFunction
}

const TransactionsList: React.FC<IProps> = ({ userId, hideTransactions }) => (
  <div>
    <Dialog
      open={!!userId}
      onClose={hideTransactions}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={hideTransactions} color="primary">
          Disagree
        </Button>
        <Button onClick={hideTransactions} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)

export default TransactionsList
