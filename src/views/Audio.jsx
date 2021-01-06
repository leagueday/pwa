import React from 'react'

/**
 * views/Audio
 *
 * react wrapper of `<audio />`
 *
 * renders from redux into dom, so it's decoupled from the
 * controller but the way they both use redux is hardwired
 */
import { useSelector } from 'react-redux'

import * as constants from '../store/constants'
import * as selectors from '../store/selectors'

const Audio = () => {
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
    <span>
      <audio ref={audioRef} src={selectedAudioUrl} autoPlay />
    </span>
  )
}

export default Audio
