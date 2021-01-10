import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'
import dayjs from 'dayjs'
import dayjsDurationPlugin from 'dayjs/plugin/duration'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'

import PauseRoundedIcon from '@material-ui/icons/PauseRounded'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded'
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded'

import * as colors from '../styling/colors'
import { actions, constants as storeConstants, selectors, thunks } from '../store'
import * as consts from './consts'

dayjs.extend(dayjsDurationPlugin)

const useStyles = makeStyles(theme => ({
  audioControls: {
    alignItems: 'stretch',
    backgroundColor: theme.palette.background.control,
    display: 'flex',
    flexDirection: 'row',
    height: consts.AUDIO_CONTROLS_HEIGHT,
    width: '100%',
  },
  audioControlsLeft: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '1em',
  },
  audioControlsRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 'auto',
    maxWidth: consts.AUDIO_CONTROLS_HEIGHT,
    minWidth: consts.AUDIO_CONTROLS_HEIGHT,
  },
  audioControlsRightCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forwardButton: {
    transform: 'scaleX(-1)',
  },
  nextButton: {
  },
  progressBox: {
    // backgroundColor: colors.darkerCharcoal,
    // borderRadius: theme.spacing(1),
    padding: '0.33em',
  },
  replayButton: {
    transform: 'scaleX(1.01)',
  },
  underbarButton: {
  },
  underbarSpacer: {
    maxWidth: '1em',
    minWidth: '1em',
  },
  underbarControls: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  vintageTubeDisabled: {
    color: colors.vintageTubeDull,
  },
  vintageTube: {
    color: colors.vintageTubeBright,
  },
}))

const hmsRegex = RegExp('^\\d{1,2}:')
const maybeHmsToSecondsOnly = maybeDurationString => {
  if (!hmsRegex.test(maybeDurationString)) {
    return maybeDurationString
  }

  const p = maybeDurationString.split(':')
  let s = 0
  let m = 1

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10)
    m *= 60
  }

  return s
}

const ProgressBox = () => {
  const duration = maybeHmsToSecondsOnly(
    useSelector(selectors.getAudioDuration)
  )
  const position = useSelector(selectors.getAudioPosition)

  const progress = Math.floor(position / duration * 100)
  console.log('duration', duration, 'position', position, 'progress', progress)

  return (<LinearProgress variant="determinate" value={progress} />)
}

const AudioControls = () => {
  const classes = useStyles()

  const itemUrl = useSelector(selectors.getAudioUrl)

  const isDisabled = !itemUrl
  const buttonColorClass = isDisabled ? classes.vintageTubeDisabled : classes.vintageTube

  const dispatch = useDispatch()

  const forwardButtonOnclick = () => {
    console.log('forward')
    dispatch(actions.forwardAudio())
  }

  const nextButtonOnclick = () => {
    console.log('next')
    dispatch(thunks.audio.playNextTrack())
  }

  const replayButtonOnclick = () => {
    console.log('replay')
    dispatch(actions.replayAudio())
  }

  const audioMode = useSelector(selectors.getAudioMode)

  const pauseOrPlayButtonOnclick = audioMode === storeConstants.AUDIO_MODE_PAUSE
    ? () => {
      console.log('play')
      dispatch(actions.playAudio())
    } : () => {
      console.log('pause')
      dispatch(actions.pauseAudio())
    }

  const PauseOrPlayIcon = audioMode === storeConstants.AUDIO_MODE_PAUSE
    ? PlayArrowRoundedIcon : PauseRoundedIcon

  return (
    <div className={classes.audioControls}>
      <div className={classes.audioControlsLeft}>
        <div className={classes.progressBox}>
          <ProgressBox />
        </div>
        <div className={classes.underbarControls}>
          <IconButton className={classes.underbarButton} onClick={replayButtonOnclick} size="small" disabled={isDisabled}>
            <ReplayRoundedIcon className={cx(classes.replayButton, buttonColorClass)} />
          </IconButton >
          <div className={classes.underbarSpacer} />
          <IconButton className={classes.underbarButton} onClick={pauseOrPlayButtonOnclick} size="small" disabled={isDisabled}>
            <PauseOrPlayIcon className={buttonColorClass} />
          </IconButton >
          <div className={classes.underbarSpacer} />
          <IconButton className={classes.underbarButton} onClick={forwardButtonOnclick} size="small" disabled={isDisabled}>
            <ReplayRoundedIcon className={cx(classes.forwardButton, buttonColorClass)} />
          </IconButton >
        </div>
      </div>
      <div className={classes.audioControlsRight}>
        <div className={classes.audioControlsRightCenter}>
          <IconButton className={classes.nextButton} onClick={nextButtonOnclick} disabled={isDisabled}>
            <SkipNextRoundedIcon className={buttonColorClass} />
          </IconButton >
        </div>
      </div>
    </div>
  )
}

export default AudioControls
