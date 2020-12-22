import React from 'react'

import Grid from '@material-ui/core/Grid'

import PodcastCategoriesList from './PodcastCategoriesList'
import PodcastFeedsGrid from './PodcastFeedsGrid'

const BasicLayout = () => {

  return (
    <Grid container>
      <Grid item sm={12} md={3} lg={2}>
        <PodcastCategoriesList />
      </Grid>
      <Grid item sm={12} md={9} lg={10}>
        <PodcastFeedsGrid />
      </Grid>
    </Grid>
  )
}

export default BasicLayout
