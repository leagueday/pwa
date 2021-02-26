import React from 'react'
import {useDispatch} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import {channelSelectors} from '../../model/rss'
import useStarred from '../../api/useStarred'
import usePodcast from '../../api/usePodcast'
import usePodcasts from '../../api/usePodcasts'
import {actions} from '../../store'

const useStyles = makeStyles(theme => ({
  myPodcasts: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

const useItemStyles = makeStyles(theme => ({
  myPodcastsItem: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '0.5em',
    userSelect: 'none',
  },
  image: {
    border: `2px solid ${colors.white80}`,
    height: '1.5em',
    marginRight: '1em',
    width: '1.5em',
  },
  title: {
    color: colors.white80,
  },
}))

const MyPodcastsItem = ({onClick, podcast}) => {
  const classes = useItemStyles()

  const {rss} = usePodcast(podcast)
  const title = channelSelectors.v2.title(rss)
  const imageUrl = channelSelectors.v2.imageUrl(rss)

  return (
    <div className={classes.myPodcastsItem} onClick={onClick}>
      <img className={classes.image} src={imageUrl} />
      <div className={classes.title}>
        {title}
      </div>
    </div>
  )
}

const MyPodcasts = () => {
  const classes = useStyles()

  const [isStar,,,isStarsEmpty] = useStarred()
  const {data: podcasts} = usePodcasts()

  const starredPodcasts = isStarsEmpty ? [] : podcasts.filter(podcast => isStar(podcast.id))

  const dispatch = useDispatch()
  const makeGotoThisPodcast = podcastId => () => dispatch(actions.pushHistory(`/podcast/${podcastId}`))

  return (
    <div className={classes.myPodcasts}>
      {
        starredPodcasts.map(
          podcast => (
            <MyPodcastsItem
              key={podcast.id}
              onClick={makeGotoThisPodcast(podcast.id)}
              podcast={podcast}
            />
          )
        )
      }
    </div>
  )
}

export default MyPodcasts
