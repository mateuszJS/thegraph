import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Transfer from './Transfer'
import messages from '../messages'

const Wrapper = styled.div`
  height: 64px;
`

const Title = styled.div`
  flex-grow: 1;
`

const Header = () => {
  const [isShownTransfer, setIsShownTransfer] = useState(false)
  const closeModal = useCallback(() => setIsShownTransfer(false), [])
  const openModal = useCallback(() => setIsShownTransfer(true), [])

  return (
    <Wrapper>
      <AppBar position="static" color="default">
        <Toolbar>
          <Title>
            <Typography variant="h6" color="inherit">
              ETH Explorer
            </Typography>
          </Title>
          <Button color="inherit" onClick={openModal}>
            {messages.transfer}
          </Button>
        </Toolbar>
      </AppBar>
      <Transfer
        isOpen={isShownTransfer}
        closeModal={closeModal}
      />
    </Wrapper>
  )
}

export default Header
