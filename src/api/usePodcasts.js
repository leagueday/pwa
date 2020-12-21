import useAirtable from './useAirtable'

const base = 'appXoertP1WJjd4TQ'
const table = 'Table 1'

const usePodcasts = () => useAirtable(base, table)

export default usePodcasts
