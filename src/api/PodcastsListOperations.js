import { makeRequestHeaders } from './util'

const PODCASTS_LIST_ENDPOINT = `/.netlify/functions/fauna-podcasts-list`

const operatePodcastsList = (bearerToken, op, url) => {
  const params = new URLSearchParams({
    op,
    url,
  })

  return fetch(`${PODCASTS_LIST_ENDPOINT}?${params.toString()}`, {
    headers: makeRequestHeaders(bearerToken),
  })
    .then(res =>
      res.headers.get('Content-Type') === 'application/json'
        ? res.json()
        : res.text()
    )
    .catch(err => {
      if (NODE_ENV === 'development')
        console.error('user data request error', err)
      return err.message
    })
}

const PodcastsListOperations = {
  add: (bearerToken, url) => operatePodcastsList(bearerToken, 'add', url),
  fetch: bearerToken => operatePodcastsList(bearerToken, 'fetch'),
  remove: (bearerToken, url) => {
    console.log('plo.rm', url)
    return operatePodcastsList(bearerToken, 'remove', url)
  },
}

export default PodcastsListOperations
