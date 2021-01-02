import React from 'react'

/**
 * views/AudioPlayer
 *
 * this emits some dom, `<audio ... />`
 * it's a view in the sense of data projection/transformation
 * this isn't actually visible on screen
 */
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import * as constants from '../store/constants'
import * as selectors from '../store/selectors'

const useStyles = makeStyles({
  audioContainer: {
  },
})

const AudioPlayer = () => {
  const classes = useStyles()

  const audioRef = React.useRef()

  const selectedAudioMode = useSelector(selectors.getSelectedAudioMode)
  const selectedAudioUrl = useSelector(selectors.getSelectedAudioUrl)

  React.useEffect(() => {
    if (!audioRef.current) return

    if (selectedAudioMode === constants.AUDIO_MODE_PAUSE) {
      audioRef.current.pause()
    } else if (selectedAudioMode === constants.AUDIO_MODE_PLAY) {
      audioRef.current.play()
    }
  }, [audioRef, selectedAudioMode])

  React.useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.addEventListener('error', errorEvent => {
      console.error(`Error loading: ${JSON.stringify(errorEvent, null, 2)}`);
    })
    audioRef.current.addEventListener('loadedmetadata', eventData => {
      console.log(`duration ${audioRef.current.duration}`)
    })
    // loadstart
    // progress
    // canplaythrough
    // ended
    // timeupdate
  }, [audioRef])

  return (
    <div className={classes.audioContainer}>
      <audio ref={audioRef} src={selectedAudioUrl} autoPlay />
    </div>
  )
}

export default AudioPlayer