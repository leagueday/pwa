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

import { actions, constants as storeConsts, selectors, thunks } from '../store'

const debugAudio = false

const TAP_INTERVAL = 15

const addDebugEventListeners = debugAudio ?
  audioDomNode => {
    for (let [event, description] of [
      [ 'audioprocess',
        'The input buffer of a ScriptProcessorNode is ready to be processed.'
      ], [ 'canplay',
        'The browser can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.'
      ], [ 'canplaythrough',
        'The browser estimates it can play the media up to its end without stopping for content buffering.'
      ], [ 'complete',
        'The rendering of an OfflineAudioContext is terminated.'
      ], [ 'durationchange',
        'The duration attribute has been updated.'
      ], [ 'emptied',
        'The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.'
      ], [ 'ended',
        'Playback has stopped because the end of the media was reached.'
      ], [ 'loadeddata',
        'The first frame of the media has finished loading.'
      ], [ 'loadedmetadata',
        'The metadata has been loaded.'
      ], [ 'pause',
        'Playback has been paused.'
      ], [ 'play',
        'Playback has begun.'
      ], [ 'playing',
        'Playback is ready to start after having been paused or delayed due to lack of data.'
      ], [ 'ratechange',
        'The playback rate has changed.'
      ], [ 'seeked',
        'A seek operation completed.'
      ], [ 'seeking',
        'A seek operation began.'
      ], [ 'stalled',
        'The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.'
      ], [ 'suspend',
        'Media data loading has been suspended.'
      ], [ 'timeupdate',
        'The time indicated by the currentTime attribute has been updated.'
      ], [ 'volumechange',
        'The volume has changed.'
      ], [ 'waiting',
        'Playback has stopped because of a temporary lack of data'
      ],
    ]) {
      audioDomNode.addEventListener(event, () => {
        console.log(`Audio Event: ${event} (${description})`)
      })
    }
  } : () => {}

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
    // if (ref.current) {
      // clean up events / references to previous dom `node` instance
    // }

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
      node.addEventListener('timeupdate', eventData => {
        // console.log('timeupdate', eventData.target.currentTime)
        dispatch(actions.setAudioPosition(eventData.target.currentTime))
      })

      node.addEventListener('ended', eventData => {
        // console.log('audio ended')
        dispatch(thunks.audio.playNextTrack())
      })

      node.addEventListener('seeked', () => {
        dispatch(actions.audioSeeked())
      })

      // to track activity due to iOS lock screen controller...
      node.addEventListener('pause', () => {
        dispatch(actions.pauseAudioEvent())
      })

      node.addEventListener('play', () => {
        dispatch(actions.playAudioEvent())
      })

      // testing...
      addDebugEventListeners(node)
    }

    // Save a reference to the node
    ref.current = node
  }, [])

  return [getRef, setRef]
}

const Audio = () => {
  const [getAudioRef, setAudioRef] = useAudioRef()
  const audioMode = useSelector(selectors.getAudioMode)
  const audioUrl = useSelector(selectors.getAudioUrl)

  // const events = useSelector(selectors.getAudioEvents)
  const taps = useSelector(selectors.getAudioTaps)
  const seek = useSelector(selectors.getAudioSeek)

  // console.log('events', events)
  // console.log('taps', taps)

  const {
    forward: forwardTaps,
    // pause: pauseTaps,
    // play: playTaps,
    replay: replayTaps,
  } = taps

  //////////////////////////////////////////////////////////////////////////////
  // play/pause - consequence of button tap, or an event after-effect

  React.useEffect(() => {
    const audioDomNode = getAudioRef()
    if (!audioDomNode) return

    // console.log('audio mode', audioMode, audioDomNode.paused)

    if (audioMode === storeConsts.AUDIO_MODE_PAUSE && !audioDomNode.paused)
      audioDomNode.pause()
    else if (audioMode === storeConsts.AUDIO_MODE_PLAY && audioDomNode.paused)
      audioDomNode.play()
  }, [audioMode])

  //////////////////////////////////////////////////////////////////////////////
  // forward - consequence of button tap
  React.useEffect(() => {
    if (!forwardTaps) return

    const audioDomNode = getAudioRef()
    if (!audioDomNode) return

    const currentTime = audioDomNode.currentTime
    const duration = audioDomNode.duration

    const nextTime = currentTime + TAP_INTERVAL
    const tooLate = duration - TAP_INTERVAL

    if (nextTime < tooLate) {
      audioDomNode.currentTime = nextTime
    }
  }, [forwardTaps])

  //////////////////////////////////////////////////////////////////////////////
  // replay - consequence of button tap
  React.useEffect(() => {
    if (!replayTaps) return

    const audioDomNode = getAudioRef()
    if (!audioDomNode) return

    const currentTime = audioDomNode.currentTime

    const nextTime = currentTime - TAP_INTERVAL

    if (nextTime > TAP_INTERVAL) {
      audioDomNode.currentTime = nextTime
    }
  }, [replayTaps])

  //////////////////////////////////////////////////////////////////////////////
  // seek - consequence of slider interaction
  React.useEffect(() => {
    const seekPosition = seek?.position
    if (!seekPosition && seekPosition !== 0) return

    const audioDomNode = getAudioRef()
    if (!audioDomNode) return

    audioDomNode.currentTime = seekPosition
  }, [seek?.position])

  return audioUrl ? (
    <span>
      <audio ref={setAudioRef} src={audioUrl} />
    </span>
  ) : null
}

export default Audio
