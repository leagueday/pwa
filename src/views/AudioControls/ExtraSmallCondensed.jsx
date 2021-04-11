import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useSwipeable} from 'react-swipeable'
import Color from 'color'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core'

import * as colors from '../../styling/colors'
import {actions, selectors} from '../../store'
import {
  IcoFastFwdStop,
  IcoForwardStop,
  IcoMinus,
  IcoPlus,
  IcoRewindStop
} from '../icons'
import {makeIconButton} from '../IconButton'
import Connector from './Connector'
import ProgressBox from './ProgressBox'
import ToggleImageButton from '../ToggleImageButton'
import XsTitle from './XsTitle'

const FastFwdStopButton = makeIconButton(IcoFastFwdStop)
const ForwardStopButton = makeIconButton(IcoForwardStop)
const MinusButton = makeIconButton(IcoMinus)
const PlusButton = makeIconButton(IcoPlus)
const RewindStopButton = makeIconButton(IcoRewindStop)

const useStyles = makeStyles(theme => ({
  childButtonCol: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-evenly',
  },
  logoButton: { },
  progressBoxFlex: {
    flex: 1,
    padding: '0 2vw',
  },
  progressRow: {
    alignItems: 'center',
    display: 'flex',
    flex: 2,
    justifyContent: 'space-between',
    maxWidth: '100%',
    padding: '1vw 3vw 0 3vw',
    width: '100%',
  },
  title: {
    margin: '0 2vw 0 1vw',
  },
  titleRow: {
    alignItems: 'center',
    display: 'flex',
    flex: 3,
    justifyContent: 'space-between',
    maxWidth: '100%',
    width: '100%',
  },
  xsAudioControls: {
    backgroundColor: colors.brandBlack,
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    padding: '2vw',
  },
}))

const buttonShadowColor = Color(colors.brandBlack).darken(0.5).string()

const XsCondensedAudioControls = ({className, primaryColor}) => {
  const classes = useStyles({primaryColor})

  const dispatch = useDispatch()
  const itemTitle = useSelector(selectors.getAudioTitle)
  const podcastName = useSelector(selectors.getAudioPodcastName)

  const swipeHandlers = useSwipeable({
    onSwiped: eventData => {
      const dir = eventData?.dir

      if (dir === 'Up') {
        dispatch(actions.expandAudioControls())
      }
    },
  })

  return (
    <Connector>{
      ({ forwardButtonOnclick,
         isDisabled,
         isOnMyList,
         isPlaying,
         nextButtonOnclick,
         plusOrMinusOnclick,
         popOnclick,
         replayButtonOnclick,
         titleOnclick,
       }) => ((PlusOrMinusButton, buttonColor) => (
      <div className={cx(classes.xsAudioControls, className)} {...swipeHandlers}>
        <div className={classes.titleRow}>
          <XsTitle className={classes.title}
                   halfHeight="10vw"
                   height="20vw"
                   onClick={titleOnclick}
                   podcastName={podcastName}
                   primaryColor={primaryColor}
                   title={itemTitle}>
            <ToggleImageButton className={classes.logoButton}
                               size="20vw"
                               on={isPlaying}
                               onClick={popOnclick}
                               onImage="/img/logo_pause.png"
                               offImage="/img/logo_play.png"
                               shadowColor={buttonShadowColor} />
          </XsTitle>
          <div className={classes.childButtonCol}>
            <PlusOrMinusButton backgroundColor={colors.brandBlack}
                               color={buttonColor}
                               onClick={plusOrMinusOnclick}
                               shadowColor={buttonShadowColor}
                               size="8vw"
                               strokeWidth="3" />
            <ForwardStopButton color={buttonColor}
                               backgroundColor={colors.brandBlack}
                               size="8vw"
                               onClick={nextButtonOnclick}
                               shadowColor={buttonShadowColor} />
          </div>
        </div>
        <div className={classes.progressRow}>
          <RewindStopButton iconClassName={classes.barsideButtonIcon}
                            color={buttonColor}
                            backgroundColor={colors.brandBlack}
                            size="8vw"
                            onClick={replayButtonOnclick}
                            shadowColor={buttonShadowColor} />
          <div className={classes.progressBoxFlex}>
            <ProgressBox />
          </div>
          <FastFwdStopButton iconClassName={classes.barsideButtonIcon}
                             color={buttonColor}
                             backgroundColor={colors.brandBlack}
                             size="8vw"
                             onClick={forwardButtonOnclick}
                             shadowColor={buttonShadowColor} />
        </div>
      </div>
      ))(
        isOnMyList ? MinusButton : PlusButton,
        isDisabled ? colors.darkGray : colors.magenta
      )
    }</Connector>
  )
}

export default XsCondensedAudioControls
