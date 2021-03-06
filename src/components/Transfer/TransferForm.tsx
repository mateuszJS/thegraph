import React from 'react'
import { ApolloError } from 'apollo-client'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import _get from 'lodash/get'
import {
  Button, DialogActions, CircularProgress, ErrorText, SuccessText,
} from '../common'
import AmountInput from '../AmountInput'
import {
  LoaderWrapper, LoaderOverlay, InputWrapper, StyledDialogContent, SubmitButton,
} from './styled'
import messages from '../../messages'

interface IState {
  sender: string
  recipient: string
  amount: string
}
interface IProps {
  state: IState
  loading: boolean
  called: boolean
  error?: ApolloError
  closeModal: VoidFunction
  transfer: VoidFunction
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const TransferForm: React.FC<IProps> = ({
  transfer,
  handleChange,
  loading,
  called,
  error,
  state,
  closeModal,
}) => {
  const onSubmit = () => transfer()
  const sharedProps = {
    onChange: handleChange,
    validators: ['required'],
    errorMessages: [messages.requiredField],
    fullWidth: true,
    disabled: loading,
  }
  const isShownSuccessMessage = called && !loading && !error
  const errorMessage = _get(error, 'networkError.message')

  return (
    <ValidatorForm onSubmit={onSubmit}>
      <StyledDialogContent>
        <InputWrapper>
          <TextValidator
            name="sender"
            label={messages.transferFrom}
            value={state.sender}
            {...sharedProps}
          />
        </InputWrapper>
        <InputWrapper>
          <TextValidator
            name="recipient"
            label={messages.transferTo}
            value={state.recipient}
            {...sharedProps}
          />
        </InputWrapper>
        <InputWrapper>
          <AmountInput
            name="amount"
            label={messages.amount}
            value={state.amount}
            {...sharedProps}
          />
        </InputWrapper>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        {
          isShownSuccessMessage && (
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
        <Button onClick={closeModal}>
          {messages.cancel}
        </Button>
        <SubmitButton type="submit" disabled={loading} autoFocus>
          {messages.transferAction}
        </SubmitButton>
      </DialogActions>
    </ValidatorForm>
  )
}

export default TransferForm
