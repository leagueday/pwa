import React from 'react'

import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import ExtraSmall from './ExtraSmall'

const AppBar = props => {
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))

  return smUp ? null : (
    <ExtraSmall {...props} />
  )
}

export default AppBar
