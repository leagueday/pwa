import React, { useState, useEffect, useContext } from 'react'
import BasicLayout from '../BasicLayout'
import { FriendsStateContext } from '../../store/stateProviders/toggleFriend'
import { useSelector } from 'react-redux'
import { selectors, actions } from '../../store'
import axios from 'axios'
import { makeStyles } from '@material-ui/styles'
import { colors } from '../../styling'
import ChatRoom from './ChatRoom'

export const mockFriends = [
  {
    friend: {
      name: 'Nick',
      image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/nick1.jpg',
    },
  },
  {
    friend: {
      name: 'Sam',
      image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/nick1.jpg',
    },
  },
]

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
    minWidth: '280px',
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    outline: `0.5px solid ${colors.darkGray}`,
    [theme.breakpoints.down('md')]: {
      minWidth: '220px',
    },
  },
  friend: {
    cursor: 'pointer',
    height: '6%',
    minHeight: '45px',
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
  selectedFriend: {
    cursor: 'pointer',
    height: '6%',
    minHeight: '45px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    // position: 'absolute',
    // bottom: 15,
    width: '80%',
    minHeight: '80px',
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
  const friendList = useSelector(selectors.getFriendsList)
  const { selectedFriend, setSelectedFriend } = useContext(FriendsStateContext)
  const [friend, setFriend] = useState(selectedFriend?.friend)

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
          {friendList?.accepted?.map(item => (
            <div
              className={item?.friend?.name === friend?.name ? classes.selectedFriend : classes.friend} 
              onClick={() => setFriend(item?.friend)}
            >
              <img
                src={item?.friend?.image}
                alt=""
                className={classes.friendImg}
              />
              <p>{item?.friend?.name}</p>
            </div>
          ))}
        </div>
        <ChatRoom friend={friend} />
      </div>
    </BasicLayout>
  )
}

export default ChatScreen
