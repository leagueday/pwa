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

import { actions, constants as storeConstants, selectors, thunks } from '../store'

const TAP_INTERVAL = 15

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

const Audio = () => {
  const audioRef = React.useRef()

  const dispatch = useDispatch()

  const audioMode = useSelector(selectors.getAudioMode)
  const audioUrl = useSelector(selectors.getAudioUrl)

  const forwardTaps = useSelector(selectors.getAudioTapsForward)
  const replayTaps = useSelector(selectors.getAudioTapsReplay)

  React.useEffect(() => {
    if (!audioRef.current) return

    if (audioMode === storeConstants.AUDIO_MODE_PAUSE) {
      audioRef.current.pause()
    } else if (audioMode === storeConstants.AUDIO_MODE_PLAY) {
      audioRef.current.play()
    }
  }, [audioRef.current, audioMode, audioUrl])

  React.useEffect(() => {
    if (!audioRef.current || !forwardTaps) return

    const currentTime = audioRef.current.currentTime
    const duration = audioRef.current.duration

    const nextTime = currentTime + TAP_INTERVAL
    const tooLate = duration - TAP_INTERVAL

    if (nextTime < tooLate) {
      audioRef.current.currentTime = nextTime
    }
  }, [forwardTaps])

  React.useEffect(() => {
    if (!audioRef.current || !replayTaps) return

    const currentTime = audioRef.current.currentTime

    const nextTime = currentTime - TAP_INTERVAL
    const tooEarly = TAP_INTERVAL

    if (nextTime > tooEarly) {
      audioRef.current.currentTime = nextTime
    }
  }, [replayTaps])

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
    audioRef.current.addEventListener('ended', eventData => {
      console.log('audio ended')
      dispatch(thunks.audio.playNextTrack())
    })
  }, [audioRef.current, audioUrl])

  React.useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.addEventListener('seeked', eventData => {
      // if the audio is playing, after a seek operation, it has to be set to play again
      //   - at least on this version Chrome, it will autopause on seek
      // but, the user could also seek while paused.
      // even if that were supposed to set it playing, whether or not it's playing
      //   should be a function of redux state, i.e. if it's supposed to do that then
      //   it should dispatch(play)
      console.log('seeked', eventData.target.currentTime, audioMode)

      if (audioMode === storeConstants.AUDIO_MODE_PLAY) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    })
  }, [audioRef.current, audioMode, audioUrl])

  return audioUrl ? (
    <span>
      <audio ref={audioRef} src={audioUrl} autoPlay />
    </span>
  ) : null
}

export default Audio
