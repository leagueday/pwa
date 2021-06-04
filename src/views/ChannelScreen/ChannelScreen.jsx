import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { actions } from '../../store'
import useChannels from '../../api/useChannels'
import Loading from '../Loading'
import BasicLayout from '../BasicLayout'
import { useDispatch } from 'react-redux'
const AggregatorContent = React.lazy(() => import('./AggregatorContent'))
const BroadcasterContent = React.lazy(() => import('./BroadcasterContent'))

const useStyles = makeStyles({
  channelContent: {
    maxHeight: '100%',
    width: '100%',
  },
})

const ChannelScreen = ({ channelTag }) => {
  const classes = useStyles()
  
  const dispatch = useDispatch()
  if(channelTag=='lcs'){
    dispatch(actions.pushHistory(`/channel/lol`))
  }
  const channels = useChannels().list

  const channel = channels?.find(channel => channel?.tag === channelTag)

  const channelChildren = channel?.children

  const isBroadcaster = channelChildren?.length > 0

  return (
    <BasicLayout>
      {channel ? (
        isBroadcaster ? (
          <React.Suspense fallback={<Loading />}>
            <BroadcasterContent
              className={classes.channelContent}
              channel={channel}
            />
          </React.Suspense>
        ) : (
          <React.Suspense fallback={<Loading />}>
            <AggregatorContent
              className={classes.channelContent}
              channel={channel}
            />
          </React.Suspense>
        )
      ) : (
        <Loading />
      )}
    </BasicLayout>
  )
}

export default ChannelScreen
