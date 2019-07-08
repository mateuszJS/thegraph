import React from 'react'
import styled from 'styled-components'
import { AppBar, Toolbar, Typography, Button } from '../common'
import messages from '../../messages'

const Wrapper = styled.div`
  height: ${props => props.theme.sizes.headerHeight};
`

const Title = styled.div`
  flex-grow: 1;
`

interface IProps {
  showTransfer: VoidFunction
}

const Header: React.FC<IProps> = ({ showTransfer }) => (
  <Wrapper>
    <AppBar position="static" color="default">
      <Toolbar>
        <Title>
          <Typography variant="h6" color="inherit">
            {messages.appTitle}
          </Typography>
        </Title>
        <Button color="inherit" onClick={showTransfer}>
          {messages.transfer}
        </Button>
      </Toolbar>
    </AppBar>
  </Wrapper>
)

export default Header
