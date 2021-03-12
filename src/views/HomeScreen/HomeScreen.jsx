import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import useFacets from '../../api/useFacets'
import { addScrollStyle } from '../util'
import Banner from './Banner'
import BasicLayout from '../BasicLayout'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import Loading from '../Loading'
import ContentTitleBar from './TitleBar'

const ChannelCategories = React.lazy(() => import('../ChannelCategories'))

const PRIMARY_COLOR = colors.magenta

const useStyles = makeStyles(theme => ({
  channelCategories: {
    marginTop: '0.5em',
  },
  homeContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    paddingTop: '0.5em',
    width: '100%',
  },
  podcastTiles: addScrollStyle(colors.magenta)({
    height: '100%',
    minHeight: 0,
    overflow: 'auto',
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
        <Banner primaryColor={PRIMARY_COLOR} />
        <div className={classes.primaryStripe} />
        <div className={classes.podcastTiles}>
          <FacetedPodcastTiles data={facetedPodcasts} />
          <React.Suspense fallback={(<Loading />)}>
            <ChannelCategories className={classes.channelCategories} />
          </React.Suspense>
        </div>
      </div>
    </BasicLayout>
  )
}

export default HomeScreen
