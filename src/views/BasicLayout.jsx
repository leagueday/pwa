import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import * as selectors from '../store/selectors'

import themedViews from './themedViews'

import PodcastCategoriesList from './PodcastCategoriesList'
import PodcastsGrid from './PodcastsGrid'
import SelectedPodcast from './SelectedPodcast'
import ThemeTuner from './ThemeTuner'

const useStyles = makeStyles(theme => ({
  appBar: {
  },
  categoryList: {
  },
  podcastsGrid: {
  },
}))

const BasicLayout = () => {
  const classes = useStyles()

  const theme = useSelector(selectors.getTheme)

  const { AppBar } = themedViews[theme]

  const isCategoriesVisible = useSelector(selectors.getShowCategories)

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
        <Grid className={classes.appBar} item xs={12}>
          <AppBar />
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
      <ThemeTuner />
    </>
  )
}

export default BasicLayout
