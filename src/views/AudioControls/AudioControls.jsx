import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'

import {
  IcoFastFwdStop,
  IcoForwardStop,
  IcoMinus,
  IcoPlus,
  IcoRewindStop
} from '../icons'

import * as colors from '../../styling/colors'
import { actions, constants as storeConstants, selectors, thunks } from '../../store'
import * as consts from '../consts'
import useMyList from '../../api/useMyList'

import {makeIconButton} from '../IconButton'
import ToggleImageButton from '../ToggleImageButton'
import ProgressBox from './ProgressBox'
import Title from './Title'

const FastFwdStopButton = makeIconButton(IcoFastFwdStop)
const ForwardStopButton = makeIconButton(IcoForwardStop)
const MinusButton = makeIconButton(IcoMinus)
const PlusButton = makeIconButton(IcoPlus)
const RewindStopButton = makeIconButton(IcoRewindStop)

const useStyles = makeStyles(theme => ({
  audioControlsRow: {
    alignItems: 'stretch',
    backgroundColor: colors.brandBlack,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    maxHeight: consts.AUDIO_CONTROLS_HEIGHT,
    minHeight: consts.AUDIO_CONTROLS_HEIGHT,
    userSelect: 'none',
    width: '100%',
  },
  barsideButton: {
    margin: '0.25em',
  },
  barsideButtonIcon: {
    transform: 'scaleY(0.5)',
  },
  disabledButtonColor: {
    color: colors.white30,
  },
  enabledButtonColor: {
    color: colors.magenta,
  },
  logoButton: {
    marginLeft: '0.5em',
    maxHeight: consts.AUDIO_CONTROLS_HEIGHT,
    maxWidth: consts.AUDIO_CONTROLS_HEIGHT,
    userSelect: 'none',
  },
  logoButtonCenter: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mainColumn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflowX: 'hidden',
    [theme.breakpoints.up('md')]: {
      maxWidth: '70%',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '60%',
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: '50%',
    },
  },
  nextButton: {
    height: '2.25em',
    width: '2.25em',
  },
  progressBoxFlex: {
    flex: 1,
    marginTop: '0.25em',
  },
  progressRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: '1em',
    paddingRight: '1em',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0.25em',
  },
}))

const AudioControls = () => {
  const classes = useStyles()

  const user = useSelector(selectors.getUser)
  const audioMode = useSelector(selectors.getAudioMode)
  const podcastId = useSelector(selectors.getAudioPodcastId)
  const itemUrl = useSelector(selectors.getAudioUrl)
  const itemTitle = useSelector(selectors.getAudioTitle)

  const isDisabled = !itemUrl
  const buttonColor = isDisabled ? colors.darkGray : colors.magenta

  const dispatch = useDispatch()

  const [getIsOnMyList, addToMyList, removeFromMyList] = useMyList(user?.token?.access_token)
  const isOnMyList = getIsOnMyList('podcast', podcastId)

  const titleOnclick = () => {
    dispatch(actions.pushHistory(`/podcast/${podcastId}`))
  }

  const popOnclick = audioMode === storeConstants.AUDIO_MODE_PLAY
    ? () => dispatch(actions.pauseAudio())
    : () => dispatch(actions.playAudio())

  const forwardButtonOnclick = () => {
    console.log('forward')
    dispatch(actions.forwardAudio())
  }

  const minusButtonOnclick = () => {
    console.log('minus')
    return removeFromMyList('podcast', podcastId)
  }

  const nextButtonOnclick = () => {
    console.log('next')
    dispatch(thunks.audio.playNextTrack())
  }

  const plusButtonOnclick = () => {
    console.log('plus')
    return addToMyList('podcast', podcastId)
  }

  const replayButtonOnclick = () => {
    console.log('replay')
    dispatch(actions.replayAudio())
  }

  const [PlusOrMinusButton, plusOrMinusOnclick] =
    isOnMyList ? [
      MinusButton,
      minusButtonOnclick
    ] : [
      PlusButton,
      plusButtonOnclick
    ]

  const buttonShadowColor = Color(colors.brandBlack).darken(0.5).string()

  return (
    <div className={classes.audioControlsRow}>
      <div className={classes.logoButtonCenter}>
        <ToggleImageButton className={classes.logoButton}
                           size="5em"
                           on={audioMode === storeConstants.AUDIO_MODE_PLAY}
                           onClick={popOnclick}
                           onImage="/img/logo_pause.png"
                           offImage="/img/logo_play.png"
                           shadowColor={buttonShadowColor} />
      </div>
      <div className={classes.mainColumn}>
        <div className={classes.titleRow}>
          <PlusOrMinusButton color={buttonColor}
                             backgroundColor={colors.brandBlack}
                             size="2em"
                             onClick={plusOrMinusOnclick}
                             shadowColor={buttonShadowColor} />
          <Title title={itemTitle} onClick={titleOnclick} />
          <ForwardStopButton color={buttonColor}
                             backgroundColor={colors.brandBlack}
                             size="1.75em"
                             onClick={nextButtonOnclick}
                             shadowColor={buttonShadowColor} />
        </div>
        <div className={classes.progressRow}>
          <RewindStopButton className={classes.barsideButton}
                            iconClassName={classes.barsideButtonIcon}
                            color={buttonColor}
                            backgroundColor={colors.brandBlack}
                            size="1.5em"
                            onClick={replayButtonOnclick}
                            shadowColor={buttonShadowColor} />
          <div className={classes.progressBoxFlex}>
            <ProgressBox />
          </div>
          <FastFwdStopButton className={classes.barsideButton}
                             iconClassName={classes.barsideButtonIcon}
                             color={buttonColor}
                             backgroundColor={colors.brandBlack}
                             size="1.5em"
                             onClick={forwardButtonOnclick}
                             shadowColor={buttonShadowColor} />
        </div>
      </div>
    </div>
  )
}

export default AudioControls
