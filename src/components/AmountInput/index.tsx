import React from 'react'
import { InputAdornment } from '../common'
import NumberFormatCustom from './NumberFormatCustom'
import messages from '../../messages'
import { TextValidator } from 'react-material-ui-form-validator'

// NOTE: TextValidator has to be class component (see TS interface)
class AmountInput extends TextValidator {
  public render() {
    return (
      <TextValidator
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {messages.ethSymbol}
            </InputAdornment>
          ),
          inputComponent: NumberFormatCustom as any,

        }}
        {...this.props}
      />
    )
  }
}

export default AmountInput
