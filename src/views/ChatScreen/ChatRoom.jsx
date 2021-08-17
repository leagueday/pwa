import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { selectors } from '../../store'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { colors } from '../../styling'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import SocketIOClient from 'socket.io-client'

const mockChats = [
  {
    authorId: 'a6283fa7-7405-4d72-aaab-3f84e630845d',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/m8Pic.jpeg',
  },
  {
    authorId: 'b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/nick1.jpg',
  },
  {
    authorId: 'b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/nick1.jpg',
  },
  {
    authorId: 'b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/nick1.jpg',
  },
  {
    authorId: 'b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/nick1.jpg',
  },
  {
    authorId: 'b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/nick1.jpg',
  },
  {
    authorId: 'a6283fa7-7405-4d72-aaab-3f84e630845d',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/m8Pic.jpeg',
  },
  {
    authorId: 'a6283fa7-7405-4d72-aaab-3f84e630845d',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/m8Pic.jpeg',
  },
  {
    authorId: 'a6283fa7-7405-4d72-aaab-3f84e630845d',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/m8Pic.jpeg',
  },
  {
    authorId: 'a6283fa7-7405-4d72-aaab-3f84e630845d',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/m8Pic.jpeg',
  },
  {
    authorId: 'a6283fa7-7405-4d72-aaab-3f84e630845d',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/m8Pic.jpeg',
  },
  {
    authorId: 'b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/nick1.jpg',
  },
  {
    authorId: 'a6283fa7-7405-4d72-aaab-3f84e630845d',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/m8Pic.jpeg',
  },
  {
    authorId: 'b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/nick1.jpg',
  },
  {
    authorId: 'a6283fa7-7405-4d72-aaab-3f84e630845d',
    _id: 'ObjectId(611a8fb892caa000159c4053)',
    roomId:
      'a6283fa7-7405-4d72-aaab-3f84e630845d-b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    message: 'test message',
    image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/m8Pic.jpeg',
  },
]

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
    marginBottom: '10%',
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
  chatRoom: {
    height: '85%',
    marginTop: '5%',
    overflow: 'scroll',
  },
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
    marginRight: '2%',
    borderRadius: '70px',
    background: colors.blue,
    padding: '.5%',
  },
  text: {
    marginLeft: '2%',
    borderRadius: '70px',
    background: colors.white80,
    padding: '.5%',
  },
  chatImg: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  recipient: {
    height: '100%',
  },
}))

const ChatRoom = ({ friend }) => {
  const user = useSelector(selectors.getUser)
  const roomId = [friend?.id, user?.id]
    .sort((a, b) => (a > b ? 1 : -1))
    .join('-')

  const socket = SocketIOClient('https://leagueday-api.herokuapp.com', {
    query: {
      roomId,
    },
  })

  const classes = useStyles()
  const [message, setMessage] = useState('')
  const [userData, setUserData] = useState({})
  const [allChats, setAllChats] = useState([])

  const getProfileData = () => {
    const baseId = 'appXoertP1WJjd4TQ'
    let fetchSearch
    if (user) {
      const userId = user['id']
      fetchSearch = `?filterByFormula=({userId}=${JSON.stringify(userId)})`
    }
    fetch('/.netlify/functions/airtable-getprofile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `${baseId}/UserProfile${fetchSearch}` }),
    })
      .then(response => response.json())
      .then(function (response) {
        setUserData(response.records[0])
      })
      .catch(error => {
        console.log('error while data fetching', error)
      })
  }

  const sendChat = () => {
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
        console.log('sent message ', res)
        socket.emit('new_chat', { message })
        setMessage('')
      })
      .catch(err => {
        console.log('message send error ', err)
      })
  }

  const getMessages = () => {
    axios
      .post('https://leagueday-api.herokuapp.com/chats/list', {
        roomId: [friend?.id, user?.id]
          ?.sort((a, b) => (a > b ? 1 : -1))
          ?.join('-'),
      })
      .then(res => {
        setAllChats(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  socket.on('new_chat', () => {
    console.log('triggered new chat ')
    getMessages()
  })

  useEffect(() => {
    socket.on('connection', () => {
      console.log('hello ', socket.id)
    })
    getProfileData()
    getMessages()
  }, [user, friend])

  return (
    <div className={classes.chatBox}>
      {!!friend ? (
        <div className={classes.recipient}>
          <div className={classes.reciever}>
            <img src={friend.image} alt="" className={classes.friendImg} />
            <h3>{friend.name}</h3>
            <GroupAddIcon className={classes.addIcon} />
          </div>
          <div className={classes.chatRoom}>
            {allChats?.map((chat, ind) => (
              <div
                className={
                  chat?.authorId === user?.id ? classes.Uchat : classes.chat
                }
                key={ind}
              >
                <img className={classes.chatImg} src={chat?.authorImg} alt="" />
                <p
                  className={
                    chat?.authorId === user?.id ? classes.uText : classes.text
                  }
                >
                  {chat?.message}
                </p>
              </div>
            ))}
          </div>
          <input
            type="text"
            className={classes.message}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            className={classes.sendIcon}
            size={'2x'}
            onClick={sendChat}
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
