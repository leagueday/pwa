import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { actions, selectors } from '../store'

const FriendsList = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)
    console.log('called')
  useEffect(() => {
    axios
      .post('https://leagueday-api.herokuapp.com/friends/list', {
        userId: user?.id,
      })
      .then(res => {
        dispatch(actions.setFriendsList(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }, [user])

  return null
}

export default FriendsList
