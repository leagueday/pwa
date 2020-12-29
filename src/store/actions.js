import * as ActionType from "./actionTypes";

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

export const selectPodcast = podcast => ({
  type: ActionType.SELECT_PODCAST,
  payload: {
    podcast
  }
})

export const setAudio = (url, type) => ({
  type: ActionType.SET_AUDIO,
  payload: {
    type,
    url,
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
