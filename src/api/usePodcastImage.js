import React from 'react'
import axios from 'axios'

import { IdbKv } from './idb'

import usePodcast from './usePodcast'

const FRESHNESS = 86400
const idbStore = new IdbKv('titleImages', FRESHNESS)

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

          if (cacheStatus !== IdbKv.MISS) setBlob(maybeData)

          return params
        }
      ).then(
        params => {
          const {cacheStatus} = params

          if (cacheStatus === IdbKv.FRESH) return Promise.resolve()

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
