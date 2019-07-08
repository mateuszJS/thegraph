import React, { useState, FormEvent } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
  CircularProgress, ErrorText, SuccessText,
} from '../common'
import TRANSFER_MUTATION,
{
  TransferMutationData,
  TransferMutationVars,
} from '../../mutations/transfer'
import messages from '../../messages'
import AmountInput from '../AmountInput'

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

const InputWrapper = styled.div`
  padding: 0.5rem 0;
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
          const onSubmit = () => {
            transfer()
          }

          return (
            <ValidatorForm onSubmit={onSubmit}>
              <StyledDialogContent>
                <InputWrapper>
                  <TextValidator
                    name="sender"
                    label={messages.transferFrom}
                    value={state.sender}
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={[messages.requiredField]}
                    fullWidth
                    disabled={loading}
                  />
                </InputWrapper>
                <InputWrapper>
                  <TextValidator
                    name="recipient"
                    label={messages.transferTo}
                    value={state.recipient}
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={[messages.requiredField]}
                    fullWidth
                    disabled={loading}
                  />
                </InputWrapper>
                <InputWrapper>
                  <AmountInput
                    name="amount"
                    label={messages.amount}
                    value={state.amount}
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={[messages.requiredField]}
                    fullWidth
                    disabled={loading}
                  />
                </InputWrapper>
                {
                  error &&
                  error.networkError &&
                  error.networkError.message && (
                    <ErrorText>{error.networkError.message}</ErrorText>
                  )
                }
                {
                  called && !loading && !error && (
                    <SuccessText>{messages.transferSuccess}</SuccessText>
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
            </ValidatorForm>
          )
        }}
      </Mutation>
    </Dialog>
  )
}

export default TransactionsList
