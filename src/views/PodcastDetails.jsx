import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { getSelectedPodcast } from '../store/selectors'
import { channelSelectors } from '../model/rss'
import usePodcast from '../api/usePodcast'

import LazyPodcastTitleImage from './LazyPodcastTitleImage'

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

  const description = channelSelectors.v2.description(rss)
  const language = channelSelectors.v2.language(rss)
  const title = channelSelectors.v2.title(rss)

  return (
    <div className={classes.container}>
      <div className={classes.titleLine}>
        <div className={classes.imageContainer}>
          <LazyPodcastTitleImage className={classes.image} podcast={selectedPodcast} />
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
