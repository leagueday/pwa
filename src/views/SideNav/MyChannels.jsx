import React from 'react'
import {useDispatch} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'

import useMyChannels from '../../api/useMyChannels'
import {actions} from '../../store'

const useStyles = makeStyles(theme => ({
  myChannels: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    height: '1.5em',
    marginRight: '1em',
    width: '1.5em',
  },
  item: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '0.5em',
    userSelect: 'none',
  },
  title: {
    fontFamily: theme.typography.family.primary,
  },
}))

const MyChannelsItem = ({channel, classes, onClick}) => {
  return (
    <div className={classes.item} onClick={onClick}>
      <img className={classes.image} src={channel.imageUrl} />
      <div className={classes.title}>
        {channel.title}
      </div>
    </div>
  )
}

const MyChannels = () => {
  const classes = useStyles()

  const channels = useMyChannels()

  const dispatch = useDispatch()
  const makeGotoThisChannel = channelTag => () => dispatch(actions.pushHistory(`/channel/${channelTag}`))

  return (
    <div className={classes.myChannels}>
      {
        channels.map(channel => (
          <MyChannelsItem
            channel={channel}
            classes={classes}
            key={channel.tag}
            onClick={makeGotoThisChannel(channel.tag)}
          />
        ))
      }
    </div>
  )
}

export default MyChannels
