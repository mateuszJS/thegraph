import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      overlay: string
      success: string
      error: string
    },
    sizes: {
      headerHeight: string
    }
  }
}