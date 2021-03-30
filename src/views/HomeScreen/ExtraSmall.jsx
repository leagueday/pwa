import React from 'react'
import {useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import {selectors} from '../../store'
import useFacets from '../../api/useFacets'
import { addScrollStyle } from '../util'
import XsBanner from './XsBanner'
import BasicLayout from '../BasicLayout'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import Loading from '../Loading'
import TitleBar from './TitleBar'

const ChannelCategories = React.lazy(() => import('../ChannelCategories'))

const primaryColor = colors.magenta

const useStyles = makeStyles(theme => ({
  banner: {
    flex: 35,
  },
  channelCategories: {
    marginTop: '0.5vw',
  },
  continuingContent: {
    flex: 65,
  },
  homeContent: ({primaryColor}) => addScrollStyle(primaryColor, theme)({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    overflow: 'auto',
    width: '100%',
  }),
  podcastTiles: {
    height: '100%',
    minHeight: 0,
  },
  primaryStripe: ({primaryColor}) => ({
    backgroundColor: primaryColor,
    height: '0.5vw',
    width: '100%',
  }),
  titleBar: {
    margin: '1vw',
  },
}))

const XsHomeScreen = () => {
  const facetedPodcasts = useFacets('Home')

  const classes = useStyles({primaryColor})

  const user = useSelector(selectors.getUser)
  const userName = user?.user_metadata?.full_name

  return (
    <BasicLayout home>
      <div className={classes.homeContent}>
        <TitleBar
          className={classes.titleBar}
          primaryColor={primaryColor}
          text={userName ? `Welcome back, ${userName}!` : 'Home'}
        />
        <XsBanner className={classes.banner} primaryColor={primaryColor} />
        <div className={classes.continuingContent}>
          <div className={classes.primaryStripe} />
          <div className={classes.podcastTiles}>
            <FacetedPodcastTiles data={facetedPodcasts} />
            <React.Suspense fallback={(<Loading />)}>
              <ChannelCategories className={classes.channelCategories} />
            </React.Suspense>
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}

export default XsHomeScreen
