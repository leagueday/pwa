import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actions, selectors } from '../store'
import fetchUserData from '../api/fetchUserData'

const UserData = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)

  React.useEffect(() => {
    fetchUserData(user?.token?.access_token).then(maybeData => {
      if (NODE_ENV === 'development') 
      if (typeof maybeData === 'object') {
        dispatch(actions.setUserData(maybeData))
      }
    })
  }, [user])

  return null
}

export default UserData
