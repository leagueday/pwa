import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Tooltip from '@material-ui/core/Tooltip'

import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import StarRoundedIcon from '@material-ui/icons/StarRounded';

import * as colors from '../styling/colors'
import { constants as storeConstants, actions, selectors } from '../store'
import * as rssSelectors from '../model/rss'
import usePodcast from '../api/usePodcast'
import useStarred from '../api/useStarred'

import {addScrollStyle, stripHtml} from './util'
import DumbPodcastTitleImage from './DumbPodcastTitleImage'
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
  items: addScrollStyle(colors.magenta)({
    maxHeight: '100%',
    overflowY: 'auto',
  }),
  language: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.weight.normal,
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
    fontFamily: theme.typography.family.primary,
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

  const audioPodcastId = useSelector(selectors.getAudioPodcastId)
  const audioMode = useSelector(selectors.getAudioMode)

  const {rss: podcastRss} = usePodcast(podcast, {forceRevalidate: true})

  const description = rssSelectors.channelSelectors.v2.description(podcastRss)
  const language = rssSelectors.channelSelectors.v2.language(podcastRss)
  const title = rssSelectors.channelSelectors.v2.title(podcastRss)

  const items = rssSelectors.channelSelectors.v2.items(podcastRss)
  const firstItem = items?.[0]
  const firstItemAudioUrl = rssSelectors.itemSelectors.v2.audioUrl(firstItem)
  // const firstItemAudioType = rssSelectors.itemSelectors.v2.audioType(firstItem)
  const firstItemAudioDuration = rssSelectors.itemSelectors.v2.duration(firstItem)
  const firstItemTitle = rssSelectors.itemSelectors.v2.title(firstItem)

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
    : () => {
      dispatch(actions.selectAudio(
        podcast?.id,
        podcast?.url,
        firstItemAudioUrl,
        0,
        firstItemAudioDuration,
        firstItemTitle,
      ))
      dispatch(actions.playAudio())
    }

  return (
    <div className={cx(classes.podcastDetails, props.className)}>
      <div className={classes.titleLine}>
        <div className={classes.imageContainer}>
          <DumbPodcastTitleImage className={classes.image} podcastRss={podcastRss} />
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
                />) : (
                  <Tooltip title="Click to add this podcast to My List.">
                    <StarBorderRoundedIcon
                      className={classes.star}
                      onClick={() => addStar(podcast?.id)}
                    />
                  </Tooltip>
                )
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
            if (!items || !items.map) return null

            // there's a kind of fragility to the Next-Track operation,
            // it supposes the durability of a particular listing, and
            // the current track's position in that list. An item's
            // position in a list is not an intrinsic identifier of
            // the item. But Next-Track depends on it.
            //
            // On the other hand the item data is yet-to-be-parsed,
            // we'll apply the RSS-2 optimistic selectors to it
            // within that component, one piece of data being the
            // URL, that would be a better identifier if nothing
            // else, but is not yet available here.
            //
            // Here the React key is inadvisably the track offset
            // in the list, it's not great and is strictly as good
            // as the Next-Track feature...
            let itemIndex = -1

            return items.map(
              item => (
                <div key={itemIndex++} className={classes.item}>
                  <PodcastDetailsItem
                    podcastId={podcast?.id}
                    podcastUrl={podcast?.url}
                    item={item}
                    itemIndex={itemIndex}
                  />
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
