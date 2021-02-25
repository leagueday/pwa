import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import useMyChannels from '../api/useMyChannels'
import BasicLayout from './BasicLayout'
import ChannelContent from './ChannelContent'

const useStyles = makeStyles({
  channelContent: {
    maxHeight: '100%',
    overflowY: 'hidden',
    width: '100%',
  },
})

const ChannelScreen = ({channelTag}) => {
  const classes = useStyles()

  const channels = useMyChannels()

  const channel = channels.find(channel => channel?.tag === channelTag)

  return (
    <BasicLayout mode="back">
      {
        channel && (
          <ChannelContent className={classes.channelContent} channel={channel} />
        )
      }
    </BasicLayout>
  )
}

export default ChannelScreen
