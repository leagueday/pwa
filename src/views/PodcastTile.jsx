import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import usePodcast from '../api/usePodcast'
import { channelSelectors } from '../model/rss'

const useStyles = makeStyles(theme => ({
  podcastTile: {
    backgroundColor: 'darkgrey',
    height: '12em',
    marginRight: '0.5em',
    overflow: 'hidden',
    width: '18em',
    ['&:last-child']: {
      marginRight: 0,
    },
  },
}))

const PodcastTile = ({podcast}) => {
  const {rss} = usePodcast(podcast)

  const title = rss ? channelSelectors.v2.title(rss) : podcast.title
  const channelImageUrl = channelSelectors.v2.imageUrl(rss)

  const classes = useStyles({channelImageUrl})

  return (
    <div className={classes.podcastTile}>
      {title}
    </div>
  )
}

export default PodcastTile
