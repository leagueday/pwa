import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { makeStyles } from '@material-ui/core/styles'

import debounce from '../../api/debounce'
import usePrevious from '../../api/usePrevious'
import BottomBlock from '../BottomBlock'
import { slideTransitionGroup } from '../util'
import SideButtons from '../SideButtons'
import ChannelTile from './ChannelTile'
import Connector from './Connector'

const PAGE_LENGTH = 6

const useStyles = makeStyles({
  buttonChannelTilesRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slideContainer: {
    overflow: 'hidden',
    position: 'relative',
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

const useSlideTransitionGroup = makeStyles(slideTransitionGroup)
const db500 = debounce(500)

const EmptyTile = () => {
  return <div />
}

const ButtonChannelTilesRow = ({ id, channels, title }) => {
  const classes = useStyles()

  let baseIndex = 0

  return (
    <Connector channels={channels} id={id} pageSize={PAGE_LENGTH}>
      {({ displayChannels, goNextPage, goPrevPage, numPages, pageNum }) => {
        const prevPageNum = usePrevious(pageNum)
        const isSlidingLeft = pageNum > prevPageNum
        const slideTransition = useSlideTransitionGroup({ isSlidingLeft })

        const debouncedPage = db500(direction =>
          direction === 'L'
            ? goPrevPage && goPrevPage()
            : goNextPage && goNextPage()
        )

        const maybeDebouncedPageLeft =
          pageNum > 0 ? () => debouncedPage('L') : null
        const maybeDebouncedPageRight =
          pageNum < numPages - 1 ? () => debouncedPage('R') : null

        return (
          <BottomBlock numPages={numPages} pageNum={pageNum} titleRest={title}>
            <SideButtons
              accentColor="magenta"
              onLeftClick={maybeDebouncedPageLeft}
              onRightClick={maybeDebouncedPageRight}
            >
              <div className={classes.slideContainer}>
                <TransitionGroup component={null}>
                  <CSSTransition
                    key={`${prevPageNum} ${pageNum}`}
                    classNames={slideTransition}
                    timeout={500}
                  >
                    <div className={classes.buttonChannelTilesRow}>
                      {[
                        ...displayChannels.map(channel => (
                          <div key={baseIndex++} className={classes.tile}>
                            <ChannelTile channel={channel} />
                          </div>
                        )),
                        ...(() => {
                          const result = []
                          for (
                            let i = displayChannels.length;
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
            </SideButtons>
          </BottomBlock>
        )
      }}
    </Connector>
  )
}

export default ButtonChannelTilesRow
