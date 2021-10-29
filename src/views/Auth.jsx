import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import netlifyIdentity from 'netlify-identity-widget'

import { actions, selectors } from '../store'

const makeOnInit = dispatch => user => {
  if (user) {
    dispatch(actions.setUser(user))
  }
}

const makeOnLogin = dispatch => user => {
  dispatch(actions.setUser(user))
}

const makeOnLogout = dispatch => () => {
  console.log('logout')

  dispatch(actions.setUser())
}

const onError = err => {
  console.error('auth error', err)
}

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

    netlifyIdentity.init({
      APIUrl: 'https://leaguedayapp.gg/.netlify/identity'
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
