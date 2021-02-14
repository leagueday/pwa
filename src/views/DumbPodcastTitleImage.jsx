import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { channelSelectors } from '../model/rss'

const useStyles = makeStyles({
  dumbTitleImageBackground: {
    backgroundImage: 'url("/img/1024.png")',
    backgroundSize: 'cover',
    height: '100%',
  },
})

const DumbPodcastTitleImage = ({className, podcastRss}) => {
  const classes = useStyles()

  const channelImageUrl = channelSelectors.v2.imageUrl(podcastRss)

  return (
    <div className={classes.dumbTitleImageBackground}>
      { channelImageUrl && (<img className={className} src={channelImageUrl} />) }
    </div>
  )
}

export default DumbPodcastTitleImage
