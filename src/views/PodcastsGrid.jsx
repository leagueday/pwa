import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import * as colors from '../styling/colors'
import { selectors } from '../store'

import usePodcasts from '../api/usePodcasts'
import PodcastCard from './PodcastCard'

const useStyles = makeStyles(theme => ({
  podcastsGrid: {
    backgroundColor: colors.bluishBlack,
  },
  gridItem: {
  }
}))

const filterSoftDisabled = podcastsList => podcastsList.filter(podcast => !podcast.softDisabled)

const PodcastsGrid = () => {
  const theme = useTheme()
  const screenIsXs = useMediaQuery(theme.breakpoints.only('xs'))

  const classes = useStyles()

  const starred = useSelector(selectors.getStarred)

  const {data} = usePodcasts(starred)

  const categoryFilter = useSelector(selectors.getCategoryFilter)

  const showCategories = useSelector(selectors.getShowCategories)
  const isSidenavVisible = showCategories !== false

  const [mdItemCols, smItemCols, xsItemCols] = screenIsXs
    ? [12, 12, 12]
    : isSidenavVisible
    ? [6, 12, 12]
    : [4, 6, 12]

  const filteredData = React.useMemo(
    () => {
      if (!data) {
        return []
      }

      if (!categoryFilter) {
        return filterSoftDisabled(data)
      }

      const {cat: cfCat, subcat: cfSubcat} = categoryFilter

      if (!cfCat && !cfSubcat) {
        return filterSoftDisabled(data)
      }

      return data.filter(
        podcast => {
          if (cfCat && cfCat !== podcast.category) return false
          return !cfSubcat || cfSubcat === podcast.subCategory
        }
      )
    },
    [categoryFilter, data]
  )

  return (
    <Grid className={classes.podcastsGrid} container spacing={1}>
      {
        filteredData && filteredData.map(
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
