import React from 'react'

import { useTheme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import ButtonChannelTilesRow from './ButtonChannelTilesRow'
import SwipeChannelTilesRow from './SwipeChannelTilesRow'

const ChannelTilesRow = props => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  return isXs ? (
    <SwipeChannelTilesRow {...props} />
  ) : (
    <ButtonChannelTilesRow {...props} />
  )
}

export default ChannelTilesRow
