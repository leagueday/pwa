import React, { useContext } from 'react'
import cx from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { UserStateContext } from '../../store/stateProviders/userState'
import { makeStyles } from '@material-ui/core/styles'
import LikeButton from '../LikeButton'
import Hidden from '@material-ui/core/Hidden'
import { actions, constants as storeConstants, selectors } from '../../store'
import { colors } from '../../styling'
import { computeZebraBackgroundColor } from '../util'
import { makeIconButton } from '../IconButton'
import { IcoPlay, IcoPause } from '../icons'
import Collapse from '@material-ui/core/Collapse'
import { stripHtml } from '../util'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const PauseButton = makeIconButton(IcoPause)
const PlayButton = makeIconButton(IcoPlay)
const useStyles = makeStyles(theme => ({
  attribute: {
    padding: '0em 1em',
    whiteSpace: 'nowrap',
  },
  itemContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'no-wrap',
  },
  item: ({ backgroundColor }) => ({
    backgroundColor,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  }),
  itemNumber: {
    color: colors.white30,
    padding: '0 .5em',
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
    textOverflow: 'ellipsis',
    width: '100%',
    [theme.breakpoints.only('sm')]: {
      fontSize: '80%',
    },
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
  audio,
}) => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles({
    accentColor,
    backgroundColor: computeZebraBackgroundColor(itemIndex),
  })
  const dispatch = useDispatch()
  const audioUrl = useSelector(selectors.getAudioUrl)
  const audioMode = useSelector(selectors.getAudioMode)
  const { currentUserId } = useContext(UserStateContext)
  const isSelectedAudio = audioUrl && audioUrl === itemAudioUrl
  const isPlaying =
    isSelectedAudio && audioMode === storeConstants.AUDIO_MODE_PLAY
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
        } else {
          //console.log('PLAY AUDIO');
          //console.log('itemIndex :: ', itemIndex);
          dispatch(
            actions.selectAudio('', '', '', itemAudioUrl, itemIndex, '', title)
          )
          dispatch(actions.playAudio())
        }
        ev.stopPropagation()
      }

  // RENDER HTML COMPONENT

  return (
    <div className={classes.itemContainer}>
      
        {/* !sm && */}
      <LikeButton
        audio={audio}
        channelTag={audio?.fields?.channelTag}
        userId={currentUserId}
      />
      
      <div className={cx(classes.item, className)} onClick={toggleIsExpanded}>
        <div className={classes.itemRow}>
          <PopButton
            className={classes.popButton}
            iconClassName={classes.popButtonIcon}
            size="2.5em"
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
    </div>
  )
}

export default Item
