import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { colors } from '../../styling'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import { io } from 'socket.io-client'

const socket = io('https://localhost:3000')

const useStyles = makeStyles(theme => ({
  chatBox: {
    position: 'relative',
    background: colors.darkerGray,
    width: '100%',
    height: '100%',
    marginLeft: '2px',
    background: 'black',
    outline: `0.5px solid ${colors.darkGray}`,
  },
  message: {
    position: 'absolute',
    bottom: 15,
    width: '70%',
    left: '50%',
    transform: 'translateX(-50%)',
    border: 'none',
    outline: 'none',
    borderRadius: '70px',
    padding: 15,
    background: colors.lightGray,
    color: 'white',
  },
  reciever: {
    position: 'absolute',
    height: '7%',
    width: '100%',
    top: 0,
    borderBottom: `0.5px solid ${colors.darkGray}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendImg: {
    borderRadius: '50%',
    height: '80%',
    height: '60px',
    width: '60px',
    objectFit: 'cover',
    marginRight: '1%',
  },
  sendIcon: {
    position: 'absolute',
    bottom: 15,
    right: '10%',
    cursor: 'pointer',
    color: colors.blue,
    '&:hover': {
      color: theme.palette.primary.active,
    },
  },
  addIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
    color: colors.blue,
    '&:hover': {
      color: theme.palette.primary.active,
    },
    fontSize: '32px',
    cursor: 'pointer',
  },
}))

const ChatRoom = ({ friend }) => {
  const classes = useStyles()
  const [message, setMessage] = useState('')

  useEffect(() => {
    socket.emit('new_chat', 'first message')
  }, [])

  return (
    <div className={classes.chatBox}>
      {!!friend ? (
        <div className={classes.recipient}>
          <div className={classes.reciever}>
            <img src={friend.image} alt="" className={classes.friendImg} />
            <h3>{friend.name}</h3>
            <GroupAddIcon className={classes.addIcon} />
          </div>

          <input type="text" className={classes.message} onChange={(e) => setMessage(e.target.value)}/>
          <FontAwesomeIcon
            icon={faPaperPlane}
            className={classes.sendIcon}
            size={'2x'}
          />
        </div>
      ) : (
        <h1
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Select friend to message
        </h1>
      )}
    </div>
  )
}

export default ChatRoom
