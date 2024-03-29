import * as constants from '../../constants'
import * as ActionType from '../../actionTypes'

import { nextCounters } from '../util'

const initialState = {
  audioControlsExpanded: false,
  audioControlsHidden: false,
  filter: { kind: constants.FILTER_KIND_FEATURED },
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
  friends: [],
  myChannelList: [],
  myCreatorList: []
}

const addToMyList = (state, title, tag, img) => {
  console.log('add to list reducer func ', title, tag, img)
  const myList = state.myChannelList ?? []
  const nextMyList = [...myList, { fields: { title: title, tag: tag, channelImg: img } }]

  return nextMyList
}

const removeFromMyList = (userData, id, kind) => {
  if (!userData) return userData

  const myList = userData.my

  const nextMyList = myList
    ? myList.filter(
      ({ id: liId, kind: liKind }) => liId !== id || liKind !== kind
    )
    : []

  return {
    ...userData,
    my: nextMyList,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_TO_MYLIST: {
      const { title, tag, img } = action.payload
      return {
        ...state,
        myChannelList: addToMyList(state, title, tag, img),
      }
    }
    case ActionType.CONDENSE_AUDIO_CONTROLS: {
      return {
        ...state,
        audioControlsExpanded: false,
      }
    }
    case ActionType.EXPAND_AUDIO_CONTROLS: {
      return {
        ...state,
        audioControlsExpanded: true,
      }
    }
    case ActionType.HIDE_AUDIO_CONTROLS: {
      return {
        ...state,
        audioControlsHidden: true,
      }
    }
    case ActionType.HIDE_NAV: {
      return {
        ...state,
        navVisibility: false,
      }
    }
    case ActionType.LOGIN_ACTION: {
      return {
        ...state,
        taps: nextCounters('login', state.taps),
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
      const { id, kind } = action.payload

      return {
        ...state,
        userData: removeFromMyList(state.userData, id, kind),
      }
    }
    case ActionType.SET_FILTER: {
      return {
        ...state,
        filter: action.payload,
      }
    }
    case ActionType.SET_NAV_EXPANDER: {
      const { open, tag } = action.payload

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
      const { id, pageNum } = action.payload

      return {
        ...state,
        pageNums: { ...state.pageNums, [id]: pageNum },
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
    case ActionType.SET_FRIENDS_LIST: {
      return {
        ...state,
        friends: action.payload.friendsList
      }
    }
    case ActionType.SET_CHANNEL_LIST: {
      return {
        ...state,
        myChannelList: action.payload.channelList
      }
    }
    case ActionType.SET_CREATOR_LIST: {
      return {
        ...state,
        myCreatorList: action.payload.creatorList
      }
    }
    case ActionType.SHOW_AUDIO_CONTROLS: {
      return {
        ...state,
        audioControlsHidden: false,
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

export default reducer;