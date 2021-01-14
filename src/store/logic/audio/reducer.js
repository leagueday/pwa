import * as constants from '../../constants'
import * as ActionType from '../../actionTypes';

const initialState = {
  audioSeeked: 0,
  audioUrl: null,
  controllerTaps: {
    forward: 0,
    replay: 0,
  },
  duration: null,
  itemIndex: null,
  mode: constants.AUDIO_MODE_PAUSE,
  podcastId: null,
  podcastUrl: null,
  position: null,
  seek: {
    position: null,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUDIO_SEEKED: {
      state.audioSeeked++
      return state
    }
    case ActionType.FORWARD_AUDIO: {
      state.controllerTaps.forward++
      return state
    }
    case ActionType.PAUSE_AUDIO: {
      return {
        ...state,
        mode: constants.AUDIO_MODE_PAUSE,
      }
    }
    case ActionType.PLAY_AUDIO: {
      return {
        ...state,
        mode: constants.AUDIO_MODE_PLAY
      }
    }
    case ActionType.REPLAY_AUDIO: {
      state.controllerTaps.replay++
      return state
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
        mode: constants.AUDIO_MODE_PLAY,
        podcastId: action.payload.podcastId,
        podcastUrl: action.payload.podcastUrl,
        position: 0,
        audioUrl: action.payload.audioUrl,
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
