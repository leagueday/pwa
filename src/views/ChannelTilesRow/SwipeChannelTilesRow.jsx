import React from 'react'
import { useSwipeable } from 'react-swipeable'

import { makeStyles } from '@material-ui/core'

import ChannelTile from './ChannelTile'
import Connector from './Connector'

const PAGE_LENGTH = 3

const useStyles = makeStyles(theme => ({
  swipeChannelTilesRow: {
    display: 'flex',
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

const SwipeChannelTilesRow = ({ id, channels }) => {
  const classes = useStyles()

  return (
    <Connector channels={channels} id={id} pageSize={PAGE_LENGTH}>
      {({ displayChannels, goNextPage, goPrevPage }) => {
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

        let baseIndex = 0

        return (
          <div className={classes.swipeChannelTilesRow} {...swipeHandlers}>
            {[
              ...displayChannels.map(channel => (
                <div key={baseIndex++} className={classes.tile}>
                  <ChannelTile channel={channel} />
                </div>
              )),
              ...(() => {
                const result = []
                for (let i = displayChannels.length; i < PAGE_LENGTH; i++) {
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

export default SwipeChannelTilesRow
