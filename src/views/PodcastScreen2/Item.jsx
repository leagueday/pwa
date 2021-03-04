import React from 'react'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import { itemSelectors } from '../../model/rss'

const useStyles = makeStyles(theme => ({
  item: ({backgroundColor}) => ({
    backgroundColor,
    marginBottom: '0.25em',
  }),
}))

const computeBackgroundColor = index => {
  if (index & 1) return null

  return (
    normI => {
      const c = Color(colors.lightGray).fade(Math.max(normI, 0))
      return `rgba(${c.red()},${c.green()},${c.blue()},${c.alpha()})`
    }
  )(
    (100 - 10 * index / 2) / 100
  )
}

const Item = ({podcastId, podcastUrl, item, itemIndex}) => {
  const classes = useStyles({backgroundColor: computeBackgroundColor(itemIndex)})

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
