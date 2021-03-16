import * as constants from '../../constants'
import * as ActionType from '../../actionTypes'

import {nextCounters} from '../util'

const initialState = {
  filter: {kind: constants.FILTER_KIND_FEATURED},
  navExpanders: {},
  navVisibility: null,
  pageNums: {},
  selectedAudio: null,
  taps: {
    login: 0,
    logout: 0,
  },
  theme: constants.UI_THEME_SPEC,
  user: null,
  userData: null,
  viewportHeight: '100vh',
}

const addToMyList = (userData, id, kind) => {
  const myList = userData?.my ?? []
  const nextMyList = [...myList, {id, kind}]

  return {
    ...userData,
    my: nextMyList
  }
}

const removeFromMyList = (userData, id, kind) => {
  if (!userData) return userData

  const myList = userData.my

  const nextMyList = !myList ? [] : myList.filter(
    ({id: liId, kind: liKind}) => liId !== id && liKind !== kind
  )

  return {
    ...userData,
    my: nextMyList
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_TO_MYLIST: {
      const {id, kind} = action.payload

      return {
        ...state,
        userData: addToMyList(state.userData, id, kind)
      }
    }
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
        userData: null,
      }
    }
    case ActionType.REMOVE_FROM_MYLIST: {
      const {id, kind} = action.payload

      return {
        ...state,
        userData: removeFromMyList(state.userData, id, kind)
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
    case ActionType.SET_USER: {
      return {
        ...state,
        user: action.payload.user,
      }
    }
    case ActionType.SET_USERDATA: {
      return {
        ...state,
        userData: action.payload.userData,
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
    default:
      return state
  }
}

export default reducer
