import React from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format'

interface IProps {
  name: string
  inputRef(instance: NumberFormat | null): void
  onChange(event: { target: { value: string, name: string } }): void
}

const NumberFormatCustom: React.FC<IProps> = ({
  inputRef,
  onChange,
  name,
  ...restProps
}) => {
  const onValueChange = (values: NumberFormatValues) => {
    onChange({
      target: {
        value: values.value,
        name,
      },
    })
  }

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
