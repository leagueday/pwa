import React from 'react'

import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { actions } from '../store'
import usePodcasts from '../api/usePodcasts'
import BasicLayout from './BasicLayout'
import PodcastDetails from './PodcastDetails'

// tbd - get rid of the "selected podcast" view and redux logic, etc

const useStyles = makeStyles(theme => ({
  podcastScreenContent: {
    width: '100%',
  },
  podcastScreenDetails: {
    maxHeight: '100%',
    width: '100%',
  },
}))

const PodcastScreen = props => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const podcastId = props.podcastId

  React.useEffect(() => {
    if (!podcastId) {
      dispatch(actions.pushHistory('/'))
    }
  }, [podcastId])

  const {data} = usePodcasts()

  const podcast = React.useMemo(
    () => {
      if (!data || !podcastId) return null

      return data.find(
        ({id}) => id === podcastId
      )
    },
    [data, podcastId]
  )

  return (
    <BasicLayout mode="back">
      <div className={classes.podcastScreenContent}>
        { podcast && (<PodcastDetails className={classes.podcastScreenDetails} podcast={podcast} />)}
      </div>
    </BasicLayout>
  )
}

export default PodcastScreen
