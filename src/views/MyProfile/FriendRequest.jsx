import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import axios from 'axios'

const FriendRequest = ({ friend, classes }) => {
  const [accepted, setAccepted] = useState(false)
  const [declined, setDeclined] = useState(false)

  const acceptFriendReq = id => {
    axios
      .post('https://leagueday-api.herokuapp.com/friends/accept', {
        id,
      })
      .then(res => {
        setAccepted(true)
        console.log('accepted friend ', res)
      })
      .catch(err => {
        console.log(err)
      })
  }

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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <img src={friend?.friend?.image} alt="" className={classes.friendImg} />
        <p>{friend?.friend?.name}</p>
        {accepted ? (
          <Button className={classes.accepted}>Accepted!</Button>
        ) : declined ? (
          <Button className={classes.declined}>declined</Button>
        ) : (
          <>
            <Button
              className={classes.editProfile}
              onClick={() => acceptFriendReq(friend.id)}
            >
              Accept
            </Button>
            <Button
              className={classes.deleteBtn}
              onClick={() => declineFriendReq(friend.id)}
            >
              Decline
            </Button>
          </>
        )}
      </div>
  )
}

export default FriendRequest;
