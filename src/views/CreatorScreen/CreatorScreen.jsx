import React from 'react'

import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ExtraSmall from './ExtraSmall'
import SmallUp from './SmallUp'

const CreatorScreen = props => {
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))

  return <SmallUp {...props} />
}

export default CreatorScreen;
