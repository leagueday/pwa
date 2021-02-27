import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'
import dayjs from 'dayjs'
import dayjsAdvancedPlugin from 'dayjs/plugin/advancedFormat'

import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded'
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded'

import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'

import { constants as storeConstants, actions, selectors } from '../store'
import { itemSelectors } from '../model/rss'

import { stripHtml } from './util'

dayjs.extend(dayjsAdvancedPlugin)

const useStyles = makeStyles(theme => ({
  audioControls: {
    marginLeft: 'auto',
    minHeight: '1em',
    width: '3em',
  },
  description: {
    color: theme.palette.text.secondary,
    fontSize: '90%',
    fontWeight: theme.typography.weight.normal,
    padding: '0 0.5em 0.5em 0.5em',
  },
  dump: {
    color: theme.palette.grey[700],
    fontSize: '60%',
    fontWeight: theme.typography.weight.normal,
  },
  podcastDetailsItem: {
    border: '1px solid transparent',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 0.25em',
    userSelect: 'none',
  },
  podcastDetailsItemSelected: {
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  pubDate: {
    color: theme.palette.text.secondary,
    fontSize: '75%',
    fontStyle: 'oblique',
    fontWeight: theme.typography.weight.normal,
    paddingLeft: '1em',
    paddingRight: '0.5em',
    whiteSpace: 'nowrap',
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: '90%',
    fontWeight: theme.typography.weight.bold,
    maxWidth: '100%',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  titleRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
  },
}))

const formatDate = dt => {
  const yearAgo = dayjs().subtract(1, 'year')

  const djdt = dayjs(dt)

  if (djdt.isAfter(yearAgo)) {
    return djdt.format('MMM Do h:mma')
  } else {
    return djdt.format('MMM Do, YYYY')
  }
}

const PodcastDetailsItem = ({podcastId, podcastUrl, item, itemIndex}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [expanded, setExpanded] = React.useState(false)

  // const audioType = itemSelectors.v2.audioType(item)
  const itemAudioUrl = itemSelectors.v2.audioUrl(item)
  const description = itemSelectors.v2.description(item)
  const duration = itemSelectors.v2.duration(item)
  const pubDate = itemSelectors.v2.pubDate(item)
  const title = itemSelectors.v2.title(item)
  const url = itemSelectors.v2.url(item)

  const audioUrl = useSelector(selectors.getAudioUrl)
  const audioMode = useSelector(selectors.getAudioMode)
  const isSelectedAudio = audioUrl && audioUrl === itemAudioUrl
  const isPlaying = isSelectedAudio && audioMode === storeConstants.AUDIO_MODE_PLAY

  const onClick = () => setExpanded(!expanded)
  const onPauseClick = ev => {
    dispatch(actions.pauseAudio())
    ev.stopPropagation()
  }
  const onPlayClick = ev => {
    if (isSelectedAudio)
      dispatch(actions.playAudio())
    else {
      dispatch(actions.selectAudio(podcastId, podcastUrl, itemAudioUrl, itemIndex, duration, title))
      dispatch(actions.playAudio())
    }

    ev.stopPropagation()
  }

  return (
    <div
      className={
        cx(classes.podcastDetailsItem,
          isSelectedAudio
            ? classes.podcastDetailsItemSelected
            : null
        )
      }
      onClick={onClick}
    >
      <div className={classes.titleRow}>
        <div className={classes.title}>
          {title}
        </div>
        <Hidden xsDown>
          <div className={classes.pubDate}>
            {formatDate(pubDate)}
          </div>
        </Hidden>
        <div className={classes.audioControls}>
          {
            isPlaying
              ? (
                <IconButton color="secondary" aria-label="pause" onClick={onPauseClick} size="small">
                  <PauseCircleOutlineRoundedIcon />
                </IconButton>
              ) : (
                <IconButton color="secondary" aria-label="play" onClick={onPlayClick} size="small">
                  <PlayCircleOutlineRoundedIcon />
                </IconButton>
              )
          }
        </div>
      </div>
      <Collapse in={expanded} timeout={150}>
        <div className={classes.description}>
          {stripHtml(description)}
        </div>
      </Collapse>
    </div>
  )
}

export default PodcastDetailsItem
