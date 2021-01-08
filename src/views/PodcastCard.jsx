import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import { constants as storeConstants, actions, selectors } from '../store'
import * as typography from '../styling/typography'
import { channelSelectors } from '../model/rss'
import usePodcast from '../api/usePodcast'

import LazyPodcastTitleImage from './LazyPodcastTitleImage'

const useStyles = makeStyles(theme => ({
  cardContent: {
    alignItems: 'stretch',
    backgroundColor: colors.darkCharcoal,
    display: 'flex',
    flexDirection: 'row',
  },
  cardText: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '100%',
    overflowX: 'hidden',
    padding: '0.5em',
    width: '100%',
  },
  cardTextRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyItems: 'space-between',
  },
  foregroundImage: {
    bottom: '-4px',
    height: '3.9em',
    left: '0px',
    position: 'absolute',
    right: '-4px',
    top: '0px',
    width: '3.9em',
  },
  foregroundImageContainer: {
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: '6px',
    flexGrow: 0,
    flexShrink: 0,
    height: '4em',
    overflow: 'hidden',
    padding: '0.15em',
    position: 'relative',
    width: '4em',
  },
  foregroundImageVertGloss: {
    background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 5%, rgba(255,255,255,0.1) 9%, rgba(255,255,255,0.1) 93%, rgba(255,255,255,0.7) 98%, rgba(96,96,96,0.7) 100%)',
    bottom: 0,
    height: '4em',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '4em',
  },
  foregroundImageHorizGloss: {
    background: 'linear-gradient(270deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 5%, rgba(255,255,255,0.1) 9%, rgba(255,255,255,0.1) 93%, rgba(255,255,255,0.7) 98%, rgba(96,96,96,0.7) 100%)',
    bottom: 0,
    height: '4em',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '4em',
  },
  language: {
    color: theme.palette.text.secondary,
    fontFamily: typography.mono,
    fontSize: '75%',
  },
  nowPlaying: {
    color: theme.palette.primary.light,
    fontFamily: typography.sans,
    fontSize: '75%',
    fontStyle: 'oblique',
    fontWeight: theme.typography.fontWeightLight,
  },
  podcastCard: {
    border: `1px solid ${colors.vintageTubeDark}`,
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0.1em',
    minHeight: '4em',
    userSelect: 'none',
  },
  promoted: {
    color: theme.palette.text.secondary,
    fontFamily: typography.sans,
    fontSize: '70%',
    fontStyle: 'oblique',
    fontWeight: theme.typography.fontWeightLight,
    marginLeft: 'auto',
  },
  starred: {
    color: theme.palette.text.secondary,
    fontSize: '75%',
    marginLeft: 'auto',
  },
  title: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.serif,
    fontSize: '75%',
    fontWeight: theme.typography.fontWeightBold,
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
}))

const PodcastCard = ({podcast}) => {
  const {rss, error: podcastError} = usePodcast(podcast)

  const classes = useStyles()

  const selectedAudio = useSelector(selectors.getSelectedAudio)
  const isPlaying =
    selectedAudio?.podcastId === podcast?.id
      && selectedAudio?.mode === storeConstants.AUDIO_MODE_PLAY

  const starred = useSelector(selectors.getStarred)
  const isStarred = podcast?.id && starred ? !!starred[podcast.id] : false

  const title = channelSelectors.v2.title(rss)
  const language = channelSelectors.v2.language(rss)

  const dispatch = useDispatch()
  const gotoThisPodcast = () => dispatch(actions.pushHistory(`/podcast/${podcast.id}`))

  return (
    <div className={classes.podcastCard} onClick={gotoThisPodcast}>
      <div className={classes.cardContent}>
        <div className={classes.foregroundImageContainer}>
          <LazyPodcastTitleImage className={classes.foregroundImage} podcast={podcast} />
          <div className={classes.foregroundImageVertGloss} />
          <div className={classes.foregroundImageHorizGloss} />
        </div>
        <div className={classes.cardText}>
          <div className={classes.cardTextRow}>
            <div className={classes.title}>
              {title}
            </div>
            { isStarred && (<div className={classes.starred}>⭐</div>) }
          </div>
          <div className={classes.cardTextRow}>
            <div className={classes.nowPlaying}>
              { isPlaying ? 'now playing' : ' ' }
            </div>
          </div>
          <div className={classes.cardTextRow}>
            <div className={classes.language}>
              {language}
            </div>
            { podcast?.suggested && (<div className={classes.promoted}>(promoted)</div>) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodcastCard
