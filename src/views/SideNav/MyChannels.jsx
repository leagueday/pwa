import React, { useContext, useState, useEffect } from 'react'
import { getMyList } from '../../api/getUserList'
import { MyListContext } from '../../store/stateProviders/listState'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import useMyList from '../../api/useMyList'
import useChannels from '../../api/useChannels'
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
  const { filteredListRecords } = getMyList()
  const dispatch = useDispatch()

  const makeGotoThisChannel = channelTag => () =>
    dispatch(actions.pushHistory(`/channel/${channelTag}`))

  const locationPathname = useLocationPathname()

  useEffect(() => {
    if (globalList.length === 0 && filteredListRecords.length > 0) {
      console.log('set global state ')
      setGlobalList(filteredListRecords)
    }
  }, [filteredListRecords])

  return (
    <div className={classes.myChannels}>
      {globalList?.map((channel, ind) => {
        return (
          <div className={classes.item}>
            <Item
              key={ind}
              title={channel?.fields?.title}
              imageUrl={channel?.fields?.channelImg}
              isSelected={isChannelSelected(
                locationPathname,
                channel?.fields?.tag
              )}
              onClick={makeGotoThisChannel(channel?.fields?.tag)}
              skinny={skinny}
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
