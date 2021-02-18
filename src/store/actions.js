export { go as goHistory, push as pushHistory } from 'redux-first-history'

import * as ActionType from './actionTypes'

// App

export const hideNav = () => ({
  type: ActionType.HIDE_NAV,
  payload: {
  }
})

export const setFilter = (kind, cat, subcat) => ({
  type: ActionType.SET_FILTER,
  payload: {
    cat,
    kind,
    subcat,
  }
})

export const setNavExpander = (open, tag) => ({
  type: ActionType.SET_NAV_EXPANDER,
  payload: {
    open,
    tag,
  }
})

export const setStarred = starred => ({
  type: ActionType.SET_STARRED,
  payload: {
    starred
  }
})

export const setViewportHeight = viewportHeight => ({
  type: ActionType.SET_VIEWPORT_HEIGHT,
  payload: {
    viewportHeight,
  }
})

export const showNav = () => ({
  type: ActionType.SHOW_NAV,
  payload: {
  }
})

export const starPodcast = podcastId => ({
  type: ActionType.STAR_PODCAST,
  payload: {
    podcastId
  }
})

export const unstarPodcast = podcastId => ({
  type: ActionType.UNSTAR_PODCAST,
  payload: {
    podcastId
  }
})

// Audio

export const audioSeeked = () => ({
  type: ActionType.AUDIO_SEEKED,
  payload: {
  }
})

export const forwardAudio = () => ({
  type: ActionType.FORWARD_AUDIO,
  payload: {
  }
})

export const pauseAudio = () => ({
  type: ActionType.PAUSE_ACTION,
  payload: {
  }
})

export const pauseAudioEvent = () => ({
  type: ActionType.PAUSE_EVENT,
  payload: {
  },
})

export const playAudio = () => ({
  type: ActionType.PLAY_ACTION,
  payload: {
  },
})

export const playAudioEvent = () => ({
  type: ActionType.PLAY_EVENT,
  payload: {
  },
})

export const replayAudio = () => ({
  type: ActionType.REPLAY_AUDIO,
  payload: {
  }
})

export const seekAudio = position => ({
  type: ActionType.SEEK_AUDIO,
  payload: {
    position
  }
})

export const selectAudio =
  (podcastId,
   podcastUrl,
   audioUrl,
   itemIndex,
   advertisedDuration,
   title,
   position) => ({
    type: ActionType.SELECT_AUDIO,
    payload: {
      audioUrl,
      advertisedDuration,
      itemIndex,
      podcastId,
      podcastUrl,
      title,
      position,
    }
  })

export const setAudioDuration = duration => ({
  type: ActionType.SET_AUDIO_DURATION,
  payload: {
    duration,
  }
})

export const setAudioPosition = position => ({
  type: ActionType.SET_AUDIO_POSITION,
  payload: {
    position,
  }
})
