import React, { useState } from 'react'
import BasicLayout from '../BasicLayout'
import { mockFriends } from '../MyProfile/MyProfile'
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
  friendsList: {
    padding: 0,
    width: '20%',
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    outline: `0.5px solid ${colors.darkGray}`,
  },
  friend: {
    cursor: 'pointer',
    height: '6%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `0.5px solid ${colors.darkGray}`,
    padding: '0 15%',
    borderRight: `2px solid ${colors.blue}`,
    '&:hover': {
      borderRight: `4px solid ${theme.palette.primary.active}`,
      filter: 'brightness(110%)',
      background: '#111',
    },
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
    position: 'absolute',
    bottom: 15,
    width: '80%',
    left: '50%',
    transform: 'translateX(-50%)',
    border: 'none',
    outline: 'none',
    borderRadius: '70px',
    padding: 15,
  },
}))

const ChatScreen = () => {
  const classes = useStyles()
  const [text, setText] = useState('')
  const [friend, setFriend] = useState()

  return (
    <BasicLayout>
      <div className={classes.wrapper}>
        <div className={classes.friendsList}>
          <div
            style={{
              outline: `0.5px solid ${colors.darkGray}`,
              height: '7%',
              margin: 0,
              padding: 0,
            }}
          >
            <h3 style={{ textAlign: 'center' }}>Messages</h3>
          </div>
          {mockFriends.friends.map(item => (
            <div className={classes.friend} onClick={() => setFriend(item)}>
              <img src={item.image} alt="" className={classes.friendImg} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <ChatRoom friend={friend} />
      </div>
    </BasicLayout>
  )
}

export default ChatScreen
