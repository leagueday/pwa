import React from 'react'

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  podcastListing: {

  },
}))

const PodcastListing = ({podcastId}) => {
  const classes = useStyles()

  return (
    <div className={classes.podcastListing}>
      podcast listing
    </div>
  )
}

export default PodcastListing
