import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import { actions } from '../../store'
import { colors } from '../../styling'
import PlusMinusBtn from './PlusMinusBtn'
import Square from '../Square'

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
    height: '70%',
    width: '10%',
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
      <div className={classes.textBox} onClick={gotoThisCreator}>
        <div className={classes.text}>{user.name}</div>
        <Button className={classes.addFriend}>
          <PersonIcon /> +
        </Button>
      </div>
    </div>
  )
}

export default CreatorTile
