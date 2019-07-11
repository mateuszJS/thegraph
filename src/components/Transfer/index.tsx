import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { Dialog, DialogTitle } from '../common'
import TRANSFER_MUTATION,
{
  TransferMutationData,
  TransferMutationVars,
} from '../../mutations/transfer'
import messages from '../../messages'
import TransferForm from './TransferForm'

interface IProps {
  isOpen: boolean
  closeModal: VoidFunction
}

const initialState = {
  // NOTE: populated with the data to easier testing the exercise
  sender: '0x0000000000c90bc353314b6911180ed7e06019a9',
  recipient: '0x00000000016697fa9a9c8e2889e28d3d9816a078',
  amount: '1',
}

const TransferModal: React.FC<IProps> = ({ isOpen, closeModal }) => {
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
  const handleOnCloseModal = () => {
    clearState()
    closeModal()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleOnCloseModal}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{messages.transfer}</DialogTitle>
      <Mutation<TransferMutationData, TransferMutationVars>
        mutation={TRANSFER_MUTATION}
        variables={state}
        onCompleted={clearState}
      >
        {(transfer, result) => (
          <TransferForm
            {...result}
            state={state}
            transfer={transfer}
            closeModal={handleOnCloseModal}
            handleChange={handleChange}
          />
        )}
      </Mutation>
    </Dialog>
  )
}

export default TransferModal
