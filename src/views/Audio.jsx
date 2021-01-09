import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * views/Audio
 *
 * react wrapper of `<audio />`
 *
 * renders from redux into dom, so it's decoupled from the
 * controller but the way they both use redux is hardwired
 */

import { actions, constants as storeConstants, selectors } from '../store'

const debounce = (f, minIntervalMs) => {
  let wait = false

  return (...args) => {
    if (wait) return

    wait = true
    setTimeout(
      () => { wait = false },
      minIntervalMs
    )

    f(...args)
  }
}

let y = 1
const handleTimeupdate = ev => {
  console.log(y++, ev.target.currentTime, ev, JSON.stringify(ev, null, 2))

  return ev
}

const Audio = () => {
  const audioRef = React.useRef()

  const dispatch = useDispatch()

  const audioMode = useSelector(selectors.getAudioMode)
  const audioUrl = useSelector(selectors.getAudioUrl)

  React.useEffect(() => {
    if (!audioRef.current) return

    if (audioMode === storeConstants.AUDIO_MODE_PAUSE) {
      audioRef.current.pause()
    } else if (audioMode === storeConstants.AUDIO_MODE_PLAY) {
      audioRef.current.play()
    }
  }, [audioRef, audioMode])

  React.useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.addEventListener('error', errorEvent => {
      console.error(`Error loading: ${JSON.stringify(errorEvent, null, 2)}`);
    })
    audioRef.current.addEventListener('loadedmetadata', eventData => {
      console.log(`duration ${audioRef.current.duration}`)
      // dispatch(actions.setAudioDuration(audioRef.current.duration))
      dispatch(actions.setAudioDuration(eventData.target.duration))
    })
    // loadstart
    // progress
    // canplaythrough
    // ended
    // debounce(handleTimeupdate, 5000))
    audioRef.current.addEventListener('timeupdate', eventData => {
      console.log('timeupdate', eventData.target.currentTime)
      dispatch(actions.setAudioPosition(eventData.target.currentTime))
    })
  }, [audioRef])

  return (
    <span>
      <audio ref={audioRef} src={audioUrl} autoPlay />
    </span>
  )
}

export default Audio
