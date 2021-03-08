import React from 'react'
import axios from 'axios'
import parseXml from '@rgrove/parse-xml'
import useSWR, { cache as swrCache } from 'swr'

import { laminate, proxifyUrl } from './util'
import * as analytics from '../analytics'

import { IdbKvTimedExpiryCache } from './idb'

const FRESHNESS = 86400
const idbStore = new IdbKvTimedExpiryCache('rss', FRESHNESS)

const clientOptions = {
}
const client = axios.create(clientOptions)

const fetchRssDocViaProxy = url => {
  const proxyUrl = proxifyUrl(url)
  console.log('fetching doc', url, 'via', proxyUrl)

  const t0 = Date.now()

  return client.get(proxyUrl).then(response => {
    analytics.timing('podcast', 'rss-fetch', Date.now() - t0, url)

    return response.data
  })
}

const fetchRssDocViaProxyThenParseThenUpdateIdb = (url, isCanceled=()=>false) =>
  fetchRssDocViaProxy(url).then(
    rssData => {
      if (isCanceled()) return {}

      const t0 = Date.now()

      const rssJson = laminate(parseXml(rssData))

      analytics.timing('podcast', 'parse-rss', Date.now() - t0, url)

      return rssJson
    }).then(
      rssJson => {
        if (!isCanceled()) {
          idbStore.set(url, rssJson)
        }
        return rssJson
      }
    )

export const loadOrFetchPodcastRssDoc = url =>
  idbStore.get(url).then(
    ([, maybeData]) => maybeData ?? fetchRssDocViaProxyThenParseThenUpdateIdb(url)
  )

const loadOrFetchIdbSwr = (url, forceRevalidate, isCanceled) => () => {
  if (!url) return Promise.resolve()

  return idbStore.get(url).then(
    ([cacheStatus, maybeData]) => {
      if (cacheStatus === IdbKvTimedExpiryCache.FRESH && !forceRevalidate) return maybeData

      return fetchRssDocViaProxyThenParseThenUpdateIdb(url, isCanceled)
    }
  )
}

const usePodcast = (podcast, options={}) => {
  const forceRevalidate = options.forceRevalidate ?? false

  const podcastUrl = podcast?.url

  let componentDidUnmount = false

  const isCanceled = () => componentDidUnmount

  const {data: rss, error} = useSWR(
    podcastUrl,
    loadOrFetchIdbSwr(podcastUrl, forceRevalidate, isCanceled),
    {
      revalidateOnFocus: false,
      revalidateOnMount: !swrCache.has(podcastUrl), // default is true
      shouldRetryOnError: false,
    })

  React.useEffect(() => {
    if (error) {
      console.error('error in podcast fetch+parse', podcastUrl, error.message)
    }
  }, [error])

  React.useEffect(() => {
    return () => { componentDidUnmount = true }
  }, [])

  return {error, rss}
}

export default usePodcast
