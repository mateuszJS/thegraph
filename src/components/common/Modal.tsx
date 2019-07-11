import React, { ReactNode } from 'react'
import { Dialog, DialogTitle } from '.'

interface IProps {
  isOpen: boolean
  close: VoidFunction
  title: string
  children: ReactNode
}

const Modal: React.FC<IProps> = ({
  isOpen,
  close,
  title,
  children,
}) => (
    <Dialog
      open={isOpen}
      onClose={close}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  )

export default Modal
