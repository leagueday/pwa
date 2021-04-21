import React from 'react'

import useAirtable from './useAirtable'

const base = 'appXoertP1WJjd4TQ'
const table = 'Podcasts'

const sortList = set => [...set.values()].sort((a, b) => a.localeCompare(b))

const reformat = (data, rankFieldname) => {
  if (!data) return { data: null, categories: null, subCategories: null }

  const categories = new Set()
  const subCategories = new Map()

  const picked = data
    .map(({ fields, id }) => {
      /*
        "Category": "Anime",
        "Notes: Podcast Sheet Subcategory": "Game",
        "Sub-Category": "Pokemon",
        "Podcast Name": "EXP Share: Pokemon Playthrough",
        "Tile Subtext": "Splash text for front page display",
        "RSS Feed": "https://anchor.fm/s/1018a71c/podcast/rss",
        "Notes: Podcast Sheet Genre": "Live playthroughs of Poke games"
        "Display Category": "Trending",
        "Display Rank": 2.0,
        "Featured Display Category": "Preediction",
        "Featured Display Rank": 1.0,
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
        tileSubtext: fields['Tile Subtext'],
        subCategory,
        featuredDisplayCategory: fields['Featured Display Category'],
        featuredDisplayRank: fields['Featured Display Rank'],
        displayCategory: fields['Display Category'],
        displayRank: fields['Display Rank'],
        url: fields['RSS Feed'],
      }
    })
    .filter(feed => {
      return !feed.disabled && !!feed.url
    })
    .sort((feed1, feed2) => {
      const feed1Rank = feed1[rankFieldname]
      const feed1HasRank = !!feed1Rank || feed1Rank === 0
      const feed2Rank = feed2[rankFieldname]
      const feed2HasRank = !!feed2Rank || feed2Rank === 0

      if (feed1HasRank) {
        if (!feed2HasRank) return -1
        else if (feed1Rank !== feed2Rank) return feed1Rank - feed2Rank
        else return feed1.name.localeCompare(feed2.name)
      }

      if (feed2HasRank) return 1

      return feed1.name.localeCompare(feed2.name)
    })

  return {
    data: picked,
    categories: sortList(categories),
    subCategories: [...subCategories.entries()].reduce(
      (res, [cat, subcats]) => ({ ...res, ...{ [cat]: sortList(subcats) } }),
      {}
    ),
  }
}

const usePodcasts = (rankFieldname = 'displayRank') => {
  const { data, error } = useAirtable(base, table)

  const reformattedData = React.useMemo(() => reformat(data, rankFieldname), [
    data,
  ])

  return { ...reformattedData, error }
}

export default usePodcasts
