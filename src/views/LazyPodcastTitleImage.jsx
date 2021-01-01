import React from 'react'

import usePodcastImage from '../api/usePodcastImage'

const LazyPodcastTitleImage = ({className, podcast}) => {
  const {blob} = usePodcastImage(podcast)

  return blob ? (
    <img className={className} src={URL.createObjectURL(blob)} />
  ) : null
};

export default LazyPodcastTitleImage
