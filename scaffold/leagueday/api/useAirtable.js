import Airtable from 'airtable'
import useSWR, { cache as swrCache } from 'swr'

import * as analytics from '../analytics'

/*
RATE LIMITS
The API is limited to 5 requests per second per base. If you exceed this rate, you will receive a 429 status code and
will need to wait 30 seconds before subsequent requests will succeed.

The official JavaScript client has built-in retry logic.

If you anticipate a higher read volume, we recommend using a caching proxy. This rate limit is the same for all plans
and increased limits are not currently available.
*/

const apiKey = AIRTABLE_API_KEY

const fetcher = (base, table, view = 'Grid view') => () =>
  new Promise((res, rej) => {
    const t0 = Date.now()
    let data = []

    base(table)
      .select({
        view,
      })
      .eachPage(
        (records, fetchNextPage) => {
          console.log(`retrieved ${records.length} records`)

          // remove empty row because the Airtable UI lets the user put in an empty row
          // and the user puts in an empty row
          const filteredRecords = records
            ? records.filter(record => {
                const fields = record?.fields
                if (!fields) return false

                const fieldKeys = Object.keys(fields)

                return fieldKeys.length > 0
              })
            : []

          data = data.concat(filteredRecords)

          fetchNextPage()
        },
        err => {
          if (err) {
            console.error(err)

            rej(err)
          } else {
            analytics.timing('airtable', table, Date.now() - t0)

            res(data)
          }
        }
      )
  })

const useAirtable = (baseKey, table, view) => {
  const cacheKey = `${baseKey}/${table}/${view}`

  const base = new Airtable({ apiKey }).base(baseKey)

  return useSWR(cacheKey, fetcher(base, table, view), {
    revalidateOnFocus: false,
    revalidateOnMount: !swrCache.has(cacheKey), // default is true
    shouldRetryOnError: false,
  })
}

export default useAirtable
