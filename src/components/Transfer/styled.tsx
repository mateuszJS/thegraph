import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/styles'
import { DialogContent, Button } from '../common'

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoaderOverlay = styled(LoaderWrapper)`
  background-color: ${props => props.theme.colors.overlay};
`

export const InputWrapper = styled.div`
  padding: 0.5rem 0;
`

export const StyledDialogContent = styled(DialogContent)`
  position: relative;
`

const WhiteButton = styledMaterial(Button)({
  color: '#ffffff'
})

export const SubmitButton = styled(WhiteButton)`
  background: ${props => props.theme.colors.accent};
  box-shadow: ${props => props.theme.boxShadow.accent};

`
