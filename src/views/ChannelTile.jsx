import React from 'react'
import { useDispatch } from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import {actions} from '../store'
import Square from './Square'

const useStyles = makeStyles(theme => ({
  channelTile: {
    cursor: 'pointer',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    maxHeight: '100%',
    maxWidth: '100%',
    minHeight: 0,
    minWidth: 0,
    userSelect: 'none',
    width: '100%',
  },
  image: ({textColor}) => ({
    border: `0.25em solid ${textColor ?? colors.white80}`,
    borderRadius: '50%',
    height: '100%',
    width: '100%',
  }),
  imageSquare: {
    width: '80%',
  },
  text: ({textColor}) => ({
    color: textColor ?? colors.white80,
    fontSize: '75%',
    fontWeight: theme.typography.weight.bold,
    height: '100%',
    textOverflow: 'ellipsis',
    width: '100%',
    display: 'inline-flex',
  }),
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '15%',
    overflow: 'hidden',
    paddingLeft: '0.25em',
    paddingRight: '0.25em',
  }
}))

const ChannelTile = ({channel}) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const gotoThisChannel = () => dispatch(actions.pushHistory(`/channel/${channel.tag}`))

  return (
    <div className={classes.channelTile} onClick={gotoThisChannel}>
      <Square className={classes.imageSquare}>
        <img className={classes.image} src={channel.imageUrl} />
      </Square>
      <div className={classes.textBox}>
        <div className={classes.text}>
          {channel.title}
        </div>
      </div>
    </div>
  )
}

export default ChannelTile
