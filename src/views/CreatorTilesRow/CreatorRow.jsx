import React from 'react'
import ButtonCreatorTilesRow from './ButtonCreatorTilesRow'
import SwipeCreatorTilesRow from './SwipeCreatorRow'
import { useTheme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const CreatorRow = props => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  return isXs ? (
    <SwipeCreatorTilesRow {...props} />
  ) : (
    <ButtonCreatorTilesRow {...props} />
  )
}

export default CreatorRow
