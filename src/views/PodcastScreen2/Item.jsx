import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { itemSelectors } from '../../model/rss'

const useStyles = makeStyles(theme => ({
  item: {
    backgroundColor: theme.palette.background.control,
    borderRadius: '4px',
    marginBottom: '0.25em',
  },
}))

const Item = ({podcastId, podcastUrl, item, itemIndex}) => {
  const classes = useStyles()

  const itemAudioUrl = itemSelectors.v2.audioUrl(item)
  const description = itemSelectors.v2.description(item)
  const duration = itemSelectors.v2.duration(item)
  const pubDate = itemSelectors.v2.pubDate(item)
  const title = itemSelectors.v2.title(item)

  return (
    <div className={classes.item}>
      {title}
    </div>
  )
}

export default Item
