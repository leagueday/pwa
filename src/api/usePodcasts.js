import useAirtable from './useAirtable'

const base = 'appXoertP1WJjd4TQ'
const table = 'Table 1'

const reformat = data => {
  if (!data) return data

  const categories = new Set()
  const subCategories = new Map()

  const picked = data.map(({fields, id}) => {
    /*
      "Category": "Anime",
      "Notes: Podcast Sheet Subcategory": "Game",
      "Sub-Category": "Pokemon",
      "Podcast Name": "EXP Share: Pokemon Playthrough",
      "RSS Feed": "https://anchor.fm/s/1018a71c/podcast/rss",
      "Notes: Podcast Sheet Genre": "Live playthroughs of Poke games"
     */

    const category = fields['Category']
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
      id,
      category,
      subCategory,
      name: fields['Podcast Name'],
      feed: fields['RSS Feed']
    }
  })

  return {
    data: picked,
    categories: [...categories],
    subCategories: ([...subCategories.entries()]).reduce(
      (res, [cat, subcats]) => ({...res, ...{[cat]: [...subcats]}}), {}
    ),
  }
}

const usePodcasts = () => {
  const {data, error} = useAirtable(base, table)

  const reformattedData = reformat(data)

  return {...reformattedData, error}
}

export default usePodcasts
