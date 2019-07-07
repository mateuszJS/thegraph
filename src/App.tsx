import React from 'react'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './apolloClient'
import MainView from './components/MainView'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from './styles'

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={apolloClient}>
      <GlobalStyle />
      <MainView />
    </ApolloProvider>
  </ThemeProvider>
)

export default App
