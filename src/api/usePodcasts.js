
import { useSelector } from 'react-redux'
import * as selectors from '../store/selectors'
import useAirtable from './useAirtable'

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
        "Suggested": true,
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
        subCategory,
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

const usePodcasts = () => {
  const {data, error} = useAirtable(base, table)

  const starred = useSelector(selectors.getStarred)
  const isStar = starred ? podcastId => !!starred[podcastId] : () => false

  const reformattedData = reformat(data, isStar)

  return {...reformattedData, error}
}

export default usePodcasts
