import * as constants from '../../constants'
import * as ActionType from '../../actionTypes'

import { nextCounters } from '../util'

const TAP_INTERVAL = 15

const initialState = {
  audioUrl: null,
  duration: null,
  events: {
    pause: 0,
    play: 0,
    seeked: 0,
  },
  itemIndex: null,
  mode: constants.AUDIO_MODE_PAUSE,
  podcastId: null,
  podcastName: null,
  podcastUrl: null,
  position: null,
  seek: {
    position: null,
  },
  taps: {
    forward: 0,
    pause: 0,
    play: 0,
    replay: 0,
  },
  title: null,
  volume: 66,
}

const setCounter = (keyword, nextCount, counters) =>
  Object.entries(counters).reduce((acc, [tag, count]) => {
    acc[tag] = tag === keyword ? nextCount : count
    return acc
  }, {})

// this is used like a post-action middleware, I'm not sure how to set that up in
// redux-thunk or other, tbd
const evaluateMode = actionType => intermediateState => {
  switch (actionType) {
    case ActionType.PAUSE_ACTION: {
      return {
        ...intermediateState,
        mode: constants.AUDIO_MODE_PAUSE,
      }
    }
    case ActionType.PAUSE_EVENT: {
      const intermEvents = intermediateState.events.pause
      const intermTaps = intermediateState.taps.pause

      const eventIsExpected = intermEvents === intermTaps

      if (eventIsExpected) return intermediateState

      return {
        ...intermediateState,
        mode: constants.AUDIO_MODE_PAUSE,
        taps: setCounter('pause', intermEvents, intermediateState.taps),
      }
    }
    case ActionType.PLAY_ACTION: {
      return {
        ...intermediateState,
        mode: constants.AUDIO_MODE_PLAY,
      }
    }
    case ActionType.PLAY_EVENT: {
      const intermEvents = intermediateState.events.play
      const intermTaps = intermediateState.taps.play

      const eventIsExpected = intermEvents === intermTaps

      if (eventIsExpected) return intermediateState

      return {
        ...intermediateState,
        mode: constants.AUDIO_MODE_PLAY,
        taps: setCounter('play', intermEvents, intermediateState.taps),
      }
    }
    default:
      return intermediateState
  }
}

// this is used like a post-action middleware, I'm not sure how to set that up in
// redux-thunk or other, tbd
const evaluatePosition = actionType => intermediateState => {
  switch (actionType) {
    case ActionType.FORWARD_AUDIO: {
      const { duration, position: intermPosition } = intermediateState

      if (!duration || intermPosition == null) return intermediateState

      const nextTime = Math.floor(intermPosition + TAP_INTERVAL)
      const tooLate = duration - TAP_INTERVAL

      return nextTime < tooLate
        ? {
            ...intermediateState,
            position: nextTime,
          }
        : intermediateState
    }
    case ActionType.REPLAY_AUDIO: {
      const { duration, position: intermPosition } = intermediateState

      if (!duration || intermPosition == null) return intermediateState

      const nextTime = Math.floor(intermPosition - TAP_INTERVAL)

      return nextTime < duration && nextTime > TAP_INTERVAL
        ? {
            ...intermediateState,
            position: nextTime,
          }
        : intermediateState
    }
    default:
      return intermediateState
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUDIO_SEEKED: {
      return {
        ...state,
        events: nextCounters('seeked', state.events),
        position: action.payload.position,
        seek: {
          position: null,
        },
      }
    }
    case ActionType.FORWARD_AUDIO: {
      return evaluatePosition(ActionType.FORWARD_AUDIO)({
        ...state,
        taps: nextCounters('forward', state.taps),
      })
    }
    case ActionType.PAUSE_ACTION: {
      return evaluateMode(ActionType.PAUSE_ACTION)({
        ...state,
        taps: nextCounters('pause', state.taps),
      })
    }
    case ActionType.PAUSE_EVENT: {
      return evaluateMode(ActionType.PAUSE_EVENT)({
        ...state,
        events: nextCounters('pause', state.events),
      })
    }
    case ActionType.PLAY_ACTION: {
      return evaluateMode(ActionType.PLAY_ACTION)({
        ...state,
        taps: nextCounters('play', state.taps),
      })
    }
    case ActionType.PLAY_EVENT: {
      return evaluateMode(ActionType.PLAY_EVENT)({
        ...state,
        events: nextCounters('play', state.events),
      })
    }
    case ActionType.REPLAY_AUDIO: {
      return evaluatePosition(ActionType.REPLAY_AUDIO)({
        ...state,
        taps: nextCounters('replay', state.taps),
      })
    }
    case ActionType.SEEK_AUDIO: {
      return {
        ...state,
        seek: {
          position: action.payload.position,
        },
      }
    }
    case ActionType.SELECT_AUDIO: {
      return {
        ...state,
        duration: action.payload.advertisedDuration,
        itemIndex: action.payload.itemIndex,
        podcastId: action.payload.podcastId,
        podcastName: action.payload.podcastName,
        podcastUrl: action.payload.podcastUrl,
        seek: {
          position: action.payload.position ?? null,
        },
        position: action.payload.position ?? 0,
        audioUrl: action.payload.audioUrl,
        title: action.payload.title,
      }
    }
    case ActionType.SET_AUDIO_DURATION: {
      return {
        ...state,
        duration: action.payload.duration,
      }
    }
    case ActionType.SET_AUDIO_POSITION: {
      return {
        ...state,
        position: action.payload.position,
      }
    }
    case ActionType.SET_AUDIO_VOLUME: {
      return {
        ...state,
        volume: action.payload.volume,
      }
    }
    default:
      return state
  }
}

export default reducer
