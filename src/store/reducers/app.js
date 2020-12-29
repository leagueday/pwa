import * as constants from '../constants'
import * as ActionType from '../actionTypes';

const initialState = {
  selectedAudio: null,
  selectedPodcast: null,
  showCategories: false,
  theme: constants.UI_THEME_SPECIFIC,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.HIDE_CATEGORIES: {
      return {
        ...state,
        showCategories: false
      }
    }
    case ActionType.PAUSE_AUDIO: {
      return {
        ...state,
        selectedAudio: {
          ...state.selectedAudio,
          mode: constants.AUDIO_MODE_PAUSE,
        }
      }
    }
    case ActionType.PLAY_AUDIO: {
      return {
        ...state,
        selectedAudio: {
          ...state.selectedAudio,
          mode: constants.AUDIO_MODE_PLAY
        }
      }
    }
    case ActionType.SELECT_PODCAST: {
      return {
        ...state,
        selectedPodcast: action.payload?.podcast
      }
    }
    case ActionType.SET_AUDIO: {
      return {
        ...state,
        selectedAudio: {
          ...action.payload,
          mode: constants.AUDIO_MODE_PLAY
        }
      }
    }
    case ActionType.SET_THEME: {
      return {
        ...state,
        theme: action.payload.theme
      }
    }
    case ActionType.SHOW_CATEGORIES: {
      return {
        ...state,
        showCategories: true
      }
    }
    default:
      return state;
  }
}

export default reducer
