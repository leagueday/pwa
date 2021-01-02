import axios from 'axios'
import useSWR from 'swr'
import parseXml from '@rgrove/parse-xml'

import { laminate } from './util'

const clientOptions = {
}
const swrOptions = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
} // (see https://swr.vercel.app/docs/options)

const client = axios.create(clientOptions)
const defaultParseXmlString = parseXml

const fetchThenParse = (url, parseXmlString) => async () => {
  try {
    const rssResponse = await client.get(url)
    return laminate(parseXmlString(rssResponse?.data))
  } catch (e) {
    console.error(e)
    throw(e)
  }
}

const fetcher =
  (podcast, parseXmlString) =>
    (url =>
      url ? fetchThenParse(url, parseXmlString) : () => Promise.resolve(null)
    )(
      podcast?.url
    )

const usePodcast = (podcast, parseXmlString=defaultParseXmlString) => {
  const cacheKey = podcast?.url ?? 'nil'

  return useSWR(cacheKey, fetcher(podcast, parseXmlString), swrOptions)
}

export default usePodcast
