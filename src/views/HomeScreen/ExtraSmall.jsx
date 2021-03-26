import React from 'react'
import {useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import {selectors} from '../../store'
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
  homeContent: addScrollStyle(colors.magenta)({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    overflow: 'auto',
    padding: '0.5em 0.5em 0 0.5em',
    width: '100%',
  }),
  podcastTiles: {
    height: '100%',
    minHeight: 0,
  },
  primaryStripe: {
    backgroundColor: PRIMARY_COLOR,
    height: '0.25em',
    width: '100%',
  },
  titleSeparator: {
    height: '0.25em',
  },
}))

const XsHomeScreen = () => {
  const facetedPodcasts = useFacets('Home')

  const classes = useStyles()

  const user = useSelector(selectors.getUser)
  const userName = user?.user_metadata?.full_name

  return (
    <BasicLayout home>
      <div className={classes.homeContent}>
        xs home content
      </div>
    </BasicLayout>
  )
}

export default XsHomeScreen
