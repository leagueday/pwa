import React, { useState, useContext } from 'react'
import { FriendsStateContext } from '../../store/stateProviders/toggleFriend'
import { Button } from '@material-ui/core'
import axios from 'axios'
import { makeStyles } from '@material-ui/core'
import { colors } from '../../styling'

const useStyles = makeStyles(theme => ({
  friendReqImgCont: {
    width: '25%',
    display: 'flex',
    alignItems: 'center',
  },
  friendReqBtnCont: {
    width: '50%',
  },
  friendReqNameCont: {
    width: '25%',
  },
  friendReqReqList: {
    display: 'block',
    width: '100%',
  },
  friendReqImg: {
    width: '70px',
    margin: 'auto',
    borderRadius: '50%',
    height: '70px',
    objectFit: 'cover',
  },
  deleteBtn: {
    width: '150px',
    background: 'transparent',
    border: '1px solid red',
    color: 'red',
    '&:hover': {
      transition: 'all .2s ease-in-out',
      backgroundColor: 'red',
      color: 'white',
    },
    [theme.breakpoints.down('md')]: {
      width: '25%',
      fontSize: '80%',
    },
  },
  accepted: {
    cursor: 'not-allowed',
    width: '300px',
    background: colors.blue,
    '&:hover': {
      background: colors.blue,
    },
  },
  declined: {
    cursor: 'not-allowed',
    width: '300px',
    background: 'red',
    '&:hover': {
      background: 'red',
    },
  },
  editProfile: {
    width: '150px',
    background: colors.blue,
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    [theme.breakpoints.down('md')]: {
      width: '25%',
      fontSize: '80%',
    },
  },
}))

const FriendRequest = ({ friend }) => {
  const [accepted, setAccepted] = useState(false)
  const [declined, setDeclined] = useState(false)
  const classes = useStyles()
  const { declineFriendReq, acceptFriendReq } = useContext(FriendsStateContext)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-evenly',
      }}
    >
      <div className={classes.friendReqImgCont}>
        <img
          src={friend?.friend?.image}
          alt=""
          className={classes.friendReqImg}
        />
      </div>

      <p className={classes.friendReqNameCont}>{friend?.friend?.username}</p>
      <div
        style={{
          width: '70%',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        {accepted ? (
          <Button className={classes.accepted}>Accepted!</Button>
        ) : declined ? (
          <Button className={classes.declined}>declined</Button>
        ) : (
          <>
            <Button
              className={classes.editProfile}
              onClick={() => {
                setAccepted(true)
                acceptFriendReq(friend.id)
              }}
            >
              Accept
            </Button>
            <Button
              className={classes.deleteBtn}
              onClick={() => {
                setDeclined(true)
                declineFriendReq(friend.id)
              }}
            >
              Decline
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default FriendRequest
