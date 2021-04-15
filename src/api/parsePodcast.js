import {makeRequestHeaders} from './util'

const PARSE_PODCAST_ENDPOINT = `/.netlify/functions/parse-podcast`

const parsePodcast = async (bearerToken, podcastId, podcastUrl) => {
  const params = new URLSearchParams({
    podcastId,
    podcastUrl,
  })

  return fetch(
    `${PARSE_PODCAST_ENDPOINT}?${params}`,
    {
      headers: makeRequestHeaders(bearerToken)
    }
  )
}

export default parsePodcast
