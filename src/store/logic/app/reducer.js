import * as constants from '../../constants'
import * as ActionType from '../../actionTypes'

const initialState = {
  filter: {kind: constants.FILTER_KIND_FEATURED},
  navExpanders: {
    [constants.NAV_EXPANDER_CLASSIC_GAMES]: true,
    [constants.NAV_EXPANDER_IGAMING]: true,
    [constants.NAV_EXPANDER_VIDEO_GAMES]: true,
  },
  navVisibility: null,
  selectedAudio: null,
  selectedPodcast: null,
  starred: null,
  theme: constants.UI_THEME_SPEC,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.HIDE_NAV: {
      return {
        ...state,
        navVisibility: false
      }
    }
    case ActionType.SELECT_PODCAST: {
      return {
        ...state,
        selectedPodcast: action.payload?.podcast
      }
    }
    case ActionType.SET_FILTER: {
      return {
        ...state,
        filter: action.payload
      }
    }
    case ActionType.SET_NAV_EXPANDER: {
      const {open, tag} = action.payload

      const navExpanders = {
        ...state.navExpanders,
        [tag]: open,
      }

      return {
        ...state,
        navExpanders,
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
    case ActionType.SHOW_NAV: {
      return {
        ...state,
        navVisibility: true
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
