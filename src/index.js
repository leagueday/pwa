import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import './static.css'

ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById('root'))

if (process.env.NODE_ENV === 'development')
  module.hot.accept()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
