import * as constants from '../../constants'
import * as ActionType from '../../actionTypes';

const initialState = {
  duration: null,
  mode: constants.AUDIO_MODE_PAUSE,
  podcastId: null,
  position: null,
  url: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case ActionType.SELECT_AUDIO: {
      return {
        ...state,
        duration: action.payload.advertisedDuration,
        mode: constants.AUDIO_MODE_PLAY,
        podcastId: action.payload.podcastId,
        position: 0,
        url: action.payload.url,
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
