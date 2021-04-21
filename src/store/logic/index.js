import { combineReducers } from 'redux'

import appReducer from './app/reducer'
import * as appThunks from './app/thunks'
import audioReducer from './audio/reducer'
import * as audioThunks from './audio/thunks'

export const thunks = {
  app: appThunks,
  audio: audioThunks,
}

export const createRootReducer = ({ router }) =>
  combineReducers({
    router,
    app: appReducer,
    audio: audioReducer,
  })
