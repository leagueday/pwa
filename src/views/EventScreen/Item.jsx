import React from 'react'
import cx from 'classnames'
import ReactPlayer from "react-player";

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import { colors } from '../../styling'
import { computeZebraBackgroundColor } from '../util'
import { makeIconButton } from '../IconButton'
import { IcoPause, IcoPlay, IcoPlus } from '../icons'

const PlayButton = makeIconButton(IcoPlay)

let audio = new Audio("https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3")

const useStyles = makeStyles(theme => ({
  attribute: {
    padding: '0em 1em',
    whiteSpace: 'nowrap',
  },
  item: ({ backgroundColor }) => ({
    backgroundColor,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),
  itemNumber: {
    color: colors.white30,
    padding: '0 1em',
    fontFamily: theme.typography.family.secondary,
  },
  itemRow: ({ accentColor }) => ({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: '2em',
    minWidth: 0,
    width: '100%',
    userSelect: 'none',
    '&:hover': {
      color: accentColor,
    },
  }),
  popButton: ({ accentColor }) => ({
    backgroundColor: colors.darkGray,
    '&:hover': {
      backgroundColor: colors.lightGray,
    },
    '& *': {
      color: colors.white,
    },
    '&:hover *': {
      color: accentColor,
    },
  }),
  popButtonIcon: {
    width: '60%',
  },
  rightJustified: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginLeft: 'auto',
    minWidth: 0,
  },
  title: {
    flex: 1,
    fontWeight: theme.typography.weight.bold,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
}))

const Item = ({ accentColor, className, date, duration, itemIndex, title }) => {
  const [isPlaying,setIsPlaying]=React.useState(false);
  const classes = useStyles({
    accentColor,
    backgroundColor: computeZebraBackgroundColor(itemIndex),
  })
  const PlayOrPauseIcon = isPlaying ? IcoPause : IcoPlay
  // let playback
  // liveUrl.map(item=>{
  //   playback=item.duration
  // })
  const onClick = isPlaying 
  ? () => setIsPlaying(false)
  : () => setIsPlaying(true)
  const onClick = () => {
    audio.play()
  }

  return (
    <div className={cx(classes.item, className)}>
      <div className={classes.itemRow}>
        <PlayOrPauseIcon
          className={classes.popButton}
          iconClassName={classes.popButtonIcon}
          size="1.5em"
          color={colors.white}
          shadowColor={colors.darkGray}
          onClick={onClick}
        />
        <div className={classes.itemNumber}>
          {itemIndex < 9 ? `0${itemIndex + 1}` : String(itemIndex + 1)}
        </div>
        <div className={classes.title}>{title}</div>
        <Hidden smDown>
          <div className={classes.rightJustified}>
            <div className={classes.attribute}>{date}</div>
            <div className={classes.attribute}>{duration}</div>
          </div>
        </Hidden>
      </div>
    </div>
  )
}

export default Item
