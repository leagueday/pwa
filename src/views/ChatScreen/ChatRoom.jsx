import React, { useEffect, useRef, useContext, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { TextField } from '@material-ui/core'
import { selectors } from '../../store'
import { ChatStateContext } from '../../store/stateProviders/useChat'
import { FriendsStateContext } from '../../store/stateProviders/toggleFriend'
import { useSelector } from 'react-redux'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import axios from 'axios'
import { addScrollStyle } from '../util'
import { colors } from '../../styling'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

const useStyles = makeStyles(theme => ({
  chatBox: {
    position: 'relative',
    background: colors.darkerGray,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    marginLeft: '2px',
    background: 'black',
    outline: `0.5px solid ${colors.darkGray}`,
  },
  message: {
    position: 'absolute',
    bottom: 15,
    width: '80%',
    left: '45%',
    transform: 'translateX(-50%)',
    padding: 15,
    color: 'white',
  },
  reciever: {
    background: 'black',
    height: '7%',
    minHeight: '60px',
    width: '100%',
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
    bottom: 25,
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
  chatRoom: ({ primaryColor = colors.blue }) =>
    addScrollStyle(
      primaryColor,
      theme
    )({
      height: '82%',
      marginBottom: '3%',
      overflow: 'scroll',
      overflowX: 'hidden',
    }),
  chat: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'black',
  },
  Uchat: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    color: 'black',
  },
  uText: {
    maxWidth: '50%',
    marginRight: '2%',
    borderRadius: '10px',
    background: colors.blue,
    padding: '1%',
  },
  text: {
    maxWidth: '50%',
    marginLeft: '2%',
    borderRadius: '10px',
    background: colors.white80,
    padding: '1%',
  },
  chatImg: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  recipient: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}))

const ChatRoom = ({ socket, roomId, setChatExpanded, xs }) => {
  const user = useSelector(selectors.getUser)
  const { selectedFriend, setSelectedFriend } = useContext(FriendsStateContext)
  const { message, setMessage, allChatsByRoom, getMessagesByRoom } = useContext(
    ChatStateContext
  )
  const roomIdRef = useRef(roomId)
  const userData = useSelector(selectors.getUserData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    socket?.on('new_chat', () => {
      console.log('triggered new chat ')
      getMessagesByRoom(roomIdRef.current)
    })

    return () => {
      socket?.off('new_chat', () => {
        getMessagesByRoom(roomIdRef.current)
      })
    }
  }, [socket])

  const classes = useStyles()

  const messageEl = useRef(null)

  const scrollToBottom = () => {
    messageEl?.current?.scrollIntoView({ behavior: 'auto' })
  }

  useEffect(scrollToBottom, [allChatsByRoom])

  const sendChat = e => {
    e.preventDefault()
    axios
      .post('https://leagueday-api.herokuapp.com/chats/create', {
        userId: user.id,
        roomId: roomId,
        message: message,
        image: userData?.fields?.image
          ? userData?.fields?.image
          : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues=',
      })
      .then(res => {
        socket.emit('new_chat', { message })
        setMessage('')
        console.log('sent message ', res)
      })
      .catch(err => {
        console.log('message send error ', err)
      })
  }

  const listener = event => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      sendChat()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  useEffect(async () => {
    setLoading(true)
    await getMessagesByRoom(roomId)
    setLoading(false)
    roomIdRef.current = roomId
  }, [user, selectedFriend])

  return (
    <div className={classes.chatBox}>
      {!!selectedFriend ? (
        <div className={classes.recipient}>
          <div className={classes.reciever}>
            {xs && (
              <p
                onClick={() => {
                  setSelectedFriend()
                  setChatExpanded(false)
                }}
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 10,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '.85rem',
                }}
              >
                <ArrowBackIosIcon color={colors.blue} fontSize="medium" /> 
              </p>
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: 'auto',
              }}
            >
              {!xs && (
                <img
                  src={
                    selectedFriend.image
                      ? selectedFriend.image
                      : '/img/profilePic.jpeg'
                  }
                  alt=""
                  className={classes.friendImg}
                />
              )}
              <h3 style={{ marginLeft: 10, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>{selectedFriend.username}</h3>
            </div>
          </div>
          <div className={classes.chatRoom}>
            {loading ? (
              <h3>Loading...</h3>
            ) : (
              allChatsByRoom?.map((chat, ind) => (
                <div
                  className={
                    chat?.authorId === user?.id ? classes.Uchat : classes.chat
                  }
                  key={ind}
                >
                  <img
                    className={classes.chatImg}
                    src={chat?.authorImg}
                    alt=""
                  />
                  <p
                    className={
                      chat?.authorId === user?.id ? classes.uText : classes.text
                    }
                  >
                    {chat?.message}
                  </p>
                </div>
              ))
            )}
            <div ref={messageEl} />
          </div>
          <div style={{ height: '8%', background: 'black' }}>
            <form onSubmit={sendChat}>
              <TextField
                placeholder="Enter Message"
                type="text"
                className={classes.message}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={listener}
                onSubmit={listener}
              />
              <button
                type="submit"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                }}
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className={classes.sendIcon}
                  size={'2x'}
                  onClick={sendChat}
                />
              </button>
            </form>
          </div>
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
