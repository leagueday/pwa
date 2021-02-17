import React from 'react'
import axios from 'axios'
import parseXml from '@rgrove/parse-xml'

import * as apiConsts from './consts'
import { laminate, proxifyUrl } from './util'
import * as analytics from '../analytics'

const defaultParseXmlString = parseXml

import { IdbKvTimedExpiryCache } from './idb'

const FRESHNESS = 86400
const idbStore = new IdbKvTimedExpiryCache('rss', FRESHNESS)

const clientOptions = {
}
const client = axios.create(clientOptions)

const fetchRssDocViaProxy = url => {
  const proxyUrl = proxifyUrl(url, apiConsts.PROXY_RESPONSE_KIND_DOC)
  console.log('fetching doc', url, 'via', proxyUrl)
  const t0 = Date.now()

  return client.get(proxyUrl).then(response => {
    analytics.timing('podcast', 'rss-fetch', Date.now() - t0, url)

    return response.data
  })
}

export const loadOrFetchPodcastRssDoc = (podcastId, podcastUrl) =>
  idbStore.get(podcastId).then(
    ([, maybeData]) => maybeData ?? fetchRssDocViaProxy(podcastUrl)
  )

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

        return fetchRssDocViaProxy(podcastUrl).then(
          rssData => {
            if (componentDidUnmount) return {}

            const t0 = Date.now()

            const rssJson = parseRss(rssData)

            analytics.timing('podcast', 'parse-rss', Date.now() - t0, podcastUrl)

            return rssJson
          }).then(
            rssJson => {
              if (!componentDidUnmount) {
                setRss(rssJson)
                return idbStore.set(podcastId, rssJson)
              }
            }
          )
      }
    ).catch(handleError)

    return () => { componentDidUnmount = true }
  }, [podcastId, podcastUrl])

  return {error, rss}
}

export default usePodcast
