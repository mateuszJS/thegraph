import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TRANSFER_MUTATION,
{
  TransferMutationData,
  TransferMutationVars,
} from '../mutations/transfer'
import messages from '../messages'
import AmountInput from './AmountInput'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoaderOverlay = styled(LoaderWrapper)`
  background-color: ${props => props.theme.colors.overlay};
`

const Form = styled.form`
  position: relative;
`

const StyledDialogContent = styled(DialogContent)`
  position: relative;
`

interface IProps {
  isOpen: boolean
  closeModal: VoidFunction
}

const initialState = {
  sender: '0x0000000000c90bc353314b6911180ed7e06019a9',
  recipient: '0x00000000016697fa9a9c8e2889e28d3d9816a078',
  amount: '1',
}

const TransactionsList: React.FC<IProps> = ({ isOpen, closeModal }) => {
  const [state, setState] = useState(initialState)

  const handleChange = (
    { target: { value, name } }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const clearState = () => setState(initialState)

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{messages.transfer}</DialogTitle>
      <Mutation<TransferMutationData, TransferMutationVars>
        mutation={TRANSFER_MUTATION}
        variables={state}
        onCompleted={clearState}
      >
        {(transfer, { loading, error, called }) => {
          const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            transfer()
          }

          return (
            <Form onSubmit={onSubmit}>
              <StyledDialogContent>
                <div>
                  <TextField
                    label={messages.transferFrom}
                    name="sender"
                    value={state.sender}
                    onChange={handleChange}
                    fullWidth
                    disabled={loading}
                  />
                </div>
                <div>
                  <TextField
                    label={messages.transferTo}
                    name="recipient"
                    value={state.recipient}
                    onChange={handleChange}
                    fullWidth
                    disabled={loading}
                  />
                </div>
                <div>
                  <AmountInput
                    name="amount"
                    value={state.amount}
                    onChange={handleChange}
                    fullWidth
                    disabled={loading}
                  />
                </div>
                {
                  error &&
                  error.networkError &&
                  error.networkError.message && (
                    <Typography color="error" style={{ marginTop: '1rem' }}>
                      {error.networkError.message}
                    </Typography>
                  )
                }
                {
                  called && !loading && !error && (
                    <Typography style={{ marginTop: '1rem' }}>
                      {messages.transferSuccess}
                    </Typography>
                  )
                }
                {loading && (
                  <LoaderWrapper>
                    <LoaderOverlay />
                    <CircularProgress />
                  </LoaderWrapper>
                )}
              </StyledDialogContent>
              <DialogActions>
                <Button onClick={closeModal} color="primary">
                  {messages.cancel}
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  color="primary"
                  autoFocus
                >
                  {messages.transferAction}
                </Button>
              </DialogActions>
            </Form>
          )
        }}
      </Mutation>
    </Dialog>
  )
}

export default TransactionsList
