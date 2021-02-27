import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import useFacets from '../../api/useFacets'
import { addScrollStyle } from '../util'
import BasicLayout from '../BasicLayout'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import HomeBanner from './Banner'
import ContentTitleBar from './TitleBar'

const PRIMARY_COLOR = colors.magenta

const useStyles = makeStyles(theme => ({
  homeContent: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    paddingTop: '0.5em',
    width: '100%',
  },
  podcastTiles: addScrollStyle(colors.magenta)({
    overflow: 'auto',
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

const HomeScreen = () => {
  const facetedPodcasts = useFacets('Home')

  const classes = useStyles()

  return (
    <BasicLayout>
      <div className={classes.homeContent}>
        <ContentTitleBar text="Home" primaryColor={PRIMARY_COLOR} />
        <div className={classes.titleSeparator} />
        <HomeBanner primaryColor={PRIMARY_COLOR} />
        <div className={classes.primaryStripe} />
        <div className={classes.podcastTiles}>
          <FacetedPodcastTiles data={facetedPodcasts} />
        </div>
      </div>
    </BasicLayout>
  )
}

export default HomeScreen
