import React from 'react'
import axios from 'axios'
import parseXml from '@rgrove/parse-xml'

import { laminate, makeCachePolicy } from './util'

import { IdbKv } from './idb'

const FRESHNESS = 300
const cachePolicy = makeCachePolicy(FRESHNESS)

const clientOptions = {
}

const idbStore = new IdbKv('LeagueDayRss', 'rss')

const client = axios.create(clientOptions)
const defaultParseXmlString = parseXml

// tbd put this on the cors proxy to enable more podcasts
const fetchAndParseRssDirect = (url, parseXmlString) => async () => {
  try {
    const rssResponse = await client.get(url)
    return laminate(parseXmlString(rssResponse?.data))
  } catch (e) {
    console.error(e)
    throw(e)
  }
}

const usePodcast = (podcast, parseXmlString=defaultParseXmlString) => {
  const [rss, setRss] = React.useState()
  const [error, setError] = React.useState()

  const podcastId = podcast?.id
  const podcastUrl = podcast?.url

  React.useEffect(() => {
    if (!podcastId || !podcastUrl) return

    const handleError = tag => e => {
      console.error('error', tag, podcastId, podcastUrl, e.message)
      setError(e.message)
    }

    idbStore.get(podcastId)
    .then(
      maybeCacheRecord => {
        const cacheStatus = cachePolicy.getStatus(maybeCacheRecord)

        return {
          cacheStatus,
          maybeData: cacheStatus === cachePolicy.MISS ? null : maybeCacheRecord.data,
        }
      }
    ).then(
      params => {
        const {cacheStatus, maybeData} = params

        if (cacheStatus !== cachePolicy.MISS) setRss(maybeData)

        return params
      }
    ).then(
      params => {
        const {cacheStatus} = params

        if (cacheStatus === cachePolicy.FRESH) return params
        else return fetchAndParseRssDirect(podcastUrl, parseXmlString)().then(
          rss => {
            setRss(rss)

            idbStore.set(podcastId, {t: cachePolicy.now(), data: rss})
          }
        ).catch(
          handleError('fetch+set')
        )
      }
    ).catch(
      handleError('get')
    )
  }, [podcastId, podcastUrl])

  return {error, rss}
}

export default usePodcast
