import React from 'react'
import { AppBar, Typography } from '../common'
import messages from '../../messages'
import { StyledToolbar, Wrapper, Title, StyledButton, Logo } from './styled'
import EtheriumIcon from './etheriumIcon.svg'

interface IProps {
  showTransfer: VoidFunction
}

const Header: React.FC<IProps> = ({ showTransfer }) => (
  <Wrapper>
    <AppBar position="static">
      <StyledToolbar>
        <Title>
          <Typography variant="h6" color="inherit">
            <Logo src={EtheriumIcon} />
            {messages.appTitle}
          </Typography>
        </Title>
        <StyledButton onClick={showTransfer}>
          {messages.transfer}
        </StyledButton>
      </StyledToolbar>
    </AppBar>
  </Wrapper>
)

export default Header
