import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'

import PauseRoundedIcon from '@material-ui/icons/PauseRounded'
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded'

import * as colors from '../styling/colors'
import { selectors } from '../store'
import * as consts from './consts'

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
  disclaimer: {
    fontSize: '80%',
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
    width: '100%',
  },
  forwardButton: {
    color: colors.vintageTubeBright,
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
    color: colors.vintageTubeBright,
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
  vintageTube: {
    color: colors.vintageTubeBright,
  },
}))

const ProgressBox = () => {
  const duration = useSelector(selectors.getAudioDuration)
  const position = useSelector(selectors.getAudioPosition)

  const progress = Math.floor(position / duration * 100)
  console.log('duration', duration, 'position', position, 'progress', progress)

  return (<LinearProgress variant="determinate" value={progress} />)
}

const AudioControls = () => {
  const classes = useStyles()

  const forwardButtonOnclick = () => {
    console.log('forward')
  }

  const nextButtonOnclick = () => {
    console.log('next')
  }

  const pauseButtonOnclick = () => {
    console.log('pause')
  }

  const replayButtonOnclick = () => {
    console.log('replay')
  }

  return (
    <div className={classes.audioControls}>
      <div className={classes.audioControlsLeft}>
        <div className={classes.progressBox}>
          <ProgressBox />
        </div>
        <div className={classes.underbarControls}>
          <IconButton className={classes.underbarButton} onClick={replayButtonOnclick} size="small">
            <ReplayRoundedIcon className={classes.replayButton} />
          </IconButton >
          <div className={classes.underbarSpacer} />
          <IconButton className={classes.underbarButton} onClick={pauseButtonOnclick} size="small">
            <PauseRoundedIcon className={classes.vintageTube} />
          </IconButton >
          <div className={classes.underbarSpacer} />
          <IconButton className={classes.underbarButton} onClick={forwardButtonOnclick} size="small">
            <ReplayRoundedIcon className={classes.forwardButton} />
          </IconButton >
        </div>
        <div className={classes.disclaimer}>
          🚧 these buttons are not live yet 🚧
        </div>
      </div>
      <div className={classes.audioControlsRight}>
        <div className={classes.audioControlsRightCenter}>
          <IconButton className={classes.nextButton} onClick={nextButtonOnclick}>
            <SkipNextRoundedIcon className={classes.vintageTube} />
          </IconButton >
        </div>
      </div>
    </div>
  )
}

export default AudioControls
