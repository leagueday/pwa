import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

import usePodcasts from '../api/usePodcasts'
import PodcastCard from './PodcastCard'

const useStyles = makeStyles(theme => ({
  grid: {
    backgroundColor: theme.palette.grey['400'],
    padding: '0.25em',
  },
  gridItem: {
  }
}))

const PodcastsGrid = () => {
  const classes = useStyles()

  const {data, error} = usePodcasts()

  return (
    <Card>
      <Grid className={classes.grid} container>
        {
          data && data.map(
            podcast => (
              <Grid key={podcast.id} className={classes.gridItem} item lg={2} md={3} sm={6} xs={12}>
                <PodcastCard podcast={podcast} />
              </Grid>
            )
          )
        }
      </Grid>
    </Card>)
}

export default PodcastsGrid
