import { SELECT_PODCAST } from "./actionTypes";

export const selectPodcast = podcast => ({
  type: SELECT_PODCAST,
  payload: {
    podcast
  }
})
