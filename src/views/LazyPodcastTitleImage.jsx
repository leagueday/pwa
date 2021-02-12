import React from 'react'

import usePodcastImage from '../api/usePodcastImage'

const LazyPodcastTitleImage = ({className, podcast}) => {
  const {blob} = usePodcastImage(podcast)

  return blob ? (
    <img className={className} src={URL.createObjectURL(blob)} />
  ) : (
    <img className={className} src="/img/1024.png" />
  )
};

export default LazyPodcastTitleImage
