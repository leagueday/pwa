import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { createRootReducer } from './logic'
import { createHistory, prepareHistory } from './logic/router'

const [routerReducer, routerMiddleware] = createHistory()

const store = createStore(
  createRootReducer({
    router: routerReducer,
  }),
  composeWithDevTools(applyMiddleware(routerMiddleware, thunkMiddleware))
)

prepareHistory(store)

export default store
