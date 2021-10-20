import React, { useContext, useState, useEffect } from 'react'
import { getMyList } from '../GetUserList'
import { MyListContext } from '../../store/stateProviders/listState'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { selectors } from '../../store'
import { actions, useLocationPathname } from '../../store'
import Item from './Item'
import PlusMinusButton from '../PlusMinusButton'
const DEFAULT_CHANNELS_CUTOFF = 6

const useStyles = makeStyles({
  myChannels: {},
  item: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  playPause: {
    position: 'absolute',
    right: 6,
  }
});

const isChannelSelected = (locationPathname, channelTag) => {
  const path = locationPathname ?? ''

  if (path.substr(0, 9) !== '/channel/') {
    return false
  } else {
    return path.substr(9) === channelTag
  }
}

const MyChannels = ({ skinny }) => {
  const classes = useStyles()
  const { globalList, setGlobalList } = useContext(MyListContext)
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)
  const channels = useSelector(selectors.getMyChannels)
  const makeGotoThisChannel = channelTag => () =>
    dispatch(actions.pushHistory(`/channel/${channelTag}`))

  const locationPathname = useLocationPathname()

  return (
    <div className={classes.myChannels}>
      {globalList?.map((channel, ind) => {
        return (
          <div className={classes.item} key={ind}>
            <Item
              title={channel?.fields?.title}
              imageUrl={channel?.fields?.channelImg}
              isSelected={isChannelSelected(
                locationPathname,
                channel?.fields?.tag
              )}
              onClick={makeGotoThisChannel(channel?.fields?.tag)}
            />
            <div className={classes.playPause}>

            <PlusMinusButton 
            subjectId={channel?.fields?.tag}
            channel={channel.fields}
            size={'1.5em'}
            />
            </div>
          </div>
        )
      })}
    </div>
  )
}

MyChannels.defaultProps = {
  cutoff: DEFAULT_CHANNELS_CUTOFF,
}

export default MyChannels
