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

// Set a bunch of event listeners on the <audio /> element.
//
// Fun fact, React components that `useRef` do not get a render
// pass automatically when the referred dom element updates or
// changes.
//
// With naive `useRef`, the first render pass shows the <audio /> ref is
// undefined. Then, the audio dom node is created and the ref is bound, but,
// we don't necessarily get a render pass at that point to set up these
// event subscriptions...
//
// Therefore `useAudioRef` -
// See https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
// The article explains this pattern of "ref callback" allows setup logic to run
// when the ref is bound to the dom node
const useAudioRef = () => {
  const ref = React.useRef()
  const dispatch = useDispatch()

  const getRef = React.useCallback(() => ref.current, [])

  const setRef = React.useCallback(node => {
    if (ref.current) {
      // clean up events / references to previous dom `node` instance
    }

    if (node) {
      node.addEventListener('error', errorEvent => {
        console.error(`Error loading: ${JSON.stringify(errorEvent, null, 2)}`)
      })

      node.addEventListener('loadedmetadata', eventData => {
        // console.log(`duration ${audioRef.current.duration}`)
        // dispatch(actions.setAudioDuration(audioRef.current.duration))
        dispatch(actions.setAudioDuration(eventData.target.duration))
      })

      // loadstart
      // progress
      // canplaythrough

      // debounce(handleTimeupdate, 5000))
      console.log('setting timeupdate listener')
      node.addEventListener('timeupdate', eventData => {
        console.log('timeupdate', eventData.target.currentTime)
        dispatch(actions.setAudioPosition(eventData.target.currentTime))
      })

      node.addEventListener('ended', eventData => {
        // console.log('audio ended')
        dispatch(thunks.audio.playNextTrack())
      })
    }

    // Save a reference to the node
    ref.current = node
  }, [])

  return [getRef, setRef]
}

const Audio = () => {
  const [getAudioRef, setAudioRef] = useAudioRef()

  const dispatch = useDispatch()

  const audioMode = useSelector(selectors.getAudioMode)
  const audioUrl = useSelector(selectors.getAudioUrl)

  const forwardTaps = useSelector(selectors.getAudioTapsForward)
  const replayTaps = useSelector(selectors.getAudioTapsReplay)
  const seek = useSelector(selectors.getAudioSeek)

  //////////////////////////////////////////////////////////////////////////////
  // pause/play - consequence of button tap
  React.useEffect(() => {
    const audio = getAudioRef()
    if (!audio) return

    if (audioMode === storeConstants.AUDIO_MODE_PAUSE) {
      audio.pause()
    } else if (audioMode === storeConstants.AUDIO_MODE_PLAY) {
      audio.play()
    }
  }, [audioMode, audioUrl])

  //////////////////////////////////////////////////////////////////////////////
  // forward - consequence of button tap
  React.useEffect(() => {
    if (!forwardTaps) return

    const audio = getAudioRef()
    if (!audio) return

    const currentTime = audio.currentTime
    const duration = audio.duration

    const nextTime = currentTime + TAP_INTERVAL
    const tooLate = duration - TAP_INTERVAL

    if (nextTime < tooLate) {
      audio.currentTime = nextTime
    }
  }, [forwardTaps])

  //////////////////////////////////////////////////////////////////////////////
  // replay - consequence of button tap
  React.useEffect(() => {
    if (!replayTaps) return

    const audio = getAudioRef()
    if (!audio) return

    const currentTime = audio.currentTime

    const nextTime = currentTime - TAP_INTERVAL
    const tooEarly = TAP_INTERVAL

    if (nextTime > tooEarly) {
      audio.currentTime = nextTime
    }
  }, [replayTaps])

  //////////////////////////////////////////////////////////////////////////////
  // seek - consequence of slider interaction
  React.useEffect(() => {
    const seekPosition = seek?.position
    if (!seekPosition && seekPosition !== 0) return

    const audio = getAudioRef()
    if (!audio) return

    audio.currentTime = seekPosition
  }, [seek?.position])

  return audioUrl ? (
    <span>
      <audio ref={setAudioRef} src={audioUrl} autoPlay />
    </span>
  ) : null
}

export default Audio
