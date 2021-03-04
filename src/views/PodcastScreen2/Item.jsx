import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import { itemSelectors } from '../../model/rss'
import {actions, constants as storeConstants, selectors} from '../../store'
import {stripHtml} from '../util'
import {makeIconButton} from '../IconButton'
import {IcoPause, IcoPlay} from '../icons'

const PauseButton = makeIconButton(IcoPause)
const PlayButton = makeIconButton(IcoPlay)

const useStyles = makeStyles(theme => ({
  item: ({accentColor, backgroundColor}) => ({
    alignItems: 'center',
    backgroundColor,
    display: 'flex',
    flexDirection: 'row',
    height: '2em',
    marginBottom: '0.25em',
    width: '100%',
    userSelect: 'none',
    '&:hover': {
      color: accentColor,
    },
  }),
  itemNumber: {
    color: colors.white30,
    padding: '0 1em',
    fontFamily: theme.typography.family.secondary,
  },
  itemTitle: {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  popButton: {
    backgroundColor: null,
  },
  popButtonIcon: ({accentColor}) => ({
    width: '60%',
    '&:hover': {
      color: accentColor,
    },
  }),
}))

const computeBackgroundColor = index => {
  if (index & 1) return null

  return (
    normI => {
      const c = Color(colors.lightGray).fade(Math.max(normI, 0))
      return `rgba(${c.red()},${c.green()},${c.blue()},${c.alpha()})`
    }
  )(
    (100 - 10 * index / 2) / 100
  )
}

const Item = ({accentColor, podcastId, podcastUrl, item, itemIndex}) => {
  const classes = useStyles({accentColor, backgroundColor: computeBackgroundColor(itemIndex)})

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

  const dispatch = useDispatch()
  const onPopClick = isPlaying
    ? ev => {
      dispatch(actions.pauseAudio())
      ev.stopPropagation()
    } : ev => {
      if (isSelectedAudio)
        dispatch(actions.playAudio())
      else {
        dispatch(actions.selectAudio(podcastId, podcastUrl, itemAudioUrl, itemIndex, duration, title))
        dispatch(actions.playAudio())
      }
      ev.stopPropagation()
    }

  return (
    <div className={classes.item}>
      <PopButton
        className={classes.popButton}
        iconClassName={classes.popButtonIcon}
        size="1.5em"
        onClick={onPopClick}
        color={colors.white}
        shadowColor={colors.darkGray} />
      <div className={classes.itemNumber}>
        {itemIndex < 9 ? `0${itemIndex+1}` : String(itemIndex+1)}
      </div>
      <div className={classes.itemTitle}>
        {strippedTitle}
      </div>
    </div>
  )
}

export default Item
