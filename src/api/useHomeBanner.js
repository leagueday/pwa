import React from 'react'
import useAirtable from './useAirtable'

const base = 'appXoertP1WJjd4TQ'
const table = 'Home Banner'

const useHomeBanner = () => {
  const { data, error } = useAirtable(base, table)

  const recordList = React.useMemo(
    () =>
      data
        ? data.map(
            ({ fields: { image_url, title, text, accent_color, link } }) => [
              image_url,
              title,
              text,
              accent_color,
              link,
            ]
          )
        : [],
    [data]
  )

  return { data: recordList, error }
}

export default useHomeBanner
