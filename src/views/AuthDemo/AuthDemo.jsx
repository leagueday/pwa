// tbd - remove

import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'

import {actions, selectors} from '../../store'

const VIEW_QUERY_ENDPOINT = `/.netlify/functions/fauna-view-query`

const makeRequestHeaders = bearerToken => bearerToken ? {
  authorization: `Bearer ${bearerToken}`,
} : { }

const fetchUserData = (bearerToken, setData, setError, reset) => {
  return Promise.resolve(
    reset()
  ).then(
    () => fetch(
      VIEW_QUERY_ENDPOINT,
      {
        headers: makeRequestHeaders(bearerToken)
      }
    )
  ).then(
    res => res.headers.get('Content-Type') === 'application/json' ? res.json() : res.text()
  ).then(
    json => {
      if (json.error) {
        setError(json)
      } else {
        setData(json)
      }
    }
  ).catch(
    err => {
      console.error('user request error', err)
      setError(err.message)
    }
  )
}

const deleteUserData = (bearerToken, setQueryResult, signOut) => {
  const params = new URLSearchParams({
    doDelete: true,
  })

  return fetch(
    `${VIEW_QUERY_ENDPOINT}?${params}`,
    {
      headers: makeRequestHeaders(bearerToken)
    }
  ).then(
    () => {
      setQueryResult('deleted')
      signOut()
    }
  ).catch(
    () => {
      setQueryResult(null)
    }
  )
}

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
    marginRight: '1em',
    '&:last-child': {
      marginRight: 0,
    },
  },
  cardRow: {
    paddingTop: '0.25em',
  },
  centeredRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
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
      width: '75%',
    },
    [theme.breakpoints.up('lg')]: {
      margin: '4em',
      width: '65%',
    },
    [theme.breakpoints.only('xl')]: {
      margin: '5em',
      width: '60%',
    },
  },
  dump: {
    fontFamily: theme.typography.family.secondary,
    fontSize: '85%',
  },
  flushRight: {
    marginLeft: 'auto',
  },
  queryError: {
    color: 'darkred',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  textField: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))

const SignButton = ({isAuthenticated, signIn, signOut}) => (
    <Button color="primary" onClick={isAuthenticated ? signOut : signIn} variant="contained">
      {isAuthenticated ? 'Sign Out' : 'Sign In'}
    </Button>
  )

const QueryButton = ({onClick, disabled}) => (
  <Button color={disabled ? 'secondary' : 'primary'} onClick={onClick} variant="contained">
    {disabled ? 'Query DB (hacker)' : 'Query DB'}
  </Button>
)

const DeleteButton = ({onClick, disabled}) => (
  <Button color="primary" onClick={onClick} disabled={disabled} variant="contained">
    Delete User Data
  </Button>
)

const AuthDemo = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)

  const isAuthenticated = !!user

  const bearerToken = user?.token?.access_token
  const queryShouldBeDisabled = !bearerToken
  const [queryResult, setQueryResult] = React.useState(null)
  const [queryError, setQueryError] = React.useState(null)
  console.log('bearerToken', bearerToken)
  const hasUserData = queryResult && typeof(queryResult) === 'object' && !queryResult.error

  // tbd move to Redux
  const clearEphemeralUserData = () => {
    setQueryResult(null)
    setQueryError(null)
  }

  const signIn = () => dispatch(actions.login())
  const signOut = () => {
    clearEphemeralUserData()
    dispatch(actions.logout())
  }

  const queryOnclick = () => fetchUserData(bearerToken, setQueryResult, setQueryError, clearEphemeralUserData)
  const deleteOnclick = () => deleteUserData(bearerToken, setQueryResult, signOut)

  React.useEffect(
    () => {
      if (bearerToken && !hasUserData) {
        console.log('useEffect query')
        queryOnclick()
      }
    },
    [bearerToken, hasUserData]
  )

  return (
    <Paper className={cx(classes.authDemo, classes.row, classes.clientResponse)}>
      <Card className={classes.card}>
        <div className={classes.centeredRow}>
          <div className={classes.textField}>
            auth demo
          </div>
          <div className={classes.flushRight}>
            <SignButton isAuthenticated={isAuthenticated} signIn={signIn} signOut={signOut} />
          </div>
        </div>
        <div className={classes.dump}>
          <pre>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </Card>
      <Card className={classes.card}>
        <div className={classes.centeredRow}>
          <div className={classes.textField}>
            db query demo
          </div>
          <div className={classes.flushRight}>
            <QueryButton onClick={queryOnclick} disabled={queryShouldBeDisabled} />
          </div>
        </div>
        <div className={cx(classes.centeredRow, classes.cardRow)}>
          <div className={classes.flushRight}>
            <DeleteButton onClick={deleteOnclick} disabled={!hasUserData} />
          </div>
        </div>
        <div className={cx(classes.dump, queryError ? classes.queryError : null)}>
          <pre>
            {
              queryError ? JSON.stringify(queryError, null, 2)
                : queryResult ? JSON.stringify(queryResult, null, 2)
                : '(nothing to show)'
            }
          </pre>
        </div>
      </Card>
    </Paper>
  )
}

export default AuthDemo
