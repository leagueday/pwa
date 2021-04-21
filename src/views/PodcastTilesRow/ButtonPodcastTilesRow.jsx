import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { makeNextColor } from '../util'
import SideButtons from '../SideButtons'
import Connector from './Connector'
import PodcastTile from './PodcastTile'

const PAGE_LENGTH = 6

const useStyles = makeStyles({
  buttonPodcastTilesRow: {
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
  return <div />
}

const ButtonPodcastTilesRow = ({ id, podcasts }) => {
  const classes = useStyles()

  const nextColor = makeNextColor()

  let baseIndex = 0

  return (
    <Connector id={id} pageSize={PAGE_LENGTH} podcasts={podcasts}>
      {({ displayPodcasts, goNextPage, goPrevPage }) => (
        <SideButtons
          accentColor="magenta"
          onLeftClick={goPrevPage}
          onRightClick={goNextPage}
        >
          <div className={classes.buttonPodcastTilesRow}>
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
        </SideButtons>
      )}
    </Connector>
  )
}

export default ButtonPodcastTilesRow
