import React from 'react'

import useAirtable from './useAirtable'

const base = 'appXoertP1WJjd4TQ'
const myChannelsTablename = 'MyChannels'
const channelChildrenTablename = 'MyChannels'

const useMyChannels = () => {
  const {data: myChannelsData} = useAirtable(base, myChannelsTablename)
  const {data: channelChildrenData} = useAirtable(base, channelChildrenTablename)

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
