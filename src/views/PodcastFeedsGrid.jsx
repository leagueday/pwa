import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

import usePodcasts from '../api/usePodcasts'
import PodcastFeedCard from './PodcastFeedCard'

const useStyles = makeStyles(theme => ({
  grid: {
    backgroundColor: theme.palette.grey['400'],
    padding: '0.25em',
  }
}))

const PodcastFeedsGrid = () => {
  const classes = useStyles()

  const {data, error} = usePodcasts()

  return (
    <Card>
      <Grid className={classes.grid} container>
        {
          data && data.map(
            podcastFeed => (
              <Grid key={podcastFeed.id} item sm={2} xs={1}>
                <PodcastFeedCard podcastFeed={podcastFeed} />
              </Grid>
            )
          )
        }
      </Grid>
    </Card>)
}

export default PodcastFeedsGrid
