import React from 'react'

import {makeStyles} from '@material-ui/core/styles'

import usePodcasts from '../../api/usePodcasts'
import BasicLayout from '../BasicLayout'
import Loading from '../Loading'

// import Content from './Content'

const Content = React.lazy(
  () => new Promise(
    resolve => {
      setTimeout(
        () => resolve(import('./Content')),
        1500
      )
    }
  )
)

const useStyles = makeStyles({
  podcastScreenContent: {
    maxHeight: '100%',
    width: '100%',
  },
})

const PodcastScreen = ({podcastId}) => {
  const classes = useStyles()

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
    <BasicLayout>
      {
        podcast && (
          <React.Suspense fallback={(<Loading />)}>
            <Content className={classes.podcastScreenContent} podcast={podcast} />
          </React.Suspense>
        )
      }
    </BasicLayout>
  )
}

export default PodcastScreen
