import React, { useState, useEffect, useContext, useMemo } from 'react'
import { FriendsStateContext } from '../../store/stateProviders/toggleFriend'
import { ChatStateContext } from '../../store/stateProviders/useChat'
import axios from 'axios'

const Friend = ({ friend, classes }) => {
  const [newMessageCount, setNewMessageCount] = useState([])
  const [newMessageIds, setNewMessageIds] = useState([])
  const {
    selectedFriend,
    setSelectedFriend,
    acceptFriendReq,
    declineFriendReq,
  } = useContext(FriendsStateContext)
  const { newChats, getAllMessages } = useContext(ChatStateContext)

  const getCount = () => {
    setNewMessageCount(
      newChats?.filter(chat => chat.authorId === friend.friend.id)
    )
  }

  const readMessages = () => {
    if (newMessageIds.length > 0) {
      setNewMessageCount([])
      axios
        .patch('https://leagueday-api.herokuapp.com/chats/update', {
          ids: newMessageIds,
        })
        .then(res => console.log('read messages ', res))
        .catch(err => console.log(err))
    }
  }

  useMemo(() => {
    getCount()
  }, [])

  useMemo(() => {
    if (newMessageIds.length === newMessageCount.length) {
      return
    } else {
      newMessageCount.map(ids => newMessageIds.push(ids._id))
    }
  }, [newMessageCount])

  useMemo(() => {
    if (newMessageIds.length > 0 && selectedFriend?.id === friend.friend.id) {
      axios
        .patch('https://leagueday-api.herokuapp.com/chats/update', {
          ids: newMessageIds,
        })
        .then(res => console.log('read messages ', res))
        .catch(err => console.log(err))
    }
  }, [newMessageIds, newMessageCount])

  return (
    <div
      className={
        friend?.friend?.username === selectedFriend?.username
          ? classes.selectedFriend
          : classes.friend
      }
      onClick={() => {
        setSelectedFriend(friend?.friend)
        getAllMessages()
        readMessages()
      }}
    >
      <img src={friend?.friend?.image ? friend?.friend?.image : '/img/profilePic.jpeg'} alt="" className={classes.friendImg} />
      <p>{friend?.friend?.username}</p>
      {newMessageCount.length > 0 && selectedFriend?.id !== friend.friend.id ? (
        <p
          style={{
            background: 'red',
            borderRadius: '50%',
            width: '22px',
            height: '22px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {newMessageCount.length}
        </p>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Friend
