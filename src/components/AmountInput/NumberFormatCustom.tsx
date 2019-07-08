import React, { useCallback } from 'react'
import NumberFormat from 'react-number-format'

interface IProps {
  name: string
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { value: string, name: string } }) => void
}

const NumberFormatCustom: React.FC<IProps> = ({
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

export default NumberFormatCustom
