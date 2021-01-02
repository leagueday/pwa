import React from 'react'
import axios from 'axios'

import { setupIdbKv } from './idb'
import usePodcast from './usePodcast'

const CACHE_MISS = 1
const CACHE_FRESH = 2
const CACHE_STALE = 3
const FRESHNESS = 86400

const idbStore = setupIdbKv('podcastTitleImages')

const now = () => Date.now() / 1000

const isFresh = t => now() - t < FRESHNESS

const clientOptions = { }
const client = axios.create(clientOptions)

/*
      fetch(
        new Request(channelImageUrl, {
          method: 'GET',
          mode: 'no-cors',
        })
      ).then(response => {
        console.log('got response -> blob()')
        return response.blob()
      }).then(blob => {
        console.log('got blob -> setState', blob)
        setBlob(blob)
      }).catch(
        setError
      )
 */

const fetchImageBlob = url => {
  console.log('fetching', url)

  return client.get(url).then(response => response.blob())
}

const usePodcastImage = podcast => {
  const [blob, setBlob] = React.useState()
  const [error, setError] = React.useState()

  const podcastId = podcast?.id

  const {data: podcastDoc} = usePodcast(podcast)

  // this follows the RSS-2 heuristic approach
  const channelImageUrl = podcastDoc?.rss?.channel?.image?.url

  React.useEffect(() => {
    if (!channelImageUrl) return

    const handleError = tag => e => {
      console.error('error', tag, podcastId, channelImageUrl, e.msg)
      setError(e.msg)
    }

    idbStore.get(podcastId)
      .then(
        maybeCacheRecord => {
          const cacheStatus =
            !maybeCacheRecord
              ? CACHE_MISS
              : isFresh(maybeCacheRecord.t)
              ? CACHE_FRESH
              : CACHE_STALE

          return {
            cacheStatus,
            maybeBlob: cacheStatus === CACHE_MISS ? null : maybeCacheRecord.blob,
          }
        }
      ).then(
        params => {
          const {cacheStatus, maybeBlob} = params

          if (cacheStatus !== CACHE_MISS) setBlob(maybeBlob)

          return params
        }
      ).then(
        params => {
          const {cacheStatus} = params

          if (cacheStatus === CACHE_FRESH) return params
          else return fetchImageBlob(channelImageUrl).then(
            freshBlob => {
              setBlob(freshBlob)

              idbStore.set(podcastId, {t: now(), blob: freshBlob})
            }
          ).catch(
            handleError('fetch+set')
          )
        }
      ).catch(
        handleError('fetch+set')
      )
  }, [channelImageUrl])

  return {blob, error}
}

export default usePodcastImage
