import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { getShowCategories } from '../store/selectors'

import Controller from './Controller'
import PodcastCategoriesList from './PodcastCategoriesList'
import PodcastsGrid from './PodcastsGrid'
import SelectedPodcast from './SelectedPodcast'

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

  const isCategoriesVisible = useSelector(getShowCategories)

  const {
    categoryListCols, podcastsGridCols
  } = isCategoriesVisible
    ? {
      categoryListCols: {
        xs: 12,
        sm: 4,
      },
      podcastsGridCols : {
        xs: 12,
        sm: 8,
      },
    } : {
      categoryListCols: {
      },
      podcastsGridCols : {
        xs: 12,
        sm: 12,
      },
    }

  return (
    <>
      <SelectedPodcast />
      <Grid className={classes.container} container spacing={2}>
        <Grid className={classes.controller} item xs={12}>
          <Controller />
        </Grid>
        { isCategoriesVisible && (
            <Grid className={classes.categoryList} item xs={categoryListCols.xs} sm={categoryListCols.sm}>
              <PodcastCategoriesList />
            </Grid>
          )
        }
        <Grid className={classes.podcastsGrid} item xs={podcastsGridCols.xs} sm={podcastsGridCols.sm}>
          <PodcastsGrid />
        </Grid>
      </Grid>
    </>
  )
}

export default BasicLayout
