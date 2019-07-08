import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/styles'
import { Toolbar, Button } from '../common'

export const StyledToolbar = styled(Toolbar)`
  background: ${props => props.theme.colors.accent};
`

export const Wrapper = styled.div`
  height: ${props => props.theme.sizes.headerHeight};
`

export const Title = styled.div`
  flex-grow: 1;
`

export const StyledButton = styledMaterial(Button)({
  color: '#ffffff',
  background: 'rgba(255, 255, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
})
