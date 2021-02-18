import * as constants from '../../constants'
import * as ActionType from '../../actionTypes';

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
}

const nextCounters = (keyword, counters) => Object.entries(counters).reduce(
  (acc, [tag, count]) => {
    acc[tag] = tag === keyword ? count + 1 : count
    return acc
  },
  { }
)

const setCounter = (keyword, nextCount, counters) => Object.entries(counters).reduce(
  (acc, [tag, count]) => {
    acc[tag] = tag === keyword ? nextCount : count
    return acc
  },
  { }
)

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUDIO_SEEKED: {
      return {
        ...state,
        events: nextCounters('seeked', state.events)
      }
    }
    case ActionType.FORWARD_AUDIO: {
      return {
        ...state,
        taps: nextCounters('forward', state.taps)
      }
    }
    case ActionType.PAUSE_ACTION: {
      return evaluateMode(ActionType.PAUSE_ACTION)({
        ...state,
        taps: nextCounters('pause', state.taps)
      })
    }
    case ActionType.PAUSE_EVENT: {
      return evaluateMode(ActionType.PAUSE_EVENT)({
        ...state,
        events: nextCounters('pause', state.events)
      })
    }
    case ActionType.PLAY_ACTION: {
      return evaluateMode(ActionType.PLAY_ACTION)({
        ...state,
        taps: nextCounters('play', state.taps)
      })
    }
    case ActionType.PLAY_EVENT: {
      return evaluateMode(ActionType.PLAY_EVENT)({
        ...state,
        events: nextCounters('play', state.events)
      })
    }
    case ActionType.REPLAY_AUDIO: {
      return {
        ...state,
        taps: nextCounters('replay', state.taps)
      }
    }
    case ActionType.SEEK_AUDIO: {
      return {
        ...state,
        seek: {
          position: action.payload.position,
        }
      }
    }
    case ActionType.SELECT_AUDIO: {
      return {
        ...state,
        duration: action.payload.advertisedDuration,
        itemIndex: action.payload.itemIndex,
        podcastId: action.payload.podcastId,
        podcastUrl: action.payload.podcastUrl,
        seek: {
          position: action.payload.position ?? null
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
    default:
      return state
  }
}

export default reducer
