import React from 'react'
import axios from 'axios'

import { IdbKvTimedExpiryCache } from './idb'

import usePodcast from './usePodcast'
import { channelSelectors } from '../model/rss'

const FRESHNESS = 86400
const idbStore = new IdbKvTimedExpiryCache('titleImages', FRESHNESS)

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
  console.log('fetching img', url, 'via', proxyUrl)

  return client.get(proxyUrl).then(response => response.data)
}

const usePodcastImage = podcast => {
  const [blob, setBlob] = React.useState()
  const [error, setError] = React.useState()

  const podcastId = podcast?.id

  const {rss} = usePodcast(podcast)

  const channelImageUrl = channelSelectors.v2.imageUrl(rss)

  const handleError = e => {
    console.error('error in titleImage fetch', podcastId, channelImageUrl, e.message)
    setError(e.message)
  }

  React.useEffect(() => {
    if (!channelImageUrl) return

    idbStore.get(podcastId)
      .then(
        params => {
          const [cacheStatus, maybeData] = params

          if (cacheStatus !== IdbKvTimedExpiryCache.MISS) setBlob(maybeData)

          return params
        }
      ).then(
        params => {
          const [cacheStatus] = params

          if (cacheStatus === IdbKvTimedExpiryCache.FRESH) {
            return Promise.resolve()
          }

          else return fetchImageBlobViaProxy(channelImageUrl).then(
            freshBlob => {
              setBlob(freshBlob)

              return idbStore.set(podcastId, freshBlob)
            }
          )
        }
      ).catch(
        handleError
      )
  }, [channelImageUrl])

  return {blob, error}
}

export default usePodcastImage
