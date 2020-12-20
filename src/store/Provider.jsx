import React from 'react'
import { store } from './store'

import { Provider as ReduxProvider } from 'react-redux'

const Provider = props => (
  <ReduxProvider store={store}>
    {props.children}
  </ReduxProvider>
)

export default Provider
