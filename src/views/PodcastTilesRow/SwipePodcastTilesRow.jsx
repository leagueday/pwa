import React from 'react'
import { useSwipeable } from 'react-swipeable'

import { makeStyles } from '@material-ui/core'

import { makeNextColor } from '../util'
import Connector from './Connector'
import PodcastTile from './PodcastTile'

const PAGE_LENGTH = 3

const useStyles = makeStyles(theme => ({
  swipePodcastTilesRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  tile: {
    flex: 1,
    height: '100%',
    marginRight: '1vw',
    ['&:last-child']: {
      marginRight: 0,
    },
  },
}))

const EmptyTile = () => {
  return <div />
}

const SwipePodcastTilesRow = ({ id, podcasts }) => {
  const classes = useStyles()

  return (
    <Connector id={id} pageSize={PAGE_LENGTH} podcasts={podcasts}>
      {({ displayPodcasts, goNextPage, goPrevPage }) => {
        const swipeHandlers = useSwipeable({
          onSwiped: eventData => {
            const dir = eventData?.dir

            if (dir === 'Left') {
              goNextPage()
            } else if (dir === 'Right') {
              goPrevPage()
            }
          },
        })

        const nextColor = makeNextColor()
        let baseIndex = 0

        return (
          <div className={classes.swipePodcastTilesRow} {...swipeHandlers}>
            {[
              ...displayPodcasts.map(podcast =>
                podcast ? (
                  <div key={baseIndex++} className={classes.tile}>
                    <PodcastTile podcast={podcast} textColor={nextColor()} />
                  </div>
                ) : null
              ),
              ...(() => {
                const result = []
                for (let i = displayPodcasts.length; i < PAGE_LENGTH; i++) {
                  result.push(
                    <div key={baseIndex++} className={classes.tile}>
                      <EmptyTile />
                    </div>
                  )
                }
                return result
              })(),
            ]}
          </div>
        )
      }}
    </Connector>
  )
}

export default SwipePodcastTilesRow
