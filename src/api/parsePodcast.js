import { makeRequestHeaders } from './util'

const PARSE_PODCAST_ENDPOINT = `/.netlify/functions/parse-podcast`

const parsePodcast = (bearerToken, podcastId, podcastUrl) => {
  const params = new URLSearchParams({
    podcastId,
    podcastUrl,
  })

  return fetch(`${PARSE_PODCAST_ENDPOINT}?${params}`, {
    headers: makeRequestHeaders(bearerToken),
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response
  })
}

export default parsePodcast
