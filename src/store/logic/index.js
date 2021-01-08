import { combineReducers } from 'redux'

import appReducer from './app/reducer'
import * as appThunks from './app/thunks'
import audioReducer from './audio/reducer'

export const thunks = {
  app: appThunks,
}

export const createRootReducer = ({router}) => combineReducers({
  router,
  app: appReducer,
  audio: audioReducer,
})
