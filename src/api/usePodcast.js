import React from 'react'
import axios from 'axios'
import parseXml from '@rgrove/parse-xml'

import { laminate } from './util'

const defaultParseXmlString = parseXml

import { IdbKvTimedExpiryCache } from './idb'

const FRESHNESS = 86400
const idbStore = new IdbKvTimedExpiryCache('rss', FRESHNESS)

const clientOptions = {
}
const client = axios.create(clientOptions)

const fetchRssDocViaProxy = url => {
  const params = new URLSearchParams({
    kind: 'doc',
    url
  })

  const proxyUrl = `/.netlify/functions/node-fetch?${params}`
  console.log('fetching doc', url, 'via', proxyUrl)

  return client.get(proxyUrl).then(response => response.data)
}

const usePodcast = (podcast, options={}, parseXmlString=defaultParseXmlString) => {
  const forceRevalidate = options.forceRevalidate ?? false

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

    let componentDidUnmount = false

    idbStore.get(podcastId).then(
      params => {
        const [cacheStatus, maybeData] = params

        if (cacheStatus !== IdbKvTimedExpiryCache.MISS && !componentDidUnmount) {
          setRss(maybeData)
        }

        return params
      }
    ).then(
      ([cacheStatus]) => {
        if (cacheStatus === IdbKvTimedExpiryCache.FRESH && !forceRevalidate) return Promise.resolve()

        return fetchRssDocViaProxy(podcastUrl).then(parseRss).then(
          rss => {
            if (!componentDidUnmount) setRss(rss)

            return idbStore.set(podcastId, rss)
          }
        )
      }
    ).catch(handleError)

    return () => { componentDidUnmount = true }
  }, [podcastId, podcastUrl])

  return {error, rss}
}

export default usePodcast
