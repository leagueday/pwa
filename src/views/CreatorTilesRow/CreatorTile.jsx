import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '@material-ui/core'
import axios from 'axios'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { actions, selectors } from '../../store'
import { colors } from '../../styling'
import PlusMinusBtn from './PlusMinusBtn'
import Square from '../Square'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const useStyles = makeStyles(theme => ({
  channelTile: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    width: '16%',
    minHeight: 0,
    minWidth: 0,
    userSelect: 'none',
    marginBottom: '2.5%',
    [theme.breakpoints.down('sm')]: {
      width: '33%',
    },
  },
  image: {
    border: `0.25em solid ${colors.white80}`,
    borderRadius: '50%',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.only('xs')]: {
      border: `0.5vw solid ${colors.white80}`,
    },
  },
  imageSquare: {
    width: '80%',
    position: 'relative',
  },
  plusMinusButton: {
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
    right: 0,
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
}))

const CreatorTile = ({ user }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const gotoThisCreator = () =>
    dispatch(actions.pushHistory(`/profile/${user.userId}`))
  const currentUser = useSelector(selectors.getUser)
  const [open, setOpen] = useState(false)
  const [profileCreated, setProfileCreated] = useState(false)

  const handleProfileStatus = async () => {
    const baseId = 'appXoertP1WJjd4TQ'
    let fetchSearch
    if (currentUser) {
      const userId = currentUser['id']
      fetchSearch = `?filterByFormula=({userId}=${JSON.stringify(userId)})`
    }
    await fetch('/.netlify/functions/airtable-getprofile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `${baseId}/UserProfile${fetchSearch}` }),
    })
      .then(response => response.json())
      .then(function (response) {
        if (response.records.length > 0) {
          setProfileCreated(true)
          localStorage.setItem(
            'profilecreated',
            response.records[0].fields.profileCreated
          )
        } else {
          setProfileCreated(false)
        }
      })
      .catch(error => {
        console.log('error while data fetching', error)
      })
  }

  const sendRequest = () => {
    if (!currentUser) {
      dispatch(actions.login())
    } else if (currentUser && profileCreated === false) {
      setOpen(true)
    } else {
      axios
        .post('http://localhost:3000/friends/invite', {
          userId: currentUser.id,
          friendId: user.userId,
        })
        .then(res => {
          console.log('invited friend ', res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    handleProfileStatus()
  }, [])

  useEffect(() => {
    handleProfileStatus()
  }, [currentUser])

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
          size="25%"
          className={classes.plusMinusButton}
          userId={user.userId}
          creator={user}
        />
      </Square>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.modalWrapper}>
          <h4>Create a LeagueDay profile to send friend requests!</h4>

          <Button
            className={classes.createBtn}
            onClick={() => dispatch(actions.pushHistory('/create'))}
          >
            Create Profile
          </Button>
        </div>
      </Modal>
      <div className={classes.textBox}>
        <div className={classes.text}>{user.name}</div>
        <Button className={classes.addFriend} onClick={sendRequest}>
          <PersonAddIcon />
        </Button>
      </div>
    </div>
  )
}

export default CreatorTile
