import { makeRequestHeaders } from './util'

const VIEW_QUERY_ENDPOINT = `/.netlify/functions/fauna-view-query`

const fetchUserData = bearerToken =>
  fetch(VIEW_QUERY_ENDPOINT, {
    headers: makeRequestHeaders(bearerToken),
  })
    .then(res =>
      res.headers.get('Content-Type') === 'application/json'
        ? res.json()
        : res.text()
    )
    .catch(err => {
      if (NODE_ENV === 'development')
      return err.message
    })

export default fetchUserData;