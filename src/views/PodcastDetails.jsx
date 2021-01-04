import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import StarRoundedIcon from '@material-ui/icons/StarRounded';

import * as actions from '../store/actions'
import * as selectors from '../store/selectors'
import * as rssSelectors from '../model/rss'
import usePodcast from '../api/usePodcast'
import useStarred from '../api/useStarred'

import { stripHtml } from './util'
import LazyPodcastTitleImage from './LazyPodcastTitleImage'
import PodcastAudioControls from './PodcastAudioControls'
import PodcastDetailsItem from './PodcastDetailsItem'
import * as storeConstants from '../store/constants'

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
    paddingTop: '0.5em',
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

  const selectedPodcast = useSelector(selectors.getSelectedPodcast)
  const starred = useSelector(selectors.getStarred)
  const selectedAudio = useSelector(selectors.getSelectedAudio)

  const {rss} = usePodcast(selectedPodcast, {forceRevalidate: true})

  const description = rssSelectors.channelSelectors.v2.description(rss)
  const language = rssSelectors.channelSelectors.v2.language(rss)
  const title = rssSelectors.channelSelectors.v2.title(rss)

  const items = rssSelectors.channelSelectors.v2.items(rss)
  const firstItem = items?.[0]
  const firstItemAudioUrl = rssSelectors.itemSelectors.v2.audioUrl(firstItem)
  const firstItemAudioType = rssSelectors.itemSelectors.v2.audioType(firstItem)

  const isSelectedAudio = selectedAudio?.podcastId === selectedPodcast?.id
  const isPlaying = isSelectedAudio && selectedAudio?.mode === storeConstants.AUDIO_MODE_PLAY

  const [addStar, removeStar] = useStarred()
  const isStarred = starred && selectedPodcast?.id && starred[selectedPodcast.id]

  const dispatch = useDispatch()
  const onPause = () => {
    dispatch(actions.pauseAudio())
  }

  const onPlay = isSelectedAudio
    ? () => { dispatch(actions.playAudio()) }
    : () => { dispatch(actions.selectAudio(selectedPodcast?.id, firstItemAudioUrl, firstItemAudioType))}

  return (
    <div className={cx(classes.podcastDetails, props.className)}>
      <div className={classes.titleLine}>
        <div className={classes.imageContainer}>
          <LazyPodcastTitleImage className={classes.image} podcast={selectedPodcast} />
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
                  onClick={() => removeStar(selectedPodcast?.id)}
                />) : (<StarBorderRoundedIcon
                  className={classes.star}
                  onClick={() => addStar(selectedPodcast?.id)}
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
                  <PodcastDetailsItem podcastId={selectedPodcast?.id} item={item} />
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
