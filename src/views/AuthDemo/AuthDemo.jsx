import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'

import {actions, selectors} from '../../store'

const useStyles = makeStyles(theme => ({
  authDemo: {
    backgroundColor: 'lightgrey',
    color: '#202020',
    height: '80%',
    padding: '1em',
  },
  card: {
    color: '#202020',
    backgroundColor: 'grey',
    height: '100%',
    padding: '1em',
    width: '100%',
  },
  clientResponse: {
    [theme.breakpoints.only('xs')]: {
      margin: '1em',
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '2em',
      width: `${theme.breakpoints.values.sm}px`,
    },
    [theme.breakpoints.up('md')]: {
      margin: '3em',
    },
    [theme.breakpoints.up('lg')]: {
      margin: '4em',
    },
    [theme.breakpoints.only('xl')]: {
      margin: '5em',
    },
  },
  flushRight: {
    marginLeft: 'auto',
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  textField: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))

const AuthStateTextField = ({className, isAuthenticated}) => (
  <div className={className}>
    {
      isAuthenticated == null ? 'auth loading...'
        : isAuthenticated ? 'authenticated'
        : 'not authenticated'
    }
  </div>
)

const SignButton = ({isAuthenticated, signIn, signOut}) => (
    <Button color="primary" onClick={isAuthenticated ? signOut : signIn} variant="contained">
      {isAuthenticated ? 'Sign Out' : 'Sign In'}
    </Button>
  )

const AuthDemo = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)

  const isAuthenticated = !!user

  const signIn = () => dispatch(actions.login())
  const signOut = () => dispatch(actions.logout())

  return (
    <Paper className={cx(classes.authDemo, classes.clientResponse)}>
      <Card className={classes.card}>
        <div className={classes.row}>
          <div className={classes.textField}>
            auth demo
          </div>
          <AuthStateTextField
            className={cx(classes.textField, classes.flushRight)}
            isAuthenticated={isAuthenticated} />
        </div>
        <div className={classes.row}>
          <div className={classes.flushRight}>
            <SignButton isAuthenticated={isAuthenticated} signIn={signIn} signOut={signOut} />
          </div>
        </div>
        <pre style={{fontFamily: 'mono'}}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </Card>
    </Paper>
  )
}

export default AuthDemo
