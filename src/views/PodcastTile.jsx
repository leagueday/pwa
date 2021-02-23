import React from 'react'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import usePodcast from '../api/usePodcast'
import { channelSelectors } from '../model/rss'

const BACKGROUND_COLOR = colors.black
const WIDTH = '9em'

const transparent = Color(BACKGROUND_COLOR).fade(1).string()
const opaque = BACKGROUND_COLOR
const opacityRamp = `linear-gradient(${transparent}, ${transparent} 90%, ${opaque})`

const useStyles = makeStyles(theme => ({
  podcastTile: {
    height: '12em',
    overflow: 'hidden',
    position: 'relative',
    userSelect: 'none',
    width: WIDTH,
  },
  image: {
    height: WIDTH,
    left: 0,
    position: 'absolute',
    top: 0,
    width: WIDTH,
  },
  imageContainer: {
    height: WIDTH,
    left: 0,
    position: 'absolute',
    top: 0,
    width: WIDTH,
  },
  imageOpacityRamp: {
    background: opacityRamp,
    height: WIDTH,
    left: 0,
    position: 'absolute',
    top: 0,
    width: WIDTH,
    zIndex: 100,
  },
  text: ({textColor}) => ({
    bottom: 0,
    color: textColor,
    fontSize: '75%',
    fontWeight: theme.typography.weight.bold,
    left: 0,
    paddingLeft: '0.25em',
    paddingRight: '0.25em',
    position: 'absolute',
    right: 0,
  }),
}))

const PodcastTile = ({podcast, textColor}) => {
  const {rss} = usePodcast(podcast)

  const title = rss ? channelSelectors.v2.title(rss) : podcast.title
  const imageUrl = channelSelectors.v2.imageUrl(rss)

  const classes = useStyles({imageUrl, textColor})

  return (
    <div className={classes.podcastTile}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={imageUrl} />
        <div className={classes.imageOpacityRamp} />
      </div>
      <div className={classes.text}>
        {title}
      </div>
    </div>
  )
}

export default PodcastTile
