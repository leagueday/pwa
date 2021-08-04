import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import { actions, selectors } from '../../store'

const useStyles = makeStyles(theme => ({
  inNOutButton: {
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
  },
}))

const SignInOutButton = ({ className }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)

  const isAuthenticated = !!user

  const [onClick, text] = isAuthenticated
    ? [() => dispatch(actions.logout()), 'SIGN OUT']
    : [() => dispatch(actions.login()), 'SIGN IN']

  return (
    <p
      onClick={onClick}
    >
      {text}
    </p>
  )
}

export default SignInOutButton
