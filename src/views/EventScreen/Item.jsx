import React from 'react'
import cx from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import { actions, constants as storeConstants, selectors } from '../../store'
import { colors } from '../../styling'
import { computeZebraBackgroundColor } from '../util'
import { makeIconButton } from '../IconButton'
import { IcoPlay,IcoPause } from '../icons'
import Collapse from '@material-ui/core/Collapse'
import { stripHtml } from '../util'
const PauseButton = makeIconButton(IcoPause)
const PlayButton = makeIconButton(IcoPlay)
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
  itemDescription: {
    alignItems: 'center',
    marginBottom: '0.25em',
    padding: '0 4em',
    width: '100%',
    userSelect: 'none',
    [theme.breakpoints.only('sm')]: {
      padding: '0 0.5em',
    },
    [theme.breakpoints.only('xs')]: {
      padding: '0 2vw',
    },
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

const Item = ({
  accentColor,
  className,
  date,
  duration,
  itemIndex,
  title,
  itemAudioUrl,
  isExpanded,
  toggleIsExpanded,
  description,
}) => {
  const classes = useStyles({
    accentColor,
    backgroundColor: computeZebraBackgroundColor(itemIndex),
  })
  const dispatch = useDispatch()
  const audioUrl = useSelector(selectors.getAudioUrl)
  const audioMode = useSelector(selectors.getAudioMode)

  const isSelectedAudio = audioUrl && audioUrl === itemAudioUrl
  const isPlaying = isSelectedAudio && audioMode === storeConstants.AUDIO_MODE_PLAY
  const PopButton = isPlaying ? PauseButton : PlayButton

  const onPopClick = isPlaying
  ? ev => {
      //console.log('PAUSED AUDIO');
      dispatch(actions.pauseAudio())
      ev.stopPropagation()
    }
  : ev => {
      if (isSelectedAudio) {
        //console.log('PLAYED AUDIO');
        dispatch(actions.playAudio())
      }
      else {
        //console.log('PLAY AUDIO');
        //console.log('itemIndex :: ', itemIndex);
        dispatch(
          actions.selectAudio(
            '',
            '',
            '',
            itemAudioUrl,
            itemIndex,
            '',
            title
          )
        )
        dispatch(actions.playAudio())
      }
      ev.stopPropagation()
    }

  // RENDER HTML COMPONENT
  return (
    <div className={cx(classes.item, className)} onClick={toggleIsExpanded}>
      <div className={classes.itemRow}>
        <PopButton
          className={classes.popButton}
          iconClassName={classes.popButtonIcon}
          size="1.5em"
          color={colors.white}
          onClick={itemAudioUrl ? onPopClick : () => true}
          shadowColor={colors.darkGray}
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
      <Collapse in={isExpanded}>
        <div className={classes.itemDescription}>{description}</div>
      </Collapse>
    </div>
  )
}

export default Item