import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import * as rssSelectors from '../../model/rss'
import {actions, constants as storeConstants, selectors} from '../../store'
import usePodcast from '../../api/usePodcast'

import { stripHtml } from '../util'
import BottomBlock from '../BottomBlock'
import ContentLayout from '../ContentLayout'
import Square from '../Square'
import Item from './Item'

const useStyles = makeStyles(theme => ({
  accentColor: ({accentColor}) => ({
    color: accentColor,
  }),
  logoImage: {
    width: '100%',
  },
  logoImageContainer: {
    marginRight: '1em',
    padding: '1em',
  },
  logoImageSquare: ({accentColor}) => ({
    border: `1px solid ${accentColor}`,
    width: '100%',
  }),
  textplate: {
    padding: '1em',
    width: '100%',
    overflow: 'hidden',
    userSelect: 'none',
  },
  textplateTitleRow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    fontSize: '150%',
    fontWeight: theme.typography.weight.bold,
  },
  textplateDescription: {
    paddingTop: '0.5em',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '85%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '65%',
    },
  },
  textplateTypename: {
    textTransform: 'uppercase',
    userSelect: 'none',
  },
}))

const PodcastChannelImage = ({classes, imageUrl}) => (
  <div className={classes.logoImageContainer}>
    <Square className={classes.logoImageSquare}>
      <img className={classes.logoImage} src={imageUrl} />
    </Square>
  </div>
)

const TextPlate = ({classes, title, description}) => (
  <div className={classes.textplate}>
    <div className={classes.textplateTypename}>
      Podcast Listing
    </div>
    <div className={cx(classes.textplateTitleRow, classes.accentColor)}>
      {title}
    </div>
    <div className={classes.textplateDescription}>
      {description}
    </div>
  </div>
)

const Content = ({podcast}) => {
  const maybePodcastColor = podcast?.color // no such data atm

  const classes = useStyles({accentColor: maybePodcastColor ?? colors.white80})

  const {rss} = usePodcast(podcast, {forceRevalidate: true})

  const imageUrl = rssSelectors.channelSelectors.v2.imageUrl(rss)
  const title = rssSelectors.channelSelectors.v2.title(rss)
  const description = rssSelectors.channelSelectors.v2.description(rss)
  const items = rssSelectors.channelSelectors.v2.items(rss)

  const strippedDescription = React.useMemo(
    () => stripHtml(description),
    description
  )

  const firstItem = items?.[0]
  const firstItemAudioUrl = rssSelectors.itemSelectors.v2.audioUrl(firstItem)
  const firstItemAudioDuration = rssSelectors.itemSelectors.v2.duration(firstItem)
  const firstItemTitle = rssSelectors.itemSelectors.v2.title(firstItem)

  const audioPodcastId = useSelector(selectors.getAudioPodcastId)
  const audioMode = useSelector(selectors.getAudioMode)

  const isSelectedAudio = audioPodcastId === podcast?.id
  const isPlaying = isSelectedAudio && audioMode === storeConstants.AUDIO_MODE_PLAY

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
    <ContentLayout
      accentColor={podcast.color}
      renderTopLeft={
        () => (<PodcastChannelImage classes={classes} imageUrl={imageUrl} />)
      }
      renderTopRight={
        () => (<TextPlate classes={classes} title={title} description={strippedDescription} />)
      }>
      <BottomBlock accentColor={maybePodcastColor}>
        <div className={classes.items}>
          {
            (() => {
              if (!items || !items.map) return null

              // Here the React key is inadvisably the track offset
              // in the list, it's not great and is strictly as good
              // as the Next-Track feature...
              let itemIndex = -1

              return items.map(
                item => (
                  <Item
                    key={itemIndex++}
                    podcastId={podcast?.id}
                    podcastUrl={podcast?.url}
                    item={item}
                    itemIndex={itemIndex}
                  />
                )
              )
            })()
          }
        </div>
      </BottomBlock>
    </ContentLayout>
  )
}

export default Content
