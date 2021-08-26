export { go as goHistory, push as pushHistory } from 'redux-first-history'

import * as ActionType from './actionTypes'

// App

export const addToMyList = (kind, id) => ({
  type: ActionType.ADD_TO_MYLIST,
  payload: {
    id,
    kind,
  },
})

export const condenseAudioControls = () => ({
  type: ActionType.CONDENSE_AUDIO_CONTROLS,
  payload: {},
})

export const expandAudioControls = () => ({
  type: ActionType.EXPAND_AUDIO_CONTROLS,
  payload: {},
})

export const hideAudioControls = () => ({
  type: ActionType.HIDE_AUDIO_CONTROLS,
  payload: {},
})

export const hideNav = () => ({
  type: ActionType.HIDE_NAV,
  payload: {},
})

export const login = () => ({
  type: ActionType.LOGIN_ACTION,
  payload: {},
})

export const logout = () => ({
  type: ActionType.LOGOUT_ACTION,
  payload: {},
})

export const removeFromMyList = (kind, id) => ({
  type: ActionType.REMOVE_FROM_MYLIST,
  payload: {
    id,
    kind,
  },
})

export const setFilter = (kind, cat, subcat) => ({
  type: ActionType.SET_FILTER,
  payload: {
    cat,
    kind,
    subcat,
  },
})

export const setNavExpander = (open, tag) => ({
  type: ActionType.SET_NAV_EXPANDER,
  payload: {
    open,
    tag,
  },
})

export const setPageNum = (id, pageNum) => ({
  type: ActionType.SET_PAGENUM,
  payload: {
    id,
    pageNum,
  },
})

export const setUser = user => ({
  type: ActionType.SET_USER,
  payload: {
    user,
  },
})

export const setUserData = userData => ({
  type: ActionType.SET_USERDATA,
  payload: {
    userData,
  },
})

export const setFriendsList = friendsList => ({
  type: ActionType.SET_FRIENDS_LIST,
  payload: {
    friendsList
  }
})

export const setChannelList = channelList => (
  {
    type: ActionType.SET_CHANNEL_LIST,
    payload: {
      channelList
    }
  })

export const setCreatorList = creatorList => ({
  type: ActionType.SET_CREATOR_LIST,
  payload: {
    creatorList
  }
})

export const showAudioControls = () => ({
  type: ActionType.SHOW_AUDIO_CONTROLS,
  payload: {},
})

export const showNav = () => ({
  type: ActionType.SHOW_NAV,
  payload: {},
})

// Audio

export const audioSeeked = position => ({
  type: ActionType.AUDIO_SEEKED,
  payload: {
    position,
  },
})

export const forwardAudio = () => ({
  type: ActionType.FORWARD_AUDIO,
  payload: {},
})

export const pauseAudio = () => ({
  type: ActionType.PAUSE_ACTION,
  payload: {},
})

export const pauseAudioEvent = () => ({
  type: ActionType.PAUSE_EVENT,
  payload: {},
})

export const playAudio = () => ({
  type: ActionType.PLAY_ACTION,
  payload: {},
})

export const playAudioEvent = () => ({
  type: ActionType.PLAY_EVENT,
  payload: {},
})

export const replayAudio = () => ({
  type: ActionType.REPLAY_AUDIO,
  payload: {},
})

export const seekAudio = position => ({
  type: ActionType.SEEK_AUDIO,
  payload: {
    position,
  },
})

export const selectAudio = (
  podcastId,
  podcastName,
  podcastUrl,
  audioUrl,
  itemIndex,
  advertisedDuration,
  title,
  position
) => ({
  type: ActionType.SELECT_AUDIO,
  payload: {
    audioUrl,
    advertisedDuration,
    itemIndex,
    podcastId,
    podcastName,
    podcastUrl,
    title,
    position,
  },
});

export const setAudioDuration = duration => ({
  type: ActionType.SET_AUDIO_DURATION,
  payload: {
    duration,
  },
})

export const setAudioPosition = position => ({
  type: ActionType.SET_AUDIO_POSITION,
  payload: {
    position,
  },
})

export const setAudioVolume = volume => ({
  type: ActionType.SET_AUDIO_VOLUME,
  payload: {
    volume,
  },
})
