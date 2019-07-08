import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      overlay: string
      success: string
      error: string
      accent: string
    }
    sizes: {
      headerHeight: string
    }
    boxShadow: {
      accent: string
    }
  }
}