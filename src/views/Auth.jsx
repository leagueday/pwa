import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import netlifyIdentity from 'netlify-identity-widget'

import { actions, selectors } from '../store'

const makeOnInit = dispatch => user => {
  // console.log('init', JSON.stringify(user, null, 2))

  if (user) {
    dispatch(actions.setUser(user))
  }
}

const makeOnLogin = dispatch => user => {
  console.log('login', JSON.stringify(user, null, 2))

  dispatch(actions.setUser(user))
}

const makeOnLogout = dispatch => () => {
  console.log('logout')

  dispatch(actions.setUser())
}

const onError = err => {
  console.error('auth error', err)
}

// const onOpen = () => {
//   console.log('auth opened')
// }
//
// const onClose = () => {
//   console.log('auth closed')
// }

const Auth = () => {
  const dispatch = useDispatch()
  const taps = useSelector(selectors.getTaps)

  const { login: loginTaps, logout: logoutTaps } = taps

  React.useEffect(() => {
    window.netlifyIdentity = netlifyIdentity

    netlifyIdentity.on('init', makeOnInit(dispatch))
    netlifyIdentity.on('login', makeOnLogin(dispatch))
    netlifyIdentity.on('logout', makeOnLogout(dispatch))
    netlifyIdentity.on('error', onError)
    // netlifyIdentity.on('open', onOpen)
    // netlifyIdentity.on('close', onClose)

    netlifyIdentity.init({
      APIUrl: 'https://app.leagueday.gg/.netlify/identity'
    })
  }, [])

  React.useEffect(() => {
    if (loginTaps > 0) {
      netlifyIdentity.open()
    }
  }, [loginTaps])

  React.useEffect(() => {
    if (logoutTaps > 0) {
      netlifyIdentity.logout()
    }
  }, [logoutTaps])

  return null
}

export default Auth
