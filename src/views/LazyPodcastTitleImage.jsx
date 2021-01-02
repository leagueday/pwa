import React from 'react'

import usePodcastImage from '../api/usePodcastImage'

const LazyPodcastTitleImage = ({className, podcast}) => {
  const {blob} = usePodcastImage(podcast)
  console.log('LPTI blob', blob)

  return blob ? (
    <img className={className} src={URL.createObjectURL(blob)} />
  ) : null
};

export default LazyPodcastTitleImage
