import React from 'react'
import {useDispatch} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'

import useMyChannels from '../../api/useMyChannels'
import {actions} from '../../store'
import useLocationPathname from '../../store/api/useLocationPathname'

import Item from './Item'

const useStyles = makeStyles({
  myChannels: {
  },
})

const isChannelSelected = (locationPathname, channelTag) => {
  const path = locationPathname ?? ''

  if (path.substr(0, 9) !== '/channel/') {
    return false
  }
  else {
    return path.substr(9) === channelTag
  }
}

const MyChannels = () => {
  const classes = useStyles()

  const channels = useMyChannels()

  const dispatch = useDispatch()
  const makeGotoThisChannel = channelTag => () => dispatch(actions.pushHistory(`/channel/${channelTag}`))

  const locationPathname = useLocationPathname()

  return (
    <div className={classes.myChannels}>
      {
        channels.map(channel => {
          const {tag, title, imageUrl} = channel
          return (
            <Item
              key={tag}
              title={title}
              imageUrl={imageUrl}
              isSelected={isChannelSelected(locationPathname, tag)}
              onClick={makeGotoThisChannel(tag)}
            />
          )
        })
      }
    </div>
  )
}

export default MyChannels
