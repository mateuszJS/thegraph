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

interface IProps {
  openTransferModal: VoidFunction
}

const Header: React.FC<IProps> = ({ openTransferModal }) => (
  <Wrapper>
    <AppBar position="static" color="default">
      <Toolbar>
        <Title>
          <Typography variant="h6" color="inherit">
            {messages.appTitle}
          </Typography>
        </Title>
        <Button color="inherit" onClick={openTransferModal}>
          {messages.transfer}
        </Button>
      </Toolbar>
    </AppBar>
  </Wrapper>
)

export default Header
