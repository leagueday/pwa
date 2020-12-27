import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import PodcastCategoriesList from './PodcastCategoriesList'
import PodcastsGrid from './PodcastsGrid'
import SelectedPodcast from './SelectedPodcast'
import {Select} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  categoryList: {
  },
  container: {
  },
  podcastsGrid: {
  },
}))

const BasicLayout = () => {
  const classes = useStyles()

  return (
    <>
      <Grid className={classes.container} container spacing={2}>
        <Grid className={classes.selectedPodcast} item xxl={12}>
          <SelectedPodcast />
        </Grid>
        <Grid className={classes.browser} item xxl={12} />
        <Grid className={classes.container} container spacing={2}>
          <Grid className={classes.categoryList} item xs={12} sm={3}>
            <PodcastCategoriesList />
          </Grid>
          <Grid className={classes.podcastsGrid} item xs={12} sm={9}>
            <PodcastsGrid />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default BasicLayout
