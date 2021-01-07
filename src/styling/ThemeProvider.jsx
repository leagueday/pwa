import React from 'react'

import { useSelector } from 'react-redux'

import { ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles'

import { selectors } from '../store'

import * as themes from './themes'

const ThemeProvider = props => {
  const themeName = useSelector(selectors.getTheme)

  const theme = themes[themeName]

  return (
    <MaterialThemeProvider theme={theme}>
      {props.children}
    </MaterialThemeProvider>
  )
}

export default ThemeProvider
