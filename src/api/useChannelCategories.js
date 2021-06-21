import React from 'react'

import useAirtable from './useAirtable'

const base = 'appXoertP1WJjd4TQ'
const tablename = 'ChannelCategories'

const useChannelCategories = () => {
  const { data } = useAirtable(base, tablename)

  return React.useMemo(() => {
    const result = new Map()

    if (data)
      for (let {
        fields: { title, channel_tag: channelTag },
      } of data) {
        const set = result.get(title)

        if (set) {
          set.add(channelTag)
        } else {
          result.set(title, new Set([channelTag]))
        }
      }

    return result
  }, [data])
}

export default useChannelCategories;