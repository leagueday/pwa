import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import {actions, selectors} from '../store'
import { makeNextColor } from './util'
import PodcastTile from './PodcastTile'
import SideButtons from './SideButtons'

const PAGE_LENGTH = 6

const useStyles = makeStyles({
  pagedPodcastTiles: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tile: {
    flex: 1,
    height: '100%',
    marginRight: '1vw',
    ['&:last-child']: {
      marginRight: 0,
    },
  },
})

const EmptyTile = () => {
  return (
    <div />
  )
}

const PagedPodcastTiles = ({id, podcasts}) => {
  const classes = useStyles()

  const maybePageNum = useSelector(selectors.getPageNum(id))
  const dispatch = useDispatch()

  const pageNum = maybePageNum ?? 0
  const setPageNum = pageNum => dispatch(actions.setPageNum(id, pageNum))

  const numPages = Math.ceil((podcasts?.length ?? 0) / PAGE_LENGTH)
  const goNextPage = pageNum + 1 < numPages ? () => setPageNum(pageNum + 1) : null
  const goPrevPage = pageNum > 0 ? () => setPageNum(pageNum - 1) : null

  const displayPodcasts = podcasts ? podcasts.slice(pageNum * PAGE_LENGTH, (pageNum + 1) * PAGE_LENGTH) : []

  const nextColor = makeNextColor()

  let baseIndex = pageNum * PAGE_LENGTH

  return (
    <SideButtons
      accentColor="magenta"
      onLeftClick={goPrevPage}
      onRightClick={goNextPage}>
      <div className={classes.pagedPodcastTiles}>
      {[
        ...displayPodcasts.map(
          podcast => podcast ? (
            <div key={baseIndex++} className={classes.tile}>
              <PodcastTile
                podcast={podcast}
                textColor={nextColor()}
              />
            </div>
          ) : null
        ),
        ...(
          () => {
            const result = []
            for (let i = displayPodcasts.length; i < PAGE_LENGTH; i++) {
              result.push(
                <div key={baseIndex++} className={classes.tile}>
                  <EmptyTile />
                </div>
              )
            }
            return result
          }
        )()
      ]}
      </div>
    </SideButtons>
  )
}

export default PagedPodcastTiles
