import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { makeNextColor } from '../util'
import SideButtons from '../SideButtons'
import Connector from './Connector'
import PodcastTile from './PodcastTile'

const PAGE_LENGTH = 6

const useStyles = makeStyles(theme => ({
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
  tilesRowContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    maxWidth: '100%',
    paddingTop: '0.75em',
    [theme.breakpoints.only('xs')]: {
      paddingTop: '3vw',
    },
  },
  title: {
    fontSize: '125%',
    fontWeight: theme.typography.weight.bold,
    [theme.breakpoints.only('xs')]: {
      fontSize: '90%',
      fontWeight: theme.typography.weight.normal,
    },
  },
}))

const EmptyTile = () => {
  return (
    <div />
  )
}

const ButtonPodcastTilesRow = ({id, podcasts, title}) => {
  const classes = useStyles()

  const nextColor = makeNextColor()

  let baseIndex = 0

  return (
    <Connector id={id} pageSize={PAGE_LENGTH} podcasts={podcasts}>{
      ({displayPodcasts, goNextPage, goPrevPage}) => (
        <div className={classes.tilesRowContainer}>
          <div className={classes.title}>
            {title}
          </div>
          <SideButtons
            accentColor="magenta"
            onLeftClick={goPrevPage}
            onRightClick={goNextPage}>
            <div className={classes.buttonPodcastTilesRow}>
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
                          <EmptyTile/>
                        </div>
                      )
                    }
                    return result
                  }
                )()
              ]}
            </div>
          </SideButtons>
        </div>
      )
    }</Connector>
  )
}

export default ButtonPodcastTilesRow
