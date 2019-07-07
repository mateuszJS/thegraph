import React from 'react'
import { InputAdornment, TextField } from '../common'
import NumberFormatCustom from './NumberFormatCustom'
import messages from '../../messages'

interface IProps {
  disabled: boolean
  fullWidth: boolean
  name: string,
  value: string,
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const AmountInput: React.FC<IProps> = ({
  value,
  onChange,
  name,
  fullWidth,
  disabled,
}) => (
    <TextField
      className="formControl"
      label={messages.amount}
      value={value}
      onChange={onChange}
      name={name}
      fullWidth={fullWidth}
      disabled={disabled}
      required
      error={!value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {messages.ethSymbol}
          </InputAdornment>
        ),
        inputComponent: NumberFormatCustom as any,

      }}
    />
  )

export default AmountInput
