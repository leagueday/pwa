import React from 'react'
import { useSwipeable } from 'react-swipeable'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { makeStyles } from '@material-ui/core'

import debounce from '../../api/debounce'
import usePrevious from '../../api/usePrevious'
import SliderDots from '../SliderDots'
import { makeNextColor, slideTransitionGroup } from '../util'
import Connector from './Connector'
import PodcastTile from './PodcastTile'

const PAGE_LENGTH = 3

const useStyles = makeStyles(theme => ({
  slideContainer: {
    overflowX: 'hidden',
    position: 'relative',
    width: '100%',
  },
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
    width: '100%',
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

const useSlideTransitionGroup = makeStyles(slideTransitionGroup)

const db500 = debounce(500)

const EmptyTile = () => {
  return <div />
}

const SwipePodcastTilesRow = ({ id, podcasts, title }) => {
  const classes = useStyles()

  return (
    <Connector id={id} pageSize={PAGE_LENGTH} podcasts={podcasts}>
      {({ displayPodcasts, goNextPage, goPrevPage, numPages, pageNum }) => {
        const swipeHandlers = useSwipeable({
          onSwiped: db500(eventData => {
            const dir = eventData?.dir

            if (dir === 'Left') {
              goNextPage()
            } else if (dir === 'Right') {
              goPrevPage()
            }
          }),
          preventDefaultTouchmoveEvent: true,
        })

        const prevPageNum = usePrevious(pageNum)
        const isSlidingLeft = pageNum > prevPageNum
        const slideTransition = useSlideTransitionGroup({ isSlidingLeft })

        const nextColor = makeNextColor()
        let baseIndex = 0

        return (
          <div className={classes.tilesRowContainer}>
            <div className={classes.titleAndDots}>
              <div className={classes.title}>{title}</div>
              {numPages > 1 && (
                <SliderDots
                  className={classes.sliderDots}
                  numPages={numPages}
                  pageNum={pageNum}
                />
              )}
            </div>
            <div className={classes.slideContainer}>
              <TransitionGroup component={null}>
                <CSSTransition
                  key={`${prevPageNum} ${pageNum}`}
                  classNames={slideTransition}
                  timeout={500}
                >
                  <div
                    className={classes.swipePodcastTilesRow}
                    {...swipeHandlers}
                  >
                    {[
                      ...displayPodcasts.map(podcast =>
                        podcast ? (
                          <div key={baseIndex++} className={classes.tile}>
                            <PodcastTile
                              podcast={podcast}
                              textColor={nextColor()}
                            />
                          </div>
                        ) : null
                      ),
                      ...(() => {
                        const result = []
                        for (
                          let i = displayPodcasts.length;
                          i < PAGE_LENGTH;
                          i++
                        ) {
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
                </CSSTransition>
              </TransitionGroup>
            </div>
          </div>
        )
      }}
    </Connector>
  )
}

export default SwipePodcastTilesRow
