import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { actions, selectors } from '../store'
import { FriendsStateContext } from '../store/stateProviders/toggleFriend'

const FriendsList = () => {
  const { acceptFriendReq, declineFriendReq, count } = useContext(
    FriendsStateContext
  )
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)

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
  }, [user, acceptFriendReq, declineFriendReq, count])

  return null
}

export default FriendsList
