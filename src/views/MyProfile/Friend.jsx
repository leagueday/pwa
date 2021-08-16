import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { actions } from '../../store'

const Friend = ({ friend, classes }) => {
  const dispatch = useDispatch()
  const [declined, setDeclined] = useState(false)

  const declineFriendReq = id => {
    axios
      .post('https://leagueday-api.herokuapp.com/friends/decline', {
        id,
      })
      .then(res => {
        setDeclined(true)
        console.log('declined friend ', res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className={classes.friendList}>
      <div className={classes.friendImgCont}>
        <img src={friend.friend.image} alt="" className={classes.friendImg} />
      </div>
      <p className={classes.friendName}>{friend.friend.name}</p>
      <div className={classes.friendBtnCont}>
        {!declined ? (
          <>
            <Button
              className={classes.chatBtn}
              onClick={() => dispatch(actions.pushHistory('/chat'))}
            >
              Chat
            </Button>
            <Button
              className={classes.deleteBtn}
              onClick={() => declineFriendReq(friend.id)}
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

export default Friend;