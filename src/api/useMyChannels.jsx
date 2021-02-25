import React from 'react'

import useAirtable from './useAirtable'

const base = 'appXoertP1WJjd4TQ'
const myChannelsTablename = 'MyChannels'

const useMyChannels = () => {
  const {data} = useAirtable(base, myChannelsTablename)

  return React.useMemo(
    () => data ? data.map(
      ({fields}) => fields,
    ) : [],
    [data]
  )
}

export default useMyChannels
