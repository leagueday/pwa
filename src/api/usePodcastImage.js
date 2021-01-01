import React from 'react'
import useAsyncEffect from '@n1ru4l/use-async-effect'

import { setupIdbKv } from './idb'
import usePodcast from './usePodcast'

const CACHE_MISS = 1
const CACHE_FRESH = 2
const CACHE_STALE = 3
const FRESHNESS = 86400

const idbStore = setupIdbKv('podcastTitleImages')

const now = () => Date.now() / 1000

const isFresh = t => now() - t < FRESHNESS

const usePodcastImage = podcast => {
  const [blob, setBlob] = React.useState()
  const [error, setError] = React.useState()

  const podcastId = podcast?.id

  const {data: podcastDoc} = usePodcast(podcast)

  // this follows the RSS-2 heuristic approach
  const channelImageUrl = podcastDoc?.rss?.channel?.image?.url

  useAsyncEffect(
    function* (_, c) {
      if (!podcastId || !channelImageUrl) return

      try {
        const cacheRecord = yield* c(
          idbStore.get(podcastId)
        )

        const cacheStatus =
          !cacheRecord
            ? CACHE_MISS
            : isFresh(cacheRecord.t)
            ? CACHE_FRESH
            : CACHE_STALE

        if (cacheStatus === CACHE_FRESH || cacheStatus === CACHE_STALE) {
          setBlob(cacheRecord.blob)
        }

        if (cacheStatus === CACHE_FRESH) return

        const imgBlob = yield* c(
          fetch(channelImageUrl).blob()
        )

        setBlob(imgBlob)

        idbStore.set(podcastId, {t: now(), blob: imgBlob})
      } catch(e) {
        console.error(e)
        setError(e)
      }
    },
    [podcastId, channelImageUrl]
  )

  return {blob, error}
}

export default usePodcastImage
