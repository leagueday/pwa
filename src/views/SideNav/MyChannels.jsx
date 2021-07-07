import React, { useContext } from 'react'
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
  const [globalList, addToState, removeFromState, setGlobalState] = useContext(
    MyListContext
  )

  // const [
  //   getIsOnMyList,
  //   addToList,
  //   removeFromList,
  //   globalList,
  //   isMyListEmpty,
  // ] = useMyList(user?.token?.access_token)

  const dispatch = useDispatch()
  const makeGotoThisChannel = channelTag => () =>
    dispatch(actions.pushHistory(`/channel/${channelTag}`))

  const locationPathname = useLocationPathname()
  // const placeholderState = globalList.concat(myList)
    console.log('my channels ',globalList)
  return (
    <div className={classes.myChannels}>
      {globalList?.map((channel, ind) => {
        // const { tag, title, imageUrl } = channel
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

export default MyChannels;