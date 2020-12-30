import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

import * as selectors from '../store/selectors'

import usePodcasts from '../api/usePodcasts'
import PodcastCard from './PodcastCard'

const useStyles = makeStyles(theme => ({
  podcastsGrid: {
    backgroundColor: theme.palette.grey['400'],
    padding: '0.25em',
  },
  gridItem: {
  }
}))

const PodcastsGrid = () => {
  const classes = useStyles()

  const {data, error} = usePodcasts()

  const categoryFilter = useSelector(selectors.getCategoryFilter)

  const filteredData = (() => {
    if (!data || !categoryFilter) return data

    const {cat: cfCat, subcat: cfSubcat} = categoryFilter

    if (!cfCat && !cfSubcat) return data

    return data.filter(
      podcast => {
        if (cfCat && cfCat !== podcast.category) return false
        if (cfSubcat && cfSubcat !== podcast.subCategory) return false
        return true
      }
    )
  })()

  return (
    <Grid className={classes.podcastsGrid} container>
      {
        filteredData && filteredData.map(
            podcast => (
              <Grid key={podcast.id} className={classes.gridItem} item md={3} sm={6} xs={12}>
                <PodcastCard podcast={podcast} />
              </Grid>
            )
          )
      }
    </Grid>)
}

export default PodcastsGrid
