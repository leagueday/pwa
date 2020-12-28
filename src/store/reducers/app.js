import * as ActionType from '../actionTypes';

const initialState = {
  selectedAudio: null,
  selectedPodcast: null,
  showCategories: false,
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
          mode: 'pause',
        }
      }
    }
    case ActionType.PLAY_AUDIO: {
      return {
        ...state,
        selectedAudio: {
          ...state.selectedAudio,
          mode: 'play'
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
          mode: 'play'
        }
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
