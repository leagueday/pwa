import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import * as colors from '../styling/colors'
import { constants as storeConsts, selectors, useFilter } from '../store'

import usePodcasts from '../api/usePodcasts'
import useStarred from '../api/useStarred'
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

  const [isStar] = useStarred()

  const {data} = usePodcasts()

  const filter = useFilter()

  const navVisibility = useSelector(selectors.getNavVisibility)
  const isSidenavVisible = navVisibility !== false

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

      const {kind: filterKind, cat: filterCat, subcat: filterSubcat} = filter

      if (!filterKind) {
        return filterSoftDisabled(data)
      }

      return data.filter(
        podcast => {
          if (filterKind === storeConsts.FILTER_KIND_CAT) return filter.cat === podcast.category

          if (filterKind === storeConsts.FILTER_KIND_SUBCAT) return filter.subcat === podcast.subCategory

          if (filterKind === storeConsts.FILTER_KIND_FEATURED) return podcast.suggested != null

          if (filterKind === storeConsts.FILTER_KIND_MY_LIST) return isStar(podcast.id)

          throw new Error(`Unknown filter: ${filterKind}`)
        }
      )
    },
    [data, filter]
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
