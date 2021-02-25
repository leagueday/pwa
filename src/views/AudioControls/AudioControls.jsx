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

import PauseOrPlayButton from './PauseOrPlayButton'
import ProgressBox from './ProgressBox'

const TITLE_HEIGHT = '2em'

const useStyles = makeStyles(theme => ({
  audioControlsRow: {
    alignItems: 'stretch',
    backgroundColor: colors.brandBlack,
    display: 'flex',
    flexDirection: 'row',
    height: consts.AUDIO_CONTROLS_HEIGHT,
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
  logo: {
    cursor: 'pointer',
    minWidth: '6em',
    paddingLeft: '0.5em',
  },
  mainColumn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    maxWidth: '100%',
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
    justifyContent: 'space-between',
    paddingLeft: '1em',
    paddingRight: '1em',
  },
  title: {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    fontFamily: theme.typography.family.primary,
    fontSize: '85%',
    height: TITLE_HEIGHT,
    maxWidth: '100%',
    minWidth: 0,
    overflowX: 'hidden',
    paddingLeft: '0.5em',
    paddingTop: '0.5em',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
  titleFlex: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
      <PauseOrPlayButton className={classes.logo}
                         playing={audioMode === storeConstants.AUDIO_MODE_PLAY} />
      <div className={classes.mainColumn}>
        <div className={classes.titleRow}>
          <IconButton className={classes.nextButton} onClick={plusButtonOnclick} disabled={isDisabled}>
            <IcoPlus classes={{inner:buttonColorClass}} />
          </IconButton >
          <div className={classes.titleFlex}>
            <div className={classes.title} onClick={titleOnclick}>
              {itemTitle}
            </div>
          </div>
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
