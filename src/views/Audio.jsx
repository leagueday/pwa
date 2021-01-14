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
  const seek = useSelector(selectors.getAudioSeek)

  //////////////////////////////////////////////////////////////////////////////
  // event subscriptions on <audio/> dom element - consequence of new element
  React.useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.addEventListener('error', errorEvent => {
      console.error(`Error loading: ${JSON.stringify(errorEvent, null, 2)}`)
    })
    audioRef.current.addEventListener('loadedmetadata', eventData => {
      // console.log(`duration ${audioRef.current.duration}`)
      // dispatch(actions.setAudioDuration(audioRef.current.duration))
      dispatch(actions.setAudioDuration(eventData.target.duration))
    })
    // loadstart
    // progress
    // canplaythrough
    // debounce(handleTimeupdate, 5000))
    audioRef.current.addEventListener('timeupdate', eventData => {
      // console.log('timeupdate', eventData.target.currentTime)
      dispatch(actions.setAudioPosition(eventData.target.currentTime))
    })
    audioRef.current.addEventListener('ended', eventData => {
      // console.log('audio ended')
      dispatch(thunks.audio.playNextTrack())
    })

    ////////////////////////////////////////////////////////////////////////////
    // restore mode following seek/replay/forward
    //
    // Testing on Chrome browser showed that the audio element's mode (i.e.
    // play or pause) would be disrupted by a seek operation. The `seeked`
    // event is fired when these operations have completed, and this effect
    // handles it by reinstating the mode indicted by the related state in
    // Redux.
    audioRef.current.addEventListener('seeked', eventData => {
      // console.log('seeked', eventData.target.currentTime, audioMode)

      if (audioMode === storeConstants.AUDIO_MODE_PLAY) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    })
  }, [audioRef.current])

  //////////////////////////////////////////////////////////////////////////////
  // pause/play - consequence of button tap
  React.useEffect(() => {
    if (!audioRef.current) return

    if (audioMode === storeConstants.AUDIO_MODE_PAUSE) {
      audioRef.current.pause()
    } else if (audioMode === storeConstants.AUDIO_MODE_PLAY) {
      audioRef.current.play()
    }
  }, [audioRef.current, audioMode, audioUrl])

  //////////////////////////////////////////////////////////////////////////////
  // forward - consequence of button tap
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

  //////////////////////////////////////////////////////////////////////////////
  // replay - consequence of button tap
  React.useEffect(() => {
    if (!audioRef.current || !replayTaps) return

    const currentTime = audioRef.current.currentTime

    const nextTime = currentTime - TAP_INTERVAL
    const tooEarly = TAP_INTERVAL

    if (nextTime > tooEarly) {
      audioRef.current.currentTime = nextTime
    }
  }, [replayTaps])

  //////////////////////////////////////////////////////////////////////////////
  // seek - consequence of slider interaction
  React.useEffect(() => {
    if (!audioRef.current) return

    const seekPosition = seek?.position
    if (!seekPosition && seekPosition !== 0) return

    audioRef.current.currentTime = seekPosition
  }, [seek?.position])

  return audioUrl ? (
    <span>
      <audio ref={audioRef} src={audioUrl} autoPlay />
    </span>
  ) : null
}

export default Audio
