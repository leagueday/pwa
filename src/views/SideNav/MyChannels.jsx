import React from 'react'
import {useDispatch} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'

import useChannels from '../../api/useChannels'
import {actions, useLocationPathname} from '../../store'

import Item from './Item'

const DEFAULT_CHANNELS_CUTOFF = 6

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

const MyChannels = ({skinny}) => {
  const classes = useStyles()

  const myChannels = useChannels().myList

  const dispatch = useDispatch()
  const makeGotoThisChannel = channelTag => () => dispatch(actions.pushHistory(`/channel/${channelTag}`))

  const locationPathname = useLocationPathname()

  return (
    <div className={classes.myChannels}>
      {
        myChannels.map(channel => {
          const {tag, title, imageUrl} = channel
          return (
            <Item
              key={tag}
              title={title}
              imageUrl={imageUrl}
              isSelected={isChannelSelected(locationPathname, tag)}
              onClick={makeGotoThisChannel(tag)}
              skinny={skinny}
            />
          )
        })
      }
    </div>
  )
}

MyChannels.defaultProps = {
  cutoff: DEFAULT_CHANNELS_CUTOFF,
}

export default MyChannels
