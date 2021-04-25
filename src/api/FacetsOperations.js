import { makeRequestHeaders } from './util'

const FACETS_ENDPOINT = '/.netlify/functions/fauna-facets'

const operateFacets = (bearerToken, op, facet) => {
  const params = new URLSearchParams({
    op,
    facet: facet ? JSON.stringify(facet) : null,
  })

  return fetch(`${FACETS_ENDPOINT}?${params.toString()}`, {
    headers: makeRequestHeaders(bearerToken),
  })
    .then(res =>
      res.headers.get('Content-Type') === 'application/json'
        ? res.json()
        : res.text()
    )
    .catch(err => {
      if (NODE_ENV === 'development')
        console.error('channel ops request error', err)
      return err.message
    })
}

const FacetsOperations = {
  add: (bearerToken, facet) => operateFacets(bearerToken, 'add', facet),
  fetch: bearerToken => operateFacets(bearerToken, 'fetch'),
  remove: (bearerToken, facet) => operateFacets(bearerToken, 'remove', facet),
  update: (bearerToken, facet) => operateFacets(bearerToken, 'update', facet),
}

export default FacetsOperations
