import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { getSelectedPodcast } from '../store/selectors'
import usePodcast from '../api/usePodcast'

const useStyles = makeStyles({
  container: {
  },
  description: {
  },
  image: {
    height: '3em',
    width: '3em',
  },
  imageContainer: {
  },
  language: {
    marginTop: '1em',
  },
  title: {
    marginLeft: '1em',
  },
  titleLine: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  }
})

const PodcastDetails = () => {
  const classes = useStyles()

  const selectedPodcast = useSelector(getSelectedPodcast)

  const {error, rss} = usePodcast(selectedPodcast)

  // all of this follows the same RSS-2 heuristic approach as set up in SelectedPodcast

  const channelData = rss?.rss?.channel

  const {
    description,
    image,
    item,
    language,
    lastBuildDate,
    link,
    title,
  } = channelData ?? { }

  const imageUrl = image?.url

  return (
    <div className={classes.container}>
      <div className={classes.titleLine}>
        <div className={classes.imageContainer}>
          { imageUrl && (<img className={classes.image} src={imageUrl} alt={image.title}/>) }
        </div>
        <div className={classes.title}>
          {title}
        </div>
      </div>
      <div className={classes.description}>
        {description}
      </div>
      <div className={classes.language}>
        {language}
      </div>
    </div>
  )
}

export default PodcastDetails
