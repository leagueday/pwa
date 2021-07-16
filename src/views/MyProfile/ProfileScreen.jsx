import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectors } from '../../store'
import MyProfile from './MyProfile'
import UserProfile from './UserProfile'
import BasicLayout from '../BasicLayout'
import { UserStateContext } from '../../store/stateProviders/userState'

const ProfileScreen = ({ userId }) => {
  const user = useSelector(selectors.getUser);
  const [auth, setAuth] = useState(true);
  const { setUserId } = useContext(UserStateContext);

  useEffect(() => {
    setUserId(userId)
    if (user.id !== userId) {
      setAuth(false)
    } else {
      setAuth(true)
    }
  }, [userId]);

  return (
    <BasicLayout home>{auth ? <MyProfile /> : <UserProfile userId={userId} />}</BasicLayout>
  )
}

export default ProfileScreen
