import * as ActionType from "./actionTypes";

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

export const showCategories = () => ({
  type: ActionType.SHOW_CATEGORIES,
  payload: {
  }
})
