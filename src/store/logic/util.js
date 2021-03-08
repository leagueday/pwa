
export const nextCounters = (keyword, counters) => Object.entries(counters).reduce(
  (acc, [tag, count]) => {
    acc[tag] = tag === keyword ? count + 1 : count
    return acc
  },
  { }
)
