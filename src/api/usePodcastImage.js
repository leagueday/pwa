import React from 'react'
import axios from 'axios'
import base64 from 'base64-js'

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
  this didn't work
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

const fetchImageBlobDirectly = url => {
  console.log('fetching', url)

  return client.get(url).then(response => response.blob())
}

const fetchImageBlobViaProxy = url => {
  const params = new URLSearchParams({
    kind: 'imgBlob',
    url
  })

  const proxyUrl = `/.netlify/functions/node-fetch?${params}`
  console.log('fetching', proxyUrl)

  return client.get(proxyUrl).then(
    response => {
      const data = response.data
      console.log('data', data)

      // const binaryDataString = data //window.atob(data)
      // console.log('bin data type', typeof(binaryDataString))
      // const byteArray = (new TextEncoder()).encode(binaryDataString)
      // console.log('byteArray data type', typeof(byteArray))
      // const testByteArray = new Uint8Array([
      //   137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,8,0,0,
      //   0,8,8,2,0,0,0,75,109,41,220,0,0,0,34,73,68,65,84,8,215,99,120,
      //   173,168,135,21,49,0,241,255,15,90,104,8,33,129,83,7,97,163,136,
      //   214,129,93,2,43,2,0,181,31,90,179,225,252,176,37,0,0,0,0,73,69,
      //   78,68,174,66,96,130])
      // console.log('response data', data)
      // console.log('response bin data string', binaryDataString)
      // console.log('response byte array', byteArray)

      // const charCodes = new Array(binaryDataString.length);
      // for (let i = 0; i < binaryDataString.length; i++) {
      //   charCodes[i] = binaryDataString.charCodeAt(i);
      // }
      // console.log(charCodes)

      // const shortArray = new Uint16Array(charCodes)
      // const byteArray = new Uint8Array(shortArray.buffer, shortArray.byteOffset, shortArray.byteLength)
      const byteArray = (new TextEncoder()).encode(data)
      console.log(byteArray)

      return new Blob([byteArray], {type: 'image/png'})
    }
  )
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
      console.error('error', tag, podcastId, channelImageUrl, e.message)
      setError(e.message)
    }

    //idbStore.get(podcastId)
    Promise.resolve(null)
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
          else return fetchImageBlobViaProxy(channelImageUrl).then(
            freshBlob => {
              setBlob(freshBlob)

              idbStore.set(podcastId, {t: now(), blob: freshBlob})
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
