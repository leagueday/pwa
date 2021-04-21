import React from 'react'

import { useTheme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import ButtonPodcastTilesRow from './ButtonPodcastTilesRow'
import SwipePodcastTilesRow from './SwipePodcastTilesRow'

const PodcastTilesRow = props => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  return isXs ? (
    <SwipePodcastTilesRow {...props} />
  ) : (
    <ButtonPodcastTilesRow {...props} />
  )
}

export default PodcastTilesRow
