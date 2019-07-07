import React, { useCallback } from 'react'
import NumberFormat from 'react-number-format'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import messages from '../messages';

interface NumberFormatCustomProps {
  name: string
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string, name: string } }) => void
}

const NumberFormatCustom: React.FC<NumberFormatCustomProps> = ({
  inputRef,
  onChange,
  name,
  ...restProps
}) => {
  const onValueChange = useCallback((values => {
    onChange({
      target: {
        value: values.value,
        name,
      },
    })
  }), [onChange, name])

  return (
    <NumberFormat
      {...restProps}
      getInputRef={inputRef}
      onValueChange={onValueChange}
      thousandSeparator
      allowNegative={false}
    />
  )
}

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
