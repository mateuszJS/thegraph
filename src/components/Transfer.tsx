import React, { useState } from 'react'
import { Mutation, FetchResult, MutationUpdaterFn } from 'react-apollo'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import ListItemText from '@material-ui/core/ListItemText'
import TRANSFER_MUTATION,
{
  TransferMutationData,
  TransferMutationVars,
} from '../mutations/transfer'
import messages from '../messages'
import AmountInput from './AmountInput';

const LoaderWrapper = styled.div`
  text-align: center;
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
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">
        {messages.transfer}
      </DialogTitle>
      <Mutation<TransferMutationData, TransferMutationVars>
        mutation={TRANSFER_MUTATION}
        variables={state}
        onCompleted={clearState}
      >
        {(transfer, args) => {
          const onSubmit = () => transfer()

          return (
            <>
              <DialogContent>
                <div>
                  <div>
                    <TextField
                      label={messages.transferFrom}
                      name="sender"
                      value={state.sender}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      label={messages.transferTo}
                      name="recipient"
                      value={state.recipient}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                  <div>
                    <AmountInput
                      name="amount"
                      value={state.amount}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeModal} color="primary" autoFocus>
                  {messages.cancel}
                </Button>
                <Button onClick={onSubmit} color="primary" autoFocus>
                  {messages.transferAction}
                </Button>
              </DialogActions>
            </>
          )
        }}
      </Mutation>
    </Dialog>
  )
}

export default TransactionsList
                // if (loading) {
                //   return (
                //     <LoaderWrapper>
                //       <CircularProgress />
                //     </LoaderWrapper>
                //   )
                // }

                // if (error || !data) {
                //   return <p>Error: {error}</p>
                // }