import React from 'react'
import axios from 'axios'

// import * as IdbKv from 'idb-keyval'
// import { getStore, setupIdbKv } from './idb'
import { IdbKv } from './idb'

import { makeCachePolicy } from './util'
import usePodcast from './usePodcast'

const FRESHNESS = 86400
const cachePolicy = makeCachePolicy(FRESHNESS)

//const idbStore = setupIdbKv('podcastTitleImages')
// const _idbStore = new IdbKv.Store('LeagueDayTitleImages', 'titleImages')
// const idbStore = {
//   get: key => IdbKv.get(key, _idbStore),
//   set: (key, value) => IdbKv.set(key, value, _idbStore)
// }
const idbStore = new IdbKv('LeagueDayTitleImages', 'titleImages')

const clientOptions = {
  responseType: 'blob',
}
const client = axios.create(clientOptions)

// const fetchImageBlobDirectly = url => client.get(url).then(response => response.data)

const fetchImageBlobViaProxy = url => {
  const params = new URLSearchParams({
    kind: 'imgBlob',
    url
  })

  const proxyUrl = `/.netlify/functions/node-fetch?${params}`
  console.log('fetching', url, 'via', proxyUrl)

  return client.get(proxyUrl).then(response => response.data)
}

const usePodcastImage = podcast => {
  const [blob, setBlob] = React.useState()
  const [error, setError] = React.useState()

  const podcastId = podcast?.id

  const {rss: podcastDoc} = usePodcast(podcast)

  // this follows the RSS-2 heuristic approach
  const channelImageUrl = podcastDoc?.rss?.channel?.image?.url

  React.useEffect(() => {
    if (!channelImageUrl) return

    const handleError = tag => e => {
      console.error('error', tag, podcastId, channelImageUrl, e.message)
      setError(e.message)
    }

    idbStore.get(podcastId)
      .then(
        maybeCacheRecord => {
          const cacheStatus = cachePolicy.getStatus(maybeCacheRecord)

          return {
            cacheStatus,
            maybeBlob: cacheStatus === cachePolicy.MISS ? null : maybeCacheRecord.blob,
          }
        }
      ).then(
        params => {
          const {cacheStatus, maybeBlob} = params

          if (cacheStatus !== cachePolicy.MISS) setBlob(maybeBlob)

          return params
        }
      ).then(
        params => {
          const {cacheStatus} = params

          if (cacheStatus === cachePolicy.FRESH) return params
          else return fetchImageBlobViaProxy(channelImageUrl).then(
            freshBlob => {
              setBlob(freshBlob)

              idbStore.set(podcastId, {t: cachePolicy.now(), blob: freshBlob})
            }
          ).catch(
            handleError('fetch+set')
          )
        }
      ).catch(
        handleError('get')
      )
  }, [channelImageUrl])

  return {blob, error}
}

export default usePodcastImage
