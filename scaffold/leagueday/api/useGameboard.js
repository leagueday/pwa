// DEPRECATED

import useAirtable from './useAirtable'

const base = 'appXoertP1WJjd4TQ'
const table = 'Gameboard'

const reformat = (picks = [], renames = {}) => data => {
  if (!data) return data

  return data.map(({ fields, id }) => {
    if (picks.length === 0) {
      if (Object.keys(renames).length === 0) {
        return { id, ...fields }
      }

      return Object.entries(fields).reduce(
        (acc, [k, v]) => {
          const k2 = renames[k] ?? k
          acc[k2] = v
          return acc
        },
        { id }
      )
    }

    const pickSet = new Set(picks)

    return Object.entries(fields).reduce(
      (acc, [k, v]) => {
        if (pickSet.has(k)) {
          const k2 = renames[k] ?? k
          acc[k2] = v
        }
        return acc
      },
      { id }
    )
  })
}

const useGameboard = () => {
  const { data, error } = useAirtable(base, table)

  return { data: reformat()(data), error }
}

export default useGameboard
