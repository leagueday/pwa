import React from 'react'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import * as colors from '../styling/colors'
import { actions } from '../store'
import { channelSelectors } from '../model/rss'
import usePodcast from '../api/usePodcast'
import useStarred from '../api/useStarred'

import DumbPodcastTitleImage from './DumbPodcastTitleImage'

const useStyles = makeStyles(theme => ({
  cardContent: {
    alignItems: 'stretch',
    backgroundColor: colors.lightGray,
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
    background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 5%, rgba(255,255,255,0.1) 9%, rgba(255,255,255,0.05) 93%, rgba(255,255,255,0.7) 98%, rgba(96,96,96,0.7) 100%)',
    bottom: 0,
    height: '4em',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '4em',
  },
  foregroundImageHorizGloss: {
    background: 'linear-gradient(270deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 5%, rgba(255,255,255,0.1) 9%, rgba(255,255,255,0.05) 93%, rgba(255,255,255,0.7) 98%, rgba(96,96,96,0.7) 100%)',
    bottom: 0,
    height: '4em',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '4em',
  },
  podcastCard: {
    backgroundColor: colors.brandBlack,
    border: `1px solid ${colors.blue}`,
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0.1em',
    minHeight: '4em',
    userSelect: 'none',
  },
  starred: {
    color: theme.palette.text.secondary,
    fontSize: '75%',
    marginLeft: 'auto',
  },
  subtext: {
    color: theme.palette.text.secondary,
    fontSize: '55%',
    marginTop: '0.5em',
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: '75%',
    fontWeight: theme.typography.weight.bold,
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
}))

const breakLines = text => {
  if (!text) return text

  return text.split('\n').map((item, idx) => (
    <span key={idx}>{item}<br/></span>
  ))
}

const PodcastCard = ({podcast}) => {
  const {rss: podcastRss, error: podcastError} = usePodcast(podcast)

  const classes = useStyles()

  // const audioPodcastId = useSelector(selectors.getAudioPodcastId)
  // const audioMode = useSelector(selectors.getAudioMode)
  // const isPlaying = audioPodcastId === podcast?.id && audioMode === storeConstants.AUDIO_MODE_PLAY

  const [isStar] = useStarred()
  const isStarred = isStar(podcast?.id)

  const title = channelSelectors.v2.title(podcastRss)
  // const description = channelSelectors.v2.description(podcastRss)
  // const language = channelSelectors.v2.language(podcastRss)
  const subtext = podcast?.tileSubtext

  const dispatch = useDispatch()
  const gotoThisPodcast = () => dispatch(actions.pushHistory(`/podcast/${podcast.id}`))

  return (
    <Card className={classes.podcastCard} onClick={gotoThisPodcast}>
      <div className={classes.cardContent}>
        <div className={classes.foregroundImageContainer}>
          <DumbPodcastTitleImage className={classes.foregroundImage} podcastRss={podcastRss} />
        </div>
        <div className={classes.cardText}>
          <div className={classes.cardTextRow}>
            <div className={classes.title}>
              {title}
            </div>
            { isStarred && (<div className={classes.starred}>⭐</div>) }
          </div>
          <div className={classes.subtext}>
            {breakLines(subtext)}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PodcastCard
