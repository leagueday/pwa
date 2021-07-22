import React from 'react'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { actions } from '../../store'
import { colors } from '../../styling'
import PlusMinusBtn from './PlusMinusBtn'
import Square from '../Square'

const useStyles = makeStyles(theme => ({
  channelTile: {
    cursor: 'pointer',
    display: 'flex',
    // flex: 1,
    flexDirection: 'column',
    // height: '100%',
    width: '16%',
    minHeight: 0,
    minWidth: 0,
    userSelect: 'none',
    marginBottom: '2.5%',
    [theme.breakpoints.down('sm')]: {
      width: '33%'
    },
  },
  image: {
    border: `0.25em solid ${colors.white80}`,
    borderRadius: '50%',
    height: '100%',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      border: `0.5vw solid ${colors.white80}`,
    },
  },
  imageSquare: {
    width: '80%',
  },
  plusMinusButton: {
    // bottom: 'calc(50% * sin(50%)) + 0.25em',
    bottom: '0.25em',
    position: 'absolute',
    // right: 'calc(50% * sin(50%)) + 0.25em',
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
    display: 'flex',
    flexDirection: 'column',
    minHeight: '15%',
    overflow: 'hidden',
    paddingLeft: '0.25em',
    paddingRight: '0.25em',
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
      </div>
    </div>
  )
}

export default CreatorTile;