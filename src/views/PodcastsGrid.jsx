import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import { selectors } from '../store'

import PodcastCard from './PodcastCard'

const useStyles = makeStyles(theme => ({
  podcastsGrid: {
  },
  gridItem: {
  }
}))

export const PodcastsGrid = ({data}) => {
  const theme = useTheme()
  const screenIsXs = useMediaQuery(theme.breakpoints.only('xs'))

  const classes = useStyles()

  const navVisibility = useSelector(selectors.getNavVisibility)
  const isSidenavVisible = navVisibility !== false

  const [mdItemCols, smItemCols, xsItemCols] = screenIsXs
    ? [12, 12, 12]
    : isSidenavVisible
      ? [6, 12, 12]
      : [4, 6, 12]

  return (
    <Grid className={classes.podcastsGrid} container spacing={1}>
      {
        data && data.map(
          podcast => (
            <Grid
              key={podcast.id}
              className={classes.gridItem}
              item
              md={mdItemCols}
              sm={smItemCols}
              xs={xsItemCols}
            >
              <PodcastCard podcast={podcast} />
            </Grid>
          )
        )
      }
    </Grid>
  )
}

export default PodcastsGrid
