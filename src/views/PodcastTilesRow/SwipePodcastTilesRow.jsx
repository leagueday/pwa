import React from 'react'
import {useSwipeable} from 'react-swipeable'

import {makeStyles} from '@material-ui/core'

import SliderDots from '../SliderDots'
import {makeNextColor} from '../util'
import Connector from './Connector'
import PodcastTile from './PodcastTile'

const PAGE_LENGTH = 3

const useStyles = makeStyles(theme => ({
  sliderDots: {
    marginLeft: 'auto',
  },
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
  titleAndDots: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
}))

const EmptyTile = () => {
  return (
    <div />
  )
}

const SwipePodcastTilesRow = ({id, podcasts, title}) => {
  const classes = useStyles()

  return (
    <Connector id={id} pageSize={PAGE_LENGTH} podcasts={podcasts}>{
      ({displayPodcasts, goNextPage, goPrevPage, numPages, pageNum}) => {
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
          <div className={classes.tilesRowContainer}>
            <div className={classes.titleAndDots}>
              <div className={classes.title}>
                {title}
              </div>
              { numPages > 1 && (
                <SliderDots className={classes.sliderDots} numPages={numPages} pageNum={pageNum} />
              )}
            </div>
            <div className={classes.swipePodcastTilesRow} {...swipeHandlers}>
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
          </div>
        )
      }
    }</Connector>
  )
}

export default SwipePodcastTilesRow
