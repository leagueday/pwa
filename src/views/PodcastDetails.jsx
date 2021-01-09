import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import StarRoundedIcon from '@material-ui/icons/StarRounded';

import { constants as storeConstants, actions, selectors } from '../store'
import * as rssSelectors from '../model/rss'
import usePodcast from '../api/usePodcast'
import useStarred from '../api/useStarred'

import { stripHtml } from './util'
import LazyPodcastTitleImage from './LazyPodcastTitleImage'
import PodcastAudioControls from './PodcastAudioControls'
import PodcastDetailsItem from './PodcastDetailsItem'

const useStyles = makeStyles(theme => ({
  colorTextPrimary: {
    color: theme.palette.text.primary,
  },
  colorTextSecondary: {
    color: theme.palette.text.secondary,
  },
  description: {
    color: theme.palette.text.secondary,
    fontSize: '85%',
    fontWeight: 100,
    marginBottom: '0.5em',
    padding: '0.5em',
  },
  image: {
    height: '4em',
    width: '4em',
  },
  imageContainer: {
    flex: 0,
  },
  item: {
    backgroundColor: theme.palette.background.control,
    borderRadius: '4px',
    marginBottom: '0.25em',
  },
  items: {
    maxHeight: '100%',
    overflowY: 'auto',
  },
  language: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightLight,
    fontSize: '80%',
    fontStyle: 'oblique',
    marginLeft: 'auto',
    marginRight: '2em',
    paddingLeft: '0.5em',
    whiteSpace: 'nowrap',
  },
  podcastAudioControls: {
    display: 'flex',
    flexDirection: 'row',
  },
  podcastDetails: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
    padding: '0.5em',
    userSelect: 'none',
  },
  simpleColumn: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: '1em',
    minWidth: 0,
    width: '100%',
  },
  simpleRow: {
    alignItems: 'top',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 0,
  },
  star: {
    color: 'inherit',
    cursor: 'pointer',
    height: '1em',
    width: '1em',
  },
  starbox: {
    marginLeft: 'auto',
    marginRight: '1em',
  },
  title: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.serif,
    minWidth: 0,
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  titleLine: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
}))

const PodcastDetails = props => {
  const classes = useStyles()

  const podcast = props.podcast

  const starred = useSelector(selectors.getStarred)

  const audioPodcastId = useSelector(selectors.getAudioPodcastId)
  const audioMode = useSelector(selectors.getAudioMode)

  const {rss} = usePodcast(podcast, {forceRevalidate: true})

  const description = rssSelectors.channelSelectors.v2.description(rss)
  const language = rssSelectors.channelSelectors.v2.language(rss)
  const title = rssSelectors.channelSelectors.v2.title(rss)

  const items = rssSelectors.channelSelectors.v2.items(rss)
  const firstItem = items?.[0]
  const firstItemAudioUrl = rssSelectors.itemSelectors.v2.audioUrl(firstItem)
  // const firstItemAudioType = rssSelectors.itemSelectors.v2.audioType(firstItem)
  const firstItemAudioDuration = rssSelectors.itemSelectors.v2.duration((firstItem))

  const isSelectedAudio = audioPodcastId === podcast?.id
  const isPlaying = isSelectedAudio && audioMode === storeConstants.AUDIO_MODE_PLAY
  console.log('isSelectedAudio', isSelectedAudio, 'isPlaying', isPlaying)

  const [isStar, addStar, removeStar] = useStarred()
  const isStarred = isStar(podcast?.id)

  const dispatch = useDispatch()
  const onPause = () => {
    dispatch(actions.pauseAudio())
  }

  const onPlay = isSelectedAudio
    ? () => { dispatch(actions.playAudio()) }
    : () => { dispatch(actions.selectAudio(podcast?.id, firstItemAudioUrl, firstItemAudioDuration))}

  return (
    <div className={cx(classes.podcastDetails, props.className)}>
      <div className={classes.titleLine}>
        <div className={classes.imageContainer}>
          <LazyPodcastTitleImage className={classes.image} podcast={podcast} />
        </div>
        <div className={classes.simpleColumn}>
          <div className={classes.simpleRow}>
            <div className={classes.title}>
              {title}
            </div>
            <div className={cx(classes.starbox, isStarred ? classes.colorTextPrimary : classes.colorTextSecondary)}>
              { isStarred
                ? (<StarRoundedIcon
                  className={classes.star}
                  onClick={() => removeStar(podcast?.id)}
                />) : (<StarBorderRoundedIcon
                  className={classes.star}
                  onClick={() => addStar(podcast?.id)}
                />)
              }
            </div>
          </div>
          <div className={classes.simpleRow}>
            <PodcastAudioControls
              className={classes.podcastAudioControls}
              isPlaying={isPlaying}
              onPause={onPause}
              onPlay={onPlay}
            />
            <Hidden xsDown>
              <div className={classes.language}>
                {language}
              </div>
            </Hidden>
          </div>
        </div>
      </div>
      <div className={classes.description}>
        {stripHtml(description)}
      </div>
      <div className={classes.items}>
        {
          (() => {
            let tmpKey = 1
            return items?.map(
              item => (
                <div key={tmpKey++} className={classes.item}>
                  <PodcastDetailsItem podcastId={podcast?.id} item={item} />
                </div>
              )
            )
          })()
        }
      </div>
    </div>
  )
}

export default PodcastDetails
