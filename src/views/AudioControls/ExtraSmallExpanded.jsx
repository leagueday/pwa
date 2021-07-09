import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSwipeable } from 'react-swipeable'
import Color from 'color'

import { makeStyles } from '@material-ui/core'

import usePodcast from '../../api/usePodcast'
import { channelSelectors } from '../../model/rss'
import { actions, selectors } from '../../store'
import { colors } from '../../styling'
import {
  IcoDown,
  IcoFastFwdStop,
  IcoForwardStop,
  IcoMinus,
  IcoPlus,
  IcoRewindStop,
} from '../icons'
import { makeIconButton } from '../IconButton'
import ToggleImageButtonSmall from '../ToggleImageButtonSmall'
import Connector from './Connector'
import ProgressBox from './ProgressBox'

const DownButton = makeIconButton(IcoDown)
const FastFwdStopButton = makeIconButton(IcoFastFwdStop)
const ForwardStopButton = makeIconButton(IcoForwardStop)
const MinusButton = makeIconButton(IcoMinus)
const PlusButton = makeIconButton(IcoPlus)
const RewindStopButton = makeIconButton(IcoRewindStop)

const useStyles = makeStyles(theme => ({
  bottomSection: {},
  bottomSectionText: {},
  button: {},
  downButton: {
    left: '2vw',
    position: 'absolute',
    top: '2vw',
  },
  episodeTitle: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  imageAndBottomSection: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  logoImage: {
    display: 'block',
    height: '100%',
    width: 'auto',
  },
  logoImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '95vw',
    justifyContent: 'center',
    maxHeight: '45vh',
    paddingTop: '6vw',
    width: '100%',
  },
  mainButton: {
    marginRight: '4vw',
    ['&:last-child']: {
      marginRight: 0,
    },
  },
  mainButtonCluster: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  mainButtonIcon: {},
  mainButtonRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  myListRow: {},
  nextButtonContainer: {
    marginLeft: 'auto',
  },
  nextButtonRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  podcastName: {
    overflowX: 'hidden',
    padding: '0 10vw',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  progressBox: {
    height: '10vw',
  },
  progressBoxFlex: {
    flex: 1,
    padding: '0 2vw',
  },
  showTitle: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  topSection: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  xsSmallExpandedAudioControls: {
    backgroundColor: colors.brandBlack,
    display: 'flex',
    flexDirection: 'column',
    fontSize: '5vw',
    height: '100%',
    padding: '3vw',
    position: 'relative',
  },
}))

const buttonShadowColor = Color(colors.brandBlack).darken(0.5).string()

const ExtraSmallExpanded = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const podcastUrl = useSelector(selectors.getAudioPodcastUrl)
  const itemTitle = useSelector(selectors.getAudioTitle)
  const podcastName = useSelector(selectors.getAudioPodcastName)

  const { rss } = usePodcast({ url: podcastUrl })

  const imageUrl = channelSelectors.v2.imageUrl(rss)

  const onDownClick = () => dispatch(actions.condenseAudioControls())

  const swipeHandlers = useSwipeable({
    onSwiped: eventData => {
      const dir = eventData?.dir

      if (dir === 'Down') {
        dispatch(actions.condenseAudioControls())
      }
    },
    preventDefaultTouchmoveEvent: true,
  })

  return (
    <Connector>
      {({
        forwardButtonOnclick,
        isDisabled,
        isOnMyList,
        isPlaying,
        nextButtonOnclick,
        plusOrMinusOnclick,
        popOnclick,
        replayButtonOnclick,
        titleOnclick,
      }) =>
        (PlusOrMinusButton => (
          <div
            className={classes.xsSmallExpandedAudioControls}
            {...swipeHandlers}
          >
            <DownButton
              className={classes.downButton}
              color={colors.magenta}
              onClick={onDownClick}
              backgroundColor={colors.brandBlack}
              shadowColor={buttonShadowColor}
              size="8vw"
              strokeWidth="3"
            />
            <div className={classes.topSection}>
              <div className={classes.podcastName}>{podcastName}</div>
            </div>
            <div className={classes.imageAndBottomSection}>
              <div className={classes.logoImageContainer}>
                <img className={classes.logoImage} src={imageUrl} />
              </div>
              <div className={classes.bottomSection}>
                <div className={classes.episodeTitle} onClick={titleOnclick}>
                  {itemTitle}
                </div>
                <div className={classes.showTitle}>{podcastName}</div>
                <div className={classes.nextButtonRow}>
                  <div className={classes.nextButtonContainer}>
                    <ForwardStopButton
                      color={colors.magenta}
                      backgroundColor={colors.brandBlack}
                      size="8vw"
                      onClick={nextButtonOnclick}
                      shadowColor={buttonShadowColor}
                    />
                  </div>
                </div>
                <div className={classes.progressBoxFlex}>
                  <ProgressBox className={classes.progressBox} isExpanded />
                </div>
                <div className={classes.mainButtonRow}>
                  <div className={classes.mainButtonCluster}>
                    <RewindStopButton
                      className={classes.mainButton}
                      iconClassName={classes.mainButtonIcon}
                      color={colors.magenta}
                      backgroundColor={colors.brandBlack}
                      size="8vw"
                      onClick={replayButtonOnclick}
                      shadowColor={buttonShadowColor}
                    />
                    <ToggleImageButtonSmall
                      className={classes.mainButton}
                      size="15vw"
                      on={isPlaying}
                      onClick={popOnclick}
                      onImage="/img/logo_pause.png"
                      offImage="/img/logo_play.png"
                      shadowColor={buttonShadowColor}
                    />
                    <FastFwdStopButton
                      className={classes.mainButton}
                      iconClassName={classes.mainButtonIcon}
                      color={colors.magenta}
                      backgroundColor={colors.brandBlack}
                      size="8vw"
                      onClick={forwardButtonOnclick}
                      shadowColor={buttonShadowColor}
                    />
                  </div>
                </div>
                <div className={classes.myListRow}>
                  <PlusOrMinusButton
                    backgroundColor={colors.brandBlack}
                    color={colors.magenta}
                    onClick={plusOrMinusOnclick}
                    shadowColor={buttonShadowColor}
                    size="8vw"
                    strokeWidth="3"
                  />
                </div>
              </div>
            </div>
          </div>
        ))(isOnMyList ? MinusButton : PlusButton)
      }
    </Connector>
  )
}

export default ExtraSmallExpanded
