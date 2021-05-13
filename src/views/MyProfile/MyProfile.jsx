import React from 'react'
import { useSelector,useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import useFacets from '../../api/useFacets'
import { selectors } from '../../store'
import { colors } from '../../styling'
import BasicLayout from '../BasicLayout'
import { actions } from '../../store'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import Loading from '../Loading'
import { addScrollStyle } from '../util'
import TitleBar from './TitleBar'
const ChannelCategories = React.lazy(() => import('../ChannelCategories'))

const primaryColor = colors.magenta

const useStyles = makeStyles(theme => ({
  channelCategories: {
    marginTop: '0.5em',
  },
  homeContent: ({ primaryColor }) =>
    addScrollStyle(
      primaryColor,
      theme
    )({
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
  live:{
      fontSize: '95%',
      marginLeft: 'auto',
      // overflowX: 'hidden',
      // textOverflow: 'ellipsis',
      // whiteSpace: 'nowrap',
      // position :"relative",
      position: "absolute",
      top: 60,
      cursor:"pointer",
      right: 16,
  },
  primaryStripe: ({ primaryColor }) => ({
    backgroundColor: primaryColor,
    height: '0.25em',
    width: '100%',
  }),
  titleBar: {
    marginBottom: '0.25em',
  },
}))

const MyProfile = () => {
  const facetedPodcasts = useFacets('Home')

  const classes = useStyles({ primaryColor })
  const dispatch=useDispatch();

  const user = useSelector(selectors.getUser)
  const userName = user?.user_metadata?.full_name
  const golive=() => dispatch(actions.pushHistory('/live'));
  return (
    <BasicLayout home>
      <div className={classes.homeContent}>
        <TitleBar
          className={classes.titleBar}
          primaryColor={primaryColor}
          text={userName ? `Welcome back, ${userName}!` : 'Home'}
        />
        <div className={classes.primaryStripe} />
        <div className={classes.podcastTiles}>
          My Profile
        </div>
        <div className={classes.live} onClick={golive}>
          Go Live
        </div>
      </div>
    </BasicLayout>
  )
}

export default MyProfile
