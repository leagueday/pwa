import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { makeStyles } from '@mui/styles';

import debounce from '../../api/debounce';
import usePrevious from '../../api/usePrevious';
import BottomBlock from '../BottomBlock';
import { slideTransitionGroup } from '../util';
import ChannelTile from './ChannelTile';
import CreatorConnector from './CreatorConnector';

const PAGE_LENGTH = 3;

const useStyles = makeStyles((theme) => ({
  slideContainer: {
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
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
}));

const useSlideTransitionGroup = makeStyles(slideTransitionGroup);

const db500 = debounce(500);

const EmptyTile = () => {
  return <div />;
};

const SwipeCreatorTilesRow = ({ id, channels, title }) => {
  const classes = useStyles();

  return (
    <CreatorConnector channels={channels} id={id} pageSize={PAGE_LENGTH}>
      {({ displayChannels, goNextPage, goPrevPage, numPages, pageNum }) => {
        const swipeHandlers = useSwipeable({
          onSwiped: db500((eventData) => {
            const dir = eventData?.dir;

            if (dir === 'Left') {
              goNextPage();
            } else if (dir === 'Right') {
              goPrevPage();
            }
          }),
          preventDefaultTouchmoveEvent: true,
        });

        const prevPageNum = usePrevious(pageNum);
        const isSlidingLeft = pageNum > prevPageNum;
        const slideTransition = useSlideTransitionGroup({ isSlidingLeft });

        let baseIndex = 0;

        return (
          <BottomBlock numPages={numPages} pageNum={pageNum} titleRest={title}>
            <div className={classes.slideContainer}>
              <TransitionGroup component={null}>
                <CSSTransition
                  key={`${prevPageNum} ${pageNum}`}
                  classNames={slideTransition}
                  timeout={500}
                >
                  <div
                    className={classes.swipeChannelTilesRow}
                    {...swipeHandlers}
                  >
                    {[
                      ...displayChannels.map((channel) => (
                        <div key={baseIndex++} className={classes.tile}>
                          <ChannelTile channel={channel} />
                        </div>
                      )),
                      ...(() => {
                        const result = [];
                        for (
                          let i = displayChannels.length;
                          i < PAGE_LENGTH;
                          i++
                        ) {
                          result.push(
                            <div key={baseIndex++} className={classes.tile}>
                              <EmptyTile />
                            </div>
                          );
                        }
                        return result;
                      })(),
                    ]}
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </BottomBlock>
        );
      }}
    </CreatorConnector>
  );
};

export default SwipeCreatorTilesRow;
