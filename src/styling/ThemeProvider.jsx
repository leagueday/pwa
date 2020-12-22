import React from 'react'
import { ThemeProvider as MaterialThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import * as typography from './typography'

const theme =
  createMuiTheme({
    palette: {
      type: 'dark',
    },
    typography: {
      fontFamily: typography.sans,
    },
  })

const ThemeProvider = props => {
  return (
    <MaterialThemeProvider theme={theme}>
      {props.children}
    </MaterialThemeProvider>
  )
}

export default ThemeProvider
