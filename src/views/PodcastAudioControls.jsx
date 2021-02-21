import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded'
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded'

import * as colors from '../styling/colors'

const useStyles = makeStyles({
  activeButton: {
    color: colors.white30,
  },
  inactiveButton: {
    color: colors.white30,
  }
})

const PodcastAudioControls = ({className, isPlaying, onPause, onPlay}) => {
  const classes = useStyles()

  const handlePause = ev => {
    if (onPause) onPause()
    ev.stopPropagation()
  }

  const handlePlay = ev => {
    if (onPlay) onPlay()
    ev.stopPropagation()
  }

  return (
    <div className={className}>
      <IconButton className={isPlaying ? classes.inactiveButton : classes.activeButton}
                  aria-label="play"
                  disabled={isPlaying}
                  onClick={handlePlay}
                  size="small">
        <PlayCircleOutlineRoundedIcon />
      </IconButton>
      <IconButton className={isPlaying ? classes.activeButton : classes.inactiveButton}
                  aria-label="pause"
                  disabled={!isPlaying}
                  onClick={handlePause}
                  size="small">
        <PauseCircleOutlineRoundedIcon />
      </IconButton>
    </div>
  )
}

export default PodcastAudioControls
