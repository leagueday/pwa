import React from 'react'

import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

import usePodcasts from '../api/usePodcasts'

import PodcastFeedCard from './PodcastFeedCard'

const PodcastFeedsGrid = () => {
  const {data, error} = usePodcasts()

  return (
    <Card>
      <Grid container>
        {
          data && data.map(
            podcastFeed => (
              <Grid key={podcastFeed.id} item lg={2} sm={1}>
                <PodcastFeedCard podcastFeed={podcastFeed} />
              </Grid>
            )
          )
        }
      </Grid>
    </Card>)
}

export default PodcastFeedsGrid
