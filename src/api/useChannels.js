import React from 'react'

import useAirtable from './useAirtable'
import useMyList from './useMyList'

const base = 'appXoertP1WJjd4TQ'
const channelsTablename = 'Channels'
const channelChildrenTablename = 'ChannelChildren'

const useChannels = () => {
  const {data: channelsData} = useAirtable(base, channelsTablename)
  const {data: channelChildrenData} = useAirtable(base, channelChildrenTablename)

  const [getIsOnMyList, addToMyList, removeFromMyList, isMyListEmpty] = useMyList()

  const channelChildren = React.useMemo(
    () => {
      const map = new Map()

      if (channelChildrenData) channelChildrenData.forEach(
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

  const spreadChannelsData = React.useMemo(
    () => (channelsData || []).map(({fields}) => ({...fields})),
    [channelsData]
  )

  return React.useMemo(
    () => ({
      list: spreadChannelsData.map(
        fields => ({
          ...fields,
          children: channelChildren.get(fields.tag) || []
        }),
      ),
      myList: spreadChannelsData.filter(
        ({tag}) => getIsOnMyList('channel', tag)
      ),
    }),
    [channelChildren, spreadChannelsData, getIsOnMyList]
  )
}

export default useChannels
