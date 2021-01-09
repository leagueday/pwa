import * as constants from '../../constants'
import * as ActionType from '../../actionTypes';

const initialState = {
  categoryFilter: null,
  selectedAudio: null,
  selectedPodcast: null,
  showCategories: null,
  starred: null,
  theme: constants.UI_THEME_SPEC,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.HIDE_CATEGORIES: {
      return {
        ...state,
        showCategories: false
      }
    }
    case ActionType.SELECT_PODCAST: {
      return {
        ...state,
        selectedPodcast: action.payload?.podcast
      }
    }
    case ActionType.SET_CATEGORY_FILTER: {
      return {
        ...state,
        categoryFilter: action.payload
      }
    }
    case ActionType.SET_STARRED: {
      return {
        ...state,
        starred: action.payload.starred
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
    case ActionType.STAR_PODCAST: {
      return {
        ...state,
        starred: state.starred
          ? {...state.starred, ...{[action.payload.podcastId]: true}}
          : {[action.payload.podcastId]: true}
      }
    }
    case ActionType.UNSTAR_PODCAST: {
      return {
        ...state,
        starred: state.starred
          ? {...state.starred, ...{[action.payload.podcastId]: false}}
          : {[action.payload.podcastId]: false}
      }
    }
    default:
      return state
  }
}

export default reducer
