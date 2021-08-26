import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actions, selectors } from '../store'

const UserData = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)
  const baseId = 'appXoertP1WJjd4TQ'

  React.useEffect(() => {
    let fetchSearch
    if (user) {
      const userId = user['id']
      fetchSearch = `?filterByFormula=({userId}=${JSON.stringify(userId)})`
    }
    fetch('/.netlify/functions/airtable-getprofile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `${baseId}/UserProfile${fetchSearch}` }),
    })
      .then(response => response.json())
      .then(function (response) {
        dispatch(actions.setUserData(response.records[0]))
      })
      .catch(error => {
        console.log('error while data fetching', error)
      })
  }, [user])

  return null
}

export default UserData
