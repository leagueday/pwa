import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import {actions, selectors} from '../store'
import ChannelTile from './ChannelTile'
import SideButtons from './SideButtons'

const PAGE_LENGTH = 6

const useStyles = makeStyles({
  channelTiles: {
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

const ChannelTiles = ({id, channels}) => {
  const classes = useStyles()

  const maybePageNum = useSelector(selectors.getPageNum(id))
  const dispatch = useDispatch()

  const pageNum = maybePageNum ?? 0
  const setPageNum = pageNum => dispatch(actions.setPageNum(id, pageNum))

  const numPages = Math.ceil((channels?.length ?? 0) / PAGE_LENGTH)
  const goNextPage = pageNum + 1 < numPages ? () => setPageNum(pageNum + 1) : null
  const goPrevPage = pageNum > 0 ? () => setPageNum(pageNum - 1) : null

  const displayChannels =
    channels && pageNum * PAGE_LENGTH < channels.length
    ? channels.slice(pageNum * PAGE_LENGTH, (pageNum + 1) * PAGE_LENGTH)
    : []

  let baseIndex = pageNum * PAGE_LENGTH

  return (
    <SideButtons
      accentColor="magenta"
      onLeftClick={goPrevPage}
      onRightClick={goNextPage}>
      <div className={classes.channelTiles}>
        {[
          ...displayChannels.map(
            channel => (
              <div key={baseIndex++} className={classes.tile}>
                <ChannelTile key={baseIndex++} channel={channel} />
              </div>
            )
          ),
          ...(
            () => {
              const result = []
              for (let i = displayChannels.length; i < PAGE_LENGTH; i++) {
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

export default ChannelTiles
