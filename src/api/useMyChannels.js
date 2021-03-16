import React from 'react'
import {useSelector} from 'react-redux'

import {selectors} from '../store'
import useAirtable from './useAirtable'
import useMyList from './useMyList'

const base = 'appXoertP1WJjd4TQ'
const myChannelsTablename = 'MyChannels'
const channelChildrenTablename = 'ChannelChildren'

const useMyChannels = () => {
  const userData = useSelector(selectors.getUserData)

  const {data: myChannelsData} = useAirtable(base, myChannelsTablename)
  const {data: channelChildrenData} = useAirtable(base, channelChildrenTablename)

  const [getIsOnMyList, addToMyList, removeFromMyList, isMyListEmpty] = useMyList()

  const channelChildren = React.useMemo(
    () => {
      if (!channelChildrenData) return null

      const map = new Map()

      channelChildrenData.forEach(
        ({fields: {channelTag, childChannelTag}}) => {
          const childChannels = map.get(channelTag)

          if (childChannels) {
            childChannels.push(childChannelTag)
          } else {
            map.set(channelTag, [childChannelTag])
          }
        }
      )

      return map
    },
    [channelChildrenData]
  )

  return React.useMemo(
    () => myChannelsData && channelChildren ? myChannelsData.map(
      ({fields}) => ({
        ...fields,
        children: channelChildren.get(fields.tag) || []
      }),
    ) : [],
    [channelChildren, myChannelsData]
  )
}

export default useMyChannels
