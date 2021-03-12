import * as constants from '../../constants'
import * as ActionType from '../../actionTypes'

import {nextCounters} from '../util'

const initialState = {
  filter: {kind: constants.FILTER_KIND_FEATURED},
  navExpanders: {},
  navVisibility: null,
  pageNums: {},
  selectedAudio: null,
  starred: null,
  taps: {
    login: 0,
    logout: 0,
  },
  theme: constants.UI_THEME_SPEC,
  user: null,
  viewportHeight: '100vh',
}

const isStarredEmpty = starred => {
  // tbd move, consolidate
  const entries = Object.entries(starred)

  if (entries.length < 1) return true

  for (let [k, v] of entries) {
    if (v) return false
  }

  return true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.HIDE_NAV: {
      return {
        ...state,
        navVisibility: false
      }
    }
    case ActionType.LOGIN_ACTION: {
      return {
        ...state,
        taps: nextCounters('login', state.taps)
      }
    }
    case ActionType.LOGOUT_ACTION: {
      return {
        ...state,
        taps: nextCounters('logout', state.taps),
        user: null,
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
    case ActionType.SET_PAGENUM: {
      const {id, pageNum} = action.payload

      return {
        ...state,
        pageNums: {...state.pageNums, [id]: pageNum},
      }
    }
    case ActionType.SET_STARRED: {
      return {
        ...state,
        starred: action.payload.starred,
      }
    }
    case ActionType.SET_USER: {
      return {
        ...state,
        user: action.payload.user,
      }
    }
    case ActionType.SET_VIEWPORT_HEIGHT: {
      return {
        ...state,
        viewportHeight: action.payload.viewportHeight,
      }
    }
    case ActionType.SHOW_NAV: {
      return {
        ...state,
        navVisibility: true,
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
      const nextStarred = state.starred
        ? {...state.starred, ...{[action.payload.podcastId]: false}}
        : {[action.payload.podcastId]: false}

      const nextFilter = state.filter?.kind === constants.FILTER_KIND_MY_LIST && isStarredEmpty(nextStarred)
        ? { kind: constants.FILTER_KIND_FEATURED }
        : state.filter

      return {
        ...state,
        filter: nextFilter,
        starred: nextStarred,
      }
    }
    default:
      return state
  }
}

export default reducer
