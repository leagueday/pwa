import React from 'react'

import * as colors from '../styling/colors'
import * as typography from '../styling/typography'
import usePodcastImage from '../api/usePodcastImage'

const LazyPodcastTitleImage = ({className, podcast}) => {
  const {blob} = usePodcastImage(podcast)

  return blob ? (
    <img className={className} src={URL.createObjectURL(blob)} />
  ) : (
    <div style={{color: colors.lightCharcoal, fontFace: typography.mono, fontSize: '50%'}}>{podcast.url}</div>
  )
};

export default LazyPodcastTitleImage
