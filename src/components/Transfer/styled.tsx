import styled from 'styled-components'
import DialogContent from '@material-ui/core/DialogContent';

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
