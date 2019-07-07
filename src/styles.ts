import { createGlobalStyle } from 'styled-components'
import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    primary: '#393939',
  },
}

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`
