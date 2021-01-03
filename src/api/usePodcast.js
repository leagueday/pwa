import React from 'react'
import axios from 'axios'
import parseXml from '@rgrove/parse-xml'

import { laminate } from './util'

const defaultParseXmlString = parseXml

import { IdbKvTimedExpiryCache } from './idb'

const FRESHNESS = 300
const idbStore = new IdbKvTimedExpiryCache('rss', FRESHNESS)

const clientOptions = {
}
const client = axios.create(clientOptions)

// tbd put this on the cors proxy to enable more podcasts
const fetchDirect = url => {
  console.log('fetching rss', url)
  return client.get(url).then(response => response?.data)
}

const usePodcast = (podcast, parseXmlString=defaultParseXmlString) => {
  const [rss, setRss] = React.useState()
  const [error, setError] = React.useState()

  const podcastId = podcast?.id
  const podcastUrl = podcast?.url

  const parseRss = rssData => laminate(parseXmlString(rssData))

  const handleError = e => {
    console.error('error in podcast fetch+parse', podcastId, podcastUrl, e.message)
    setError(e.message)
  }

  React.useEffect(() => {
    if (!podcastId || !podcastUrl) return

    idbStore.get(podcastId).then(
      params => {
        const [cacheStatus, maybeData] = params

        if (cacheStatus !== IdbKvTimedExpiryCache.MISS) {
          setRss(maybeData)
        }

        return params
      }
    ).then(
      ([cacheStatus]) => {
        if (cacheStatus === IdbKvTimedExpiryCache.FRESH) return Promise.resolve()

        return fetchDirect(podcastUrl).then(parseRss).then(
          rss => {
            setRss(rss)

            return idbStore.set(podcastId, rss)
          }
        )
      }
    ).catch(handleError)
  }, [podcastId, podcastUrl])

  return {error, rss}
}

export default usePodcast
