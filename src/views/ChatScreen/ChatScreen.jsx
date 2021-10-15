import React, { useState, useEffect, useContext } from 'react'
import BasicLayout from '../BasicLayout'
import { FriendsStateContext } from '../../store/stateProviders/toggleFriend'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { ChatStateContext } from '../../store/stateProviders/useChat'
import Friend from './Friend'
import { useSelector } from 'react-redux'
import { selectors, actions } from '../../store'
import SocketIOClient from 'socket.io-client'
import axios from 'axios'
import { makeStyles } from '@material-ui/styles'
import { colors } from '../../styling'
import ChatRoom from './ChatRoom'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    marginTop: '2px',
    marginLeft: '2px',
    height: '100%',
    padding: 0,
  },
  friendsList: ({ chatExpanded }) => ({
    padding: 0,
    width: '20%',
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    outline: `0.5px solid ${colors.darkGray}`,
    transition: 'width 0.2s ease-in-out',
    [theme.breakpoints.up('lg')]: {
      minWidth: '280px',
    },
    [theme.breakpoints.only('md')]: {
      minWidth: '220px',
    },
  }),
  friend: {
    cursor: 'pointer',
    height: '60px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `0.5px solid ${colors.darkGray}`,
    padding: '0 15%',
    borderRight: `2px solid ${colors.blue}`,
    '&:hover': {
      borderRight: `4px solid ${theme.palette.primary.active}`,
      filter: 'brightness(110%)',
      background: '#111',
    },
    [theme.breakpoints.down('xs')]: {
      p: {
        display: 'none',
      },
    },
  },
  selectedFriend: {
    cursor: 'pointer',
    height: '6%',
    minHeight: '45px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `0.5px solid ${colors.darkGray}`,
    padding: '0 15%',
    borderRight: `2px solid ${colors.blue}`,
    borderRight: `4px solid ${theme.palette.primary.active}`,
    filter: 'brightness(110%)',
    background: '#111',
  },
  friendImg: {
    borderRadius: '50%',
    height: '40px',
    width: '40px',
    objectFit: 'cover',
  },
  chatBox: {
    position: 'relative',
    background: colors.darkerGray,
    width: '100%',
    height: '100%',
    marginLeft: '2px',
    background: 'black',
  },
  message: {
    width: '80%',
    minHeight: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    border: 'none',
    outline: 'none',
    borderRadius: '70px',
    padding: 15,
  },
  friendName: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}))

const ChatScreen = () => {
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('xs'))
  const [chatExpanded, setChatExpanded] = useState(false)
  const classes = useStyles({ chatExpanded })
  const friendList = useSelector(selectors.getFriendsList)
  const user = useSelector(selectors.getUser)
  const { newChats, getAllMessages } = useContext(ChatStateContext)
  const { selectedFriend, setSelectedFriend } = useContext(FriendsStateContext)

  const roomId = [selectedFriend?.id, user?.id]
    .sort((a, b) => (a > b ? 1 : -1))
    .join('-')

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = SocketIOClient('https://leagueday-api.herokuapp.com', {
      query: roomId,
    })
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  useEffect(() => {
    if (selectedFriend) {
      setChatExpanded(true)
    } else {
      setChatExpanded(false)
    }
  }, [selectedFriend])

  return (
    <BasicLayout>
      <div className={classes.wrapper}>
        <div
          className={classes.friendsList}
          style={{
            width: chatExpanded && xs ? '0px' : !chatExpanded && xs && '100%',
            opacity: chatExpanded && xs ? 0 : !chatExpanded && xs && 1,
          }}
        >
          <div
            style={{
              outline: `0.5px solid ${colors.darkGray}`,
              height: '7%',
              margin: 0,
              padding: 0,
              minHeight: '60px',
            }}
          >
            <h3 style={{ textAlign: 'center' }}>Messages</h3>
          </div>
          {friendList?.accepted?.map((item, key) => (
            <Friend
              friend={item}
              key={key}
              newChats={newChats}
              classes={classes}
            />
          ))}
        </div>
        {!xs ? (
          <ChatRoom
            xs={xs}
            setChatExpanded={setChatExpanded}
            selectedFriend={selectedFriend}
            roomId={roomId}
            socket={socket}
          />
        ) : (
          xs &&
          chatExpanded && (
            <ChatRoom
              xs={xs}
              setChatExpanded={setChatExpanded}
              selectedFriend={selectedFriend}
              roomId={roomId}
              socket={socket}
            />
          )
        )}
      </div>
    </BasicLayout>
  )
}

export default ChatScreen
