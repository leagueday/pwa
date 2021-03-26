import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Color from 'color'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import {
  IcoFastFwdStop,
  IcoForwardStop,
  IcoMinus,
  IcoPlus,
  IcoRewindStop
} from '../icons'

import * as colors from '../../styling/colors'
import { actions, constants as storeConstants, selectors, thunks } from '../../store'
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
    maxHeight: '6em',
    minHeight: '6em',
    userSelect: 'none',
    width: '100%',
    [theme.breakpoints.only('md')]: {
      maxHeight: '4em',
      minHeight: '4em',
    },
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
    maxHeight: '100%',
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
    [theme.breakpoints.up('sm')]: {
      maxWidth: '75%',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '55%',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '45%',
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: '35%',
    },
  },
  nextButton: {
    height: '2.25em',
    width: '2.25em',
  },
  progressBoxFlex: {
    flex: 1,
    marginTop: '0.25em',
    [theme.breakpoints.only('md')]: {
      marginTop: 0,
    },
  },
  progressRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: '1em',
    paddingRight: '1em',
    [theme.breakpoints.only('md')]: {
      paddingLeft: '2.5em',
      paddingRight: '2.5em',
    },
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '0.25em',
    padding: '0.25em 0.25em 0 0.25em',
    [theme.breakpoints.only('md')]: {
      marginLeft: '0.5em',
    },
  },
}))

const SmUpAudioControls = () => {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.only('md'))
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
                           size={isMd ? '3.5em' : '5em'}
                           on={audioMode === storeConstants.AUDIO_MODE_PLAY}
                           onClick={popOnclick}
                           onImage="/img/logo_pause.png"
                           offImage="/img/logo_play.png"
                           shadowColor={buttonShadowColor} />
      </div>
      <div className={classes.mainColumn}>
        <div className={classes.titleRow}>
          <PlusOrMinusButton backgroundColor={colors.brandBlack}
                             color={buttonColor}
                             onClick={plusOrMinusOnclick}
                             shadowColor={buttonShadowColor}
                             size={isMd ? '1.5em' : '2em'}
                             strokeWidth="3" />
          <Title title={itemTitle} onClick={titleOnclick} />
          <ForwardStopButton color={buttonColor}
                             backgroundColor={colors.brandBlack}
                             size={isMd ? '1.5em' : '2em'}
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

export default SmUpAudioControls
