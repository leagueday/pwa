import { makeRequestHeaders } from './util'

const QUERY_PODCAST_ENDPOINT = `/.netlify/functions/fauna-query-podcast`

const queryPodcast = async (bearerToken, podcastId) => {
  const params = new URLSearchParams({
    id: podcastId,
  })

  return fetch(`${QUERY_PODCAST_ENDPOINT}?${params}`, {
    headers: makeRequestHeaders(bearerToken),
  }).then(res =>
    res.headers.get('Content-Type') === 'application/json'
      ? res.json()
      : res.text()
  )
}

export default queryPodcast
