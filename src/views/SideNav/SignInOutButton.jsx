import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import {actions, selectors} from '../../store'

const useStyles = makeStyles({
})

const SignInOutButton = ({className}) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)

  const isAuthenticated = !!user

  const [onClick, text] =
    isAuthenticated
      ? [ () => dispatch(actions.logout()), 'Sign Out' ]
      : [ () => dispatch(actions.login()), 'Sign In' ]

  return (
    <Button className={className} color="primary" onClick={onClick} variant="contained">
      {text}
    </Button>
  )
}

export default SignInOutButton
