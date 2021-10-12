import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Airtable from 'airtable'

export const baseId = 'appXoertP1WJjd4TQ'
export const apiKey = 'keymd23kpZ12EriVi'
export const base = new Airtable({ apiKey }).base(baseId)

ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById('root')
)

if (NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

if (NODE_ENV === 'development' && module.hot) {
  console.log('setting hmr')
  module.hot.accept('./App', renderApp)
}
