import React from 'react'
import { useSelector } from 'react-redux'

import * as selectors from '../selectors'

const useFilter = () => {
  const filter = useSelector(selectors.getFilter)

  let kind = filter?.kind
  let cat = filter?.cat
  let subcat = filter?.subcat

  return {kind, cat, subcat}
}

export default useFilter
