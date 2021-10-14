import React, { useState, useContext, useEffect } from 'react'
import { FriendsStateContext } from '../../store/stateProviders/toggleFriend'
import { Button } from '@material-ui/core'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { actions } from '../../store'

const Friend = ({ friend, classes, newChats }) => {
  const dispatch = useDispatch()
  const [declined, setDeclined] = useState(false)
  const [newMessageCount, setNewMessageCount] = useState(0)
  const {
    selectedFriend,
    setSelectedFriend,
    acceptFriendReq,
    declineFriendReq,
  } = useContext(FriendsStateContext)

  const getCount = () => {
    setNewMessageCount(
      newChats?.filter(chat => chat.authorId === friend.friend.id).length
    )
  }

  useEffect(() => {
    getCount()
  }, [newChats])

  return (
    <div className={classes.friendList}>
      <div className={classes.friendBio}>
        <div className={classes.friendImgCont}>
          <img src={friend.friend.image ? friend.friend.image : '/img/profilePic.jpeg'} alt="" className={classes.friendImg} />
        </div>
        <p className={classes.friendName}>{friend.friend.username}</p>
      </div>
      <div className={classes.friendBtnCont}>
        {!declined ? (
          <>
            <Button
              className={classes.chatBtn}
              onClick={() => {
                setSelectedFriend(friend.friend)
                dispatch(actions.pushHistory('/chat'))
              }}
            >
              Chat
              {newMessageCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    color: 'white',
                    background: 'red',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    fontSize: '16px',
                    opactity: 1,
                    left: -5,
                    top: -5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {newMessageCount}
                </span>
              )}
            </Button>
            <Button
              className={classes.deleteBtn}
              onClick={() => {
                setDeclined(true)
                declineFriendReq(friend.id)
              }}
            >
              Remove friend
            </Button>
          </>
        ) : (
          <div>
            <Button className={classes.declined}>Removed!</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Friend
