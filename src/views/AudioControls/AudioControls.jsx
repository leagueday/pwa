import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

import {
  IcoFastFwdStop,
  IcoForwardStop,
  IcoPlus,
  IcoRewindStop
} from '../icons'

import * as colors from '../../styling/colors'
import { actions, constants as storeConstants, selectors, thunks } from '../../store'
import * as consts from '../consts'
import useStarred from '../../api/useStarred'

import LogoButton from './LogoButton'
import ProgressBox from './ProgressBox'
import Title from './Title'

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
    height: '2em',
    width: '2em',
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
    maxHeight: consts.AUDIO_CONTROLS_HEIGHT,
    maxWidth: consts.AUDIO_CONTROLS_HEIGHT,
  },
  mainColumn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflowX: 'hidden',
  },
  nextButton: {
    height: '2.25em',
    width: '2.25em',
  },
  nextButtonIcon: {
    transform: 'scaleX(0.75) scaleY(0.5)',
  },
  progressBoxFlex: {
    flex: 1,
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
  },
}))

const AudioControls = () => {
  const classes = useStyles()

  const podcastId = useSelector(selectors.getAudioPodcastId)
  const itemUrl = useSelector(selectors.getAudioUrl)
  const itemTitle = useSelector(selectors.getAudioTitle)

  const isDisabled = !itemUrl
  const buttonColorClass = isDisabled ? classes.disabledButtonColor : classes.enabledButtonColor

  const dispatch = useDispatch()

  const [getIsPlussed, plusPodcast, minusPodcast] = useStarred()
  const isPlussed = getIsPlussed(podcastId)

  const titleOnclick = () => {
    dispatch(actions.pushHistory(`/podcast/${podcastId}`))
  }

  const forwardButtonOnclick = () => {
    console.log('forward')
    dispatch(actions.forwardAudio())
  }

  const nextButtonOnclick = () => {
    console.log('next')
    dispatch(thunks.audio.playNextTrack())
  }

  const plusButtonOnclick = () => {
    console.log('plus')
    return isPlussed ? minusPodcast(podcastId) : plusPodcast(podcastId)
  }

  const replayButtonOnclick = () => {
    console.log('replay')
    dispatch(actions.replayAudio())
  }

  const audioMode = useSelector(selectors.getAudioMode)

  return (
    <div className={classes.audioControlsRow}>
      <LogoButton className={classes.logoButton}
                  playing={audioMode === storeConstants.AUDIO_MODE_PLAY} />
      <div className={classes.mainColumn}>
        <div className={classes.titleRow}>
          <IconButton className={classes.nextButton} onClick={plusButtonOnclick} disabled={isDisabled}>
            <IcoPlus classes={{inner:buttonColorClass}} />
          </IconButton >
          <Title title={itemTitle} onClick={titleOnclick} />
          <IconButton className={classes.nextButton} onClick={nextButtonOnclick} disabled={isDisabled}>
            <IcoForwardStop classes={{inner:cx(classes.nextButtonIcon, buttonColorClass)}} strokeWidth={4} />
          </IconButton >
        </div>
        <div className={classes.progressRow}>
          <IconButton className={classes.barsideButton} onClick={replayButtonOnclick} size="small" disabled={isDisabled}>
            <IcoRewindStop classes={{inner:cx(classes.barsideButtonIcon, buttonColorClass)}} />
          </IconButton >
          <div className={classes.progressBoxFlex}>
            <ProgressBox />
          </div>
          <IconButton className={classes.barsideButton} onClick={forwardButtonOnclick} size="small" disabled={isDisabled}>
            <IcoFastFwdStop classes={{inner:cx(classes.barsideButtonIcon, buttonColorClass)}} />
          </IconButton >
        </div>
      </div>
    </div>
  )
}

export default AudioControls
