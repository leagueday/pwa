import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {actions, selectors} from '../store'
import {makeRequestHeaders} from '../api/util'

const VIEW_QUERY_ENDPOINT = `/.netlify/functions/fauna-view-query`

const fetchUserData = bearerToken => fetch(
    VIEW_QUERY_ENDPOINT,
    {
      headers: makeRequestHeaders(bearerToken)
    }
  ).then(
    res => res.headers.get('Content-Type') === 'application/json' ? res.json() : res.text()
  ).catch(
    err => {
      if (NODE_ENV === 'development')
        console.error('user data request error', err)
      return err.message
    }
  )

const UserData = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)

  React.useEffect(
    () => {
      fetchUserData(user?.token?.access_token).then(
        maybeData => {
          if (NODE_ENV === 'development') console.log('user data', maybeData)
          if (typeof(maybeData) === 'object') {
            dispatch(actions.setUserData(maybeData))
          }
        }
      )
    },
    [user]
  )

  return null
}

export default UserData
