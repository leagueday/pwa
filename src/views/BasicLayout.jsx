import React from 'react'

import Grid from '@material-ui/core/Grid'

import PodcastCategoriesList from './PodcastCategoriesList'
import PodcastFeedsGrid from './PodcastFeedsGrid'

const BasicLayout = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <PodcastCategoriesList />
      </Grid>
      <Grid item xs={12} sm={9}>
        <PodcastFeedsGrid />
      </Grid>
    </Grid>
  )
}

export default BasicLayout
