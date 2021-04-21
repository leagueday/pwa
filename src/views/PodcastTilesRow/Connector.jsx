import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actions, selectors } from '../../store'

const Connector = ({ children, id, pageSize, podcasts }) => {
  const maybePageNum = useSelector(selectors.getPageNum(id))
  const dispatch = useDispatch()

  const pageNum = maybePageNum ?? 0
  const setPageNum = pageNum => dispatch(actions.setPageNum(id, pageNum))

  const numPages = Math.ceil((podcasts?.length ?? 0) / pageSize)
  const goNextPage =
    pageNum + 1 < numPages ? () => setPageNum(pageNum + 1) : null
  const goPrevPage = pageNum > 0 ? () => setPageNum(pageNum - 1) : null

  const displayPodcasts =
    podcasts && pageNum * pageSize < podcasts.length
      ? podcasts.slice(pageNum * pageSize, (pageNum + 1) * pageSize)
      : []

  return <>{children({ displayPodcasts, goNextPage, goPrevPage })}</>
}

export default Connector
