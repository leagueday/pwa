export { go as goHistory, push as pushHistory } from 'redux-first-history'

import * as ActionType from './actionTypes'

// App

export const hideCategories = () => ({
  type: ActionType.HIDE_CATEGORIES,
  payload: {
  }
})

export const selectPodcast = podcast => ({
  type: ActionType.SELECT_PODCAST,
  payload: {
    podcast
  }
})

export const setCategoryFilter = (cat, subcat) => ({
  type: ActionType.SET_CATEGORY_FILTER,
  payload: {
    cat,
    subcat
  }
})

export const setStarred = starred => ({
  type: ActionType.SET_STARRED,
  payload: {
    starred
  }
})

export const setTheme = theme => ({
  type: ActionType.SET_THEME,
  payload: {
    theme
  }
})

export const showCategories = () => ({
  type: ActionType.SHOW_CATEGORIES,
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
  type: ActionType.PAUSE_AUDIO,
  payload: {
  }
})

export const playAudio = () => ({
  type: ActionType.PLAY_AUDIO,
  payload: {
  }
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
  (podcastId, podcastUrl, audioUrl, itemIndex, advertisedDuration) => ({
    type: ActionType.SELECT_AUDIO,
    payload: {
      advertisedDuration,
      itemIndex,
      podcastId,
      podcastUrl,
      audioUrl,
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
