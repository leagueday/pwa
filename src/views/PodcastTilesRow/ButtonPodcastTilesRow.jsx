import React from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import {makeStyles} from '@material-ui/core/styles'

import debounce from '../../api/debounce'
import usePrevious from '../../api/usePrevious'
import SliderDots from '../SliderDots'
import SideButtons from '../SideButtons'
import {makeNextColor, slideTransitionGroup} from '../util'
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
  sliderDots: {
    marginLeft: 'auto',
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

const useSlideTransitionGroup = makeStyles(slideTransitionGroup)

const db500 = debounce(500)

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
      ({displayPodcasts, goNextPage, goPrevPage, numPages, pageNum}) => {
        const prevPageNum = usePrevious(pageNum)
        const isSlidingLeft = pageNum > prevPageNum
        const slideTransition = useSlideTransitionGroup({isSlidingLeft})

        const debouncedPage = db500(
          direction => direction === 'L' ? goPrevPage && goPrevPage() : goNextPage && goNextPage()
        )

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
            <SideButtons
              accentColor="magenta"
              onLeftClick={() => debouncedPage('L')}
              onRightClick={() => debouncedPage('R')}>
              <TransitionGroup component={null}>
                <CSSTransition key={`${prevPageNum} ${pageNum}`}
                               classNames={slideTransition}
                               timeout={500}>
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
                </CSSTransition>
              </TransitionGroup>
            </SideButtons>
          </div>
        )
      }
    }</Connector>
  )
}

export default ButtonPodcastTilesRow
