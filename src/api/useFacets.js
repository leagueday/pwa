import React from 'react'

import useAirtable from './useAirtable'
import usePodcasts from './usePodcasts'

const base = 'appXoertP1WJjd4TQ'
const viewFacetsTablename = 'ViewFacets'
const facetsTablename = 'Facets'

const useViewFacets = viewName => {
  const { data } = useAirtable(base, viewFacetsTablename)

  if (!data) return null

  const filteredFacetTitles = []

  for (let {
    fields: { view_name: recordViewName, facet_title: facetTitle },
  } of data) {
    if (recordViewName === viewName) filteredFacetTitles.push(facetTitle)
  }

  return filteredFacetTitles
}

const useFacetsData = () => {
  const { data } = useAirtable(base, facetsTablename)

  const map = new Map()

  ;(data ?? []).forEach(({ fields: { title, podcast_url: podcastUrl } }) => {
    if (title && podcastUrl) {
      const urlsList = map.get(title)

      if (urlsList) {
        urlsList.push(podcastUrl)
      } else {
        map.set(title, [podcastUrl])
      }
    }
  })

  return map
}

const useFacets = viewName => {
  const { data: podcastsData } = usePodcasts()

  const lookupPodcast = React.useMemo(
    () =>
      podcastsData
        ? (map => podcastUrl => map.get(podcastUrl))(
            new Map(podcastsData.map(record => [record.url, record]))
          )
        : null,
    [podcastsData]
  )

  const facets = useFacetsData()

  const viewFacetsList = useViewFacets(viewName)

  if (!lookupPodcast || facets.size === 0 || !viewFacetsList) return new Map()

  const facetTitleUrlsList = viewFacetsList.map(facetTitle => [
    facetTitle,
    facets.get(facetTitle),
  ])

  return new Map(
    facetTitleUrlsList.map(([facetTitle, podcastUrlsList]) => [
      facetTitle,
      (podcastUrlsList ?? []).map(podcastUrl => lookupPodcast(podcastUrl)),
    ])
  )
}

export default useFacets
