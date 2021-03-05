import React from 'react'
import useAirtable from './useAirtable'

const base = 'appXoertP1WJjd4TQ'
const table = 'Content Variation'

const useContentVariation = () => {
  const {data, error} = useAirtable(base, table)

  const map = React.useMemo(
    () => new Map(
      data
        ? data.map(
          ({fields: {Name, Value}}) => [Name, Value]
        ) : []
    ),
    [data]
  )

  return {map, error}
}

export default useContentVariation
