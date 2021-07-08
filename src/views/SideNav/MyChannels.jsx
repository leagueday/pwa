import React, { useContext, useState } from 'react'
import { MyListContext } from '../../store/listState'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { getMyList } from '../../api/getUserList'
import useMyList from '../../api/useMyList'
import useChannels from '../../api/useChannels'
import { selectors } from '../../store'
import { actions, useLocationPathname } from '../../store'
import Item from './Item'

const DEFAULT_CHANNELS_CUTOFF = 6

const useStyles = makeStyles({
  myChannels: {},
})

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
  const myList = getMyList()
  const user = useSelector(selectors.getUser)
  const [arrayToMap, setArrayToMap] = useState([])
  const [
    listPlaceholder,
    setListPlaceholder,
    globalList,
    getIsOnMyList,
    addToList,
    removeFromList,
    setGlobalList,
  ] = useContext(MyListContext);

  const dispatch = useDispatch();

  const makeGotoThisChannel = channelTag => () =>
    dispatch(actions.pushHistory(`/channel/${channelTag}`))

  const locationPathname = useLocationPathname();
  const list = myList.concat(listPlaceholder);
  // setListPlaceholder(myList);

  // if (globalList.length > 0) {
  //   setArrayToMap(globalList)
  // } else {
  //   setArrayToMap(listPlaceholder)
  // }
  
  return (
    <div className={classes.myChannels}>
      {globalList?.map((channel, ind) => {
        return (
          <Item
            key={ind}
            title={channel?.fields?.channelName}
            imageUrl={channel?.fields?.channelImg}
            isSelected={isChannelSelected(
              locationPathname,
              channel?.fields?.channelTag
            )}
            onClick={makeGotoThisChannel(channel?.fields?.channelTag)}
            skinny={skinny}
          />
        )
      })}
    </div>
  )

}

MyChannels.defaultProps = {
  cutoff: DEFAULT_CHANNELS_CUTOFF,
}

export default MyChannels
