import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

import { IcoFastFwdStop, IcoForwardStop, IcoRewindStop } from '../icons'

import * as colors from '../../styling/colors'
import { actions, constants as storeConstants, selectors, thunks } from '../../store'
import * as consts from '../consts'

import PauseOrPlayButton from './PauseOrPlayButton'
import ProgressBox from './ProgressBox'

const TITLE_HEIGHT = '2em'
const UNDERBAR_CONTROLS_HEIGHT = '2em'

const useStyles = makeStyles(theme => ({
  audioControls: {
    alignItems: 'stretch',
    backgroundColor: colors.brandBlack,
    display: 'flex',
    flexDirection: 'row',
    height: consts.AUDIO_CONTROLS_HEIGHT,
    userSelect: 'none',
    width: '100%',
  },
  disabledButtonColor: {
    color: colors.white30,
  },
  enabledButtonColor: {
    color: colors.magenta,
  },
  leftColumn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    maxWidth: '100%',
    overflowX: 'hidden',
  },
  logo: {
    cursor: 'pointer',
    minWidth: '6em',
    paddingLeft: '0.5em',
  },
  nextButton: {
    height: '2.25em',
    width: '2.25em',
  },
  nextButtonIcon: {
    transform: 'scaleX(0.75) scaleY(0.5)',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 'auto',
    maxWidth: consts.AUDIO_CONTROLS_HEIGHT,
    minWidth: consts.AUDIO_CONTROLS_HEIGHT,
  },
  rightColumnCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: theme.typography.family.secondary,
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
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  underbarButton: {
    height: '2em',
    width: '2em',
  },
  underbarButtonIcon: {
    transform: 'scaleY(0.5)',
  },
  underbarSpacer: {
    maxWidth: '1em',
    minWidth: '1em',
  },
  underbarControls: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    height: UNDERBAR_CONTROLS_HEIGHT,
    justifyContent: 'center',
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

  const replayButtonOnclick = () => {
    console.log('replay')
    dispatch(actions.replayAudio())
  }

  const audioMode = useSelector(selectors.getAudioMode)

  return (
    <div className={classes.audioControls}>
      <PauseOrPlayButton className={classes.logo}
                         playing={audioMode === storeConstants.AUDIO_MODE_PLAY} />
      <div className={classes.leftColumn}>
        <div className={classes.titleContainer}>
          <div className={classes.title} onClick={titleOnclick}>
            {itemTitle}
          </div>
        </div>
        <ProgressBox />
        <div className={classes.underbarControls}>
          <IconButton className={classes.underbarButton} onClick={replayButtonOnclick} size="small" disabled={isDisabled}>
            <IcoRewindStop classes={{inner:cx(classes.underbarButtonIcon, buttonColorClass)}} />
          </IconButton >
          <div className={classes.underbarSpacer} />
          <div className={classes.underbarSpacer} />
          <IconButton className={classes.underbarButton} onClick={forwardButtonOnclick} size="small" disabled={isDisabled}>
            <IcoFastFwdStop classes={{inner:cx(classes.underbarButtonIcon, buttonColorClass)}} />
          </IconButton >
        </div>
      </div>
      <div className={classes.rightColumn}>
        <div className={classes.rightColumnCenter}>
          <IconButton className={classes.nextButton} onClick={nextButtonOnclick} disabled={isDisabled}>
            <IcoForwardStop classes={{inner:cx(classes.nextButtonIcon, buttonColorClass)}} strokeWidth={4} />
          </IconButton >
        </div>
      </div>
    </div>
  )
}

export default AudioControls
