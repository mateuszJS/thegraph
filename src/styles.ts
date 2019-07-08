import { createGlobalStyle } from 'styled-components'
import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    primary: '#393939',
    secondary: '#ffffff',
    overlay: 'rgba(255, 255, 255, 0.5)',
    success: '#30a04d',
    error: '#dd0033',
    accent: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
  sizes: {
    headerHeight: '64px',
  },
  boxShadow: {
    accent: '0 3px 5px 2px rgba(33, 203, 243, .3)',
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
