import React from 'react'

import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import ExtraSmall from './ExtraSmall'
import SmallUp from './SmallUp'

const HomeScreen = props => {
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))

  return smUp ? (
    <SmallUp {...props} />
  ) : (
    <ExtraSmall {...props} />
  )
}

export default HomeScreen
