import React from 'react'

import * as colors from '../styling/colors'
import * as typography from '../styling/typography'
import usePodcastImage from '../api/usePodcastImage'

// text alt while loading
// <div style={{color: colors.lightCharcoal, fontFamily: typography.mono, fontSize: '50%'}}>{podcast.url}</div>
const LazyPodcastTitleImage = ({className, podcast}) => {
  const {blob} = usePodcastImage(podcast)

  return blob ? (
    <img className={className} src={URL.createObjectURL(blob)} />
  ) : (
    <img className={className} src="/img/1024.png" />
  )
};

export default LazyPodcastTitleImage
