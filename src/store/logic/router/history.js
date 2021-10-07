import { createBrowserHistory } from 'history'
import { createReduxHistoryContext } from 'redux-first-history'

let history = null

const _history = {
  createReduxHistory: null,
  reachHistory: null,
  reduxHistory: null,
  routerMiddleware: null,
  routerReducer: null,
}

export const createHistory = () => {
  const {
    createReduxHistory,
    routerMiddleware,
    routerReducer,
  } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 2,
    //other options if needed
  })

  _history.createReduxHistory = createReduxHistory
  _history.routerMiddleware = routerMiddleware
  _history.routerReducer = routerReducer

  return [_history.routerReducer, _history.routerMiddleware]
}

export const getHistory = () => _history.reduxHistory

export const prepareHistory = store => {
  history = _history.reduxHistory = _history.createReduxHistory(store)
}
