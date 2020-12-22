import React from 'react'
import { ThemeProvider as MaterialThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import * as typography from './typography'

const isObject = x => {
  const type = typeof x;
  return type === 'object' && !!x
}

const setFontFamily = (defaultFont, theme) => {
  const updatedTypography = Object.fromEntries(
    Object.entries(theme.typography).map(
      ([name, val]) => {
        if (isObject(val) && val.fontFamily) {
          return [name, {...val, ...{fontFamily: defaultFont}}]
        } else if (name === 'fontFamily') {
          return [name, defaultFont]
        } else {
          return [name, val]
        }
      }
    )
  )

  return {...theme, ...{typography: updatedTypography}}
}

const theme = //setFontFamily(typography.sans, createMuiTheme({
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
