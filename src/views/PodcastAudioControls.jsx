import React from 'react'

import IconButton from '@material-ui/core/IconButton'

import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded'
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded'

const PodcastAudioControls = ({className, isPlaying, onPause, onPlay}) => {
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
      <IconButton color={isPlaying ? 'disabled' : 'secondary'}
                  aria-label="play"
                  disabled={isPlaying}
                  onClick={handlePlay}
                  size="small">
        <PlayCircleOutlineRoundedIcon />
      </IconButton>
      <IconButton color={isPlaying ? 'secondary' : 'disabled'}
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
