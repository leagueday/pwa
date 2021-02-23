import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import useFacets from '../api/useFacets'
import { addScrollStyle } from './util'
import ContentTitleBar from './ContentTitleBar'
import FacetedPodcastTiles from './FacetedPodcastTiles'
import HomeBanner from './HomeBanner'

const PRIMARY_COLOR = colors.magenta

const useStyles = makeStyles(theme => ({
  homeContent: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    paddingTop: '0.5em',
    width: '100%',
  },
  podcastTiles: addScrollStyle({
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingBottom: '0.5em',
  }),
  primaryStripe: {
    backgroundColor: PRIMARY_COLOR,
    height: '0.25em',
    width: '100%',
  },
  titleSeparator: {
    height: '0.25em',
  },
}))

const HomeScreenContent = () => {
  const facetedPodcasts = useFacets('Home')

  const classes = useStyles()

  return (
    <div className={classes.homeContent}>
      <ContentTitleBar text="Home" primaryColor={PRIMARY_COLOR} />
      <div className={classes.titleSeparator} />
      <HomeBanner primaryColor={PRIMARY_COLOR} />
      <div className={classes.primaryStripe} />
      <div className={classes.podcastTiles}>
        <FacetedPodcastTiles data={facetedPodcasts} />
      </div>
    </div>
  )
}

export default HomeScreenContent
