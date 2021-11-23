import React, { useState, useEffect, useContext } from 'react';
import { FriendsStateContext } from '../../store/stateProviders/toggleFriend';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@material-ui/core';
import axios from 'axios';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { actions, selectors } from '../../store';
import { colors } from '../../styling';
import PlusMinusBtn from './PlusMinusBtn';
import Square from '../Square';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  channelTile: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    minHeight: 0,
    minWidth: 0,
    userSelect: 'none',
    marginBottom: '2.5%',
    [theme.breakpoints.down('sm')]: {
      width: '33%',
    },
  },
  image: {
    borderRadius: '50%',
    maxHeight: '100%',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    border: `5px solid ${colors.white80}`,
    [theme.breakpoints.up('md')]: {
      height: '200px',
      width: '200px',
    },
  },
  imageSquare: {
    width: '80%',
    position: 'relative',
  },
  plusMinusButton: {
    background: colors.lightGray,
    bottom: '0.25em',
    position: 'absolute',
    right: '0.25em',
    zIndex: 3,
  },
  text: {
    color: colors.white80,
    fontSize: '75%',
    fontWeight: theme.typography.weight.bold,
    height: '100%',
    textOverflow: 'ellipsis',
    width: '100%',
    display: 'inline-flex',
  },
  textBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    minHeight: '15%',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingLeft: '0.25em',
    paddingRight: '0.25em',
  },
  ldCreatorImg: {
    position: 'absolute',
    width: '30%',
    objectFit: 'cover',
    top: 0,
    right: '10px',
  },
  addFriend: {
    marginRight: '10%',
    width: '10%',
    height: '25px',
    background: colors.blue,
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
  },
  modalWrapper: {
    position: 'absolute',
    width: 520,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.darkGray,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: 'white',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    borderRadius: '5px',
    height: 250,
  },
  createBtn: {
    background: colors.blue,
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
  },
}));

const CreatorTile = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const gotoThisCreator = () =>
    dispatch(actions.pushHistory(`/profile/${user.userId}`));
  const currentUser = useSelector(selectors.getUser);
  const [open, setOpen] = useState(false);
  const friendsList = useSelector(selectors.getFriendsList);
  const [profileCreated, setProfileCreated] = useState(false);
  const [alreadyFriends, setAlreadyFriends] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [sentRequest, setSentRequest] = useState(false);
  const userProfile = useSelector(selectors.getUserData);
  const [sent, setSent] = useState(false);
  const { sendRequest } = useContext(FriendsStateContext);

  const sendReq = () => {
    if (!currentUser) {
      dispatch(actions.login());
    } else if (currentUser && profileCreated === false) {
      setOpen(true);
    } else {
      sendRequest(user.userId);
      setSent(true);
    }
  };

  useEffect(() => {
    if (userProfile) {
      setProfileCreated(true);
    }
  }, [userProfile]);

  useEffect(() => {
    friendsList?.sent?.map((friend) => {
      if (friend.friend.id === user.userId) {
        setSentRequest(true);
      } else {
        return;
      }
    });

    friendsList?.recieved?.map((friend) => {
      if (friend.friend.id === user.userId) {
        setRequestPending(true);
      } else {
        return;
      }
    });

    friendsList?.accepted?.map((friend) => {
      if (friend.friend.id === user.userId) {
        setAlreadyFriends(true);
      } else {
        return;
      }
    });
  }, [friendsList]);

  return (
    <div className={classes.channelTile}>
      <Square className={classes.imageSquare}>
        {user?.leagueDayCreator === 'true' && (
          <img
            className={classes.ldCreatorImg}
            src="/img/LDcreator.png"
            alt="LD creator badge"
          />
        )}
        <img
          className={classes.image}
          src={user.image}
          onClick={gotoThisCreator}
        />
        <PlusMinusBtn
          size="20%"
          className={classes.plusMinusButton}
          userId={user.userId}
          creator={user}
        />
      </Square>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.modalWrapper}>
          <h4>Create a LeagueDay profile to send friend requests!</h4>

          <button
          variant="contained"
            className={classes.createBtn}
            onClick={() => dispatch(actions.pushHistory('/create'))}
          >
            Create Profile
          </button>
        </div>
      </Modal>
      <div className={classes.textBox}>
        <div className={classes.text}>{user.username}</div>
        {currentUser && (
          <button
          variant="contained"
            className={classes.addFriend}
            onClick={sendReq}
            disabled={alreadyFriends || requestPending || sentRequest}
          >
            {sent ? <CheckIcon /> : <PersonAddIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreatorTile;
