import React from 'react'

import useAirtable from './useAirtable'
import useStarred from './useStarred'

import {constants as storeConsts, useFilter} from '../store'

const base = 'appXoertP1WJjd4TQ'
const table = 'Podcasts'

const sortList = set => ([...set.values()]).sort((a, b) => a.localeCompare(b))

const reformat = (data, isStar) => {
  if (!data) return {data: null, categories: null, subCategories: null}

  const categories = new Set()
  const subCategories = new Map()

  const picked = data.map(
    ({fields, id}) => {
      /*
        "Category": "Anime",
        "Notes: Podcast Sheet Subcategory": "Game",
        "Sub-Category": "Pokemon",
        "Podcast Name": "EXP Share: Pokemon Playthrough",
        "RSS Feed": "https://anchor.fm/s/1018a71c/podcast/rss",
        "Notes: Podcast Sheet Genre": "Live playthroughs of Poke games"
        "Suggested": 2,
        "Display Category": "Trending",
       */

      const category = fields['Category'] ?? 'Uncategorized'
      const subCategory = fields['Sub-Category']

      categories.add(category)

      if (subCategory && subCategory !== '-') {
        const maybeSubcats = subCategories.get(category)

        if (maybeSubcats) {
          maybeSubcats.add(subCategory)
        } else {
          const subcats = new Set([subCategory])
          subCategories.set(category, subcats)
        }
      }

      return {
        category,
        disabled: fields.Disabled,
        id,
        name: fields['Podcast Name'],
        softDisabled: fields.SoftDisable,
        subCategory,
        displayCategory: fields['Display Category'],
        suggested: fields.Suggested,
        url: fields['RSS Feed'],
      }
    }
  ).filter(feed => {
    return !feed.disabled && !!feed.url
  }).sort((feed1, feed2) => {
    if (isStar(feed1.id)) {
      if (!isStar(feed2.id)) return -1
      else return feed1.name.localeCompare(feed2.name)
    }
    else if (isStar(feed2.id)) {
      return 1
    }
    else if (feed1.suggested) {
      if (!feed2.suggested) return -1
      else if (feed1.suggested !== feed2.suggested) return feed1.suggested - feed2.suggested
      else return feed1.name.localeCompare(feed2.name)
    }
    else if (feed2.suggested) return 1
    else return feed1.name.localeCompare(feed2.name)
  })

  return {
    data: picked,
    categories: sortList(categories),
    subCategories: ([...subCategories.entries()]).reduce(
      (res, [cat, subcats]) => ({...res, ...{[cat]: sortList(subcats)}}), {}
    ),
  }
}

const filterSoftDisabled = podcastsList => podcastsList.filter(podcast => !podcast.softDisabled)

const usePodcasts = () => {
  const {data, error} = useAirtable(base, table)

  const [isStar] = useStarred()

  const reformattedData = React.useMemo(
    () => reformat(data, isStar),
    [data, isStar]
  )

  const refoData = reformattedData.data

  const filter = useFilter()

  const filteredData = React.useMemo(
    () => {
      if (!refoData) {
        return []
      }

      const {kind: filterKind, cat: filterCat, subcat: filterSubcat} = filter

      if (!filterKind) {
        return filterSoftDisabled(refoData)
      }

      return refoData.filter(
        podcast => {
          if (filterKind === storeConsts.FILTER_KIND_CAT) return filterCat === podcast.category

          if (filterKind === storeConsts.FILTER_KIND_SUBCAT) return filterSubcat === podcast.subCategory

          if (filterKind === storeConsts.FILTER_KIND_FEATURED) return podcast.suggested != null

          if (filterKind === storeConsts.FILTER_KIND_MY_LIST) return isStar(podcast.id)

          throw new Error(`Unknown filter: ${filterKind}`)
        }
      )
    },
    [refoData, filter]
  )

  return {...reformattedData, filteredData, error}
}

export default usePodcasts
