export { go as goHistory, push as pushHistory } from 'redux-first-history'

import * as ActionType from './actionTypes'

export const hideCategories = () => ({
  type: ActionType.HIDE_CATEGORIES,
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

export const selectAudio = (podcastId, url, type) => ({
  type: ActionType.SELECT_AUDIO,
  payload: {
    podcastId,
    type,
    url,
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
