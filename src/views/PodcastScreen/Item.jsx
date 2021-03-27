import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import Hidden from '@material-ui/core/Hidden'

import * as colors from '../../styling/colors'
import { itemSelectors } from '../../model/rss'
import {actions, constants as storeConstants, selectors} from '../../store'
import {stripHtml, computeZebraBackgroundColor} from '../util'
import {formatDatetime, secondsToHms} from '../dateutil'
import {makeIconButton} from '../IconButton'
import {IcoPause, IcoPlay} from '../icons'

const PauseButton = makeIconButton(IcoPause)
const PlayButton = makeIconButton(IcoPlay)

const useStyles = makeStyles(theme => ({
  attribute: {
    padding: '0em 1em',
    whiteSpace: 'nowrap',
  },
  item: ({backgroundColor}) => ({
    backgroundColor,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),
  itemDescription: {
    alignItems: 'center',
    marginBottom: '0.25em',
    width: '100%',
    userSelect: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '0 0.5em',
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 4em',
    },
  },
  itemNumber: {
    color: colors.white30,
    padding: '0 1em',
    fontFamily: theme.typography.family.secondary,
  },
  itemRow: ({accentColor}) => ({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: '2.5em',
    width: '100%',
    userSelect: 'none',
    '&:hover': {
      color: accentColor,
    },
  }),
  popButton: ({accentColor}) => ({
    backgroundColor: colors.darkGray,
    width: '2em',
    '& *': {
      color: colors.white,
    },
    '&:hover *': {
      color: accentColor,
    },
  }),
  popButtonIcon: {
  },
  rightJustified: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginLeft: 'auto',
  },
  title: {
    fontWeight: theme.typography.weight.bold,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
}))

const Item = ({ accentColor,
                podcastId,
                podcastName,
                podcastUrl,
                item,
                itemIndex,
                isExpanded,
                toggleIsExpanded }) => {
  const classes = useStyles({accentColor, backgroundColor: computeZebraBackgroundColor(itemIndex)})

  const itemAudioUrl = itemSelectors.v2.audioUrl(item)
  const description = itemSelectors.v2.description(item)
  const duration = itemSelectors.v2.duration(item)
  const pubDate = itemSelectors.v2.pubDate(item)
  const title = itemSelectors.v2.title(item)

  const audioUrl = useSelector(selectors.getAudioUrl)
  const audioMode = useSelector(selectors.getAudioMode)
  const isSelectedAudio = audioUrl && audioUrl === itemAudioUrl
  const isPlaying = isSelectedAudio && audioMode === storeConstants.AUDIO_MODE_PLAY

  const PopButton = isPlaying ? PauseButton : PlayButton

  const strippedTitle = React.useMemo(
    () => stripHtml(title),
    [title]
  )

  const strippedDescription = React.useMemo(
    () => stripHtml(description),
    [description]
  )

  const formattedPubDate = React.useMemo(
    () => formatDatetime(pubDate),
    [pubDate]
  )

  const durationHms = React.useMemo(
    () => secondsToHms(duration),
    [duration]
  )

  const dispatch = useDispatch()
  const onPopClick = isPlaying
    ? ev => {
      dispatch(actions.pauseAudio())
      ev.stopPropagation()
    } : ev => {
      if (isSelectedAudio)
        dispatch(actions.playAudio())
      else {
        dispatch(
          actions.selectAudio(
            podcastId,
            podcastName,
            podcastUrl,
            itemAudioUrl,
            itemIndex,
            duration,
            title
          )
        )
        dispatch(actions.playAudio())
      }
      ev.stopPropagation()
    }

  return (
    <div className={classes.item} onClick={toggleIsExpanded}>
      <div className={classes.itemRow}>
        <PopButton
          className={classes.popButton}
          iconClassName={classes.popButtonIcon}
          size="1.5em"
          onClick={onPopClick}
          shadowColor={colors.darkGray} />
        <div className={classes.itemNumber}>
          {itemIndex < 9 ? `0${itemIndex+1}` : String(itemIndex+1)}
        </div>
        <div className={classes.title}>
          {strippedTitle}
        </div>
        <Hidden smDown>
          <div className={classes.rightJustified}>
            <div className={classes.attribute}>
              {formattedPubDate}
            </div>
            <div className={classes.attribute}>
              {durationHms}
            </div>
          </div>
        </Hidden>
      </div>
      <Collapse in={isExpanded}>
        <div className={classes.itemDescription}>
          {strippedDescription}
        </div>
      </Collapse>
    </div>
  )
}

export default Item
