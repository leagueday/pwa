import React from 'react'
import Color from 'color'
import { useDispatch } from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import usePodcast from '../api/usePodcast'
import { channelSelectors } from '../model/rss'
import { actions } from '../store'
import Square from './Square'

const BACKGROUND_COLOR = colors.black

const transparent = Color(BACKGROUND_COLOR).fade(1).string()
const opaque = BACKGROUND_COLOR
const opacityRamp = `linear-gradient(${transparent}, ${transparent} 90%, ${opaque})`

const useStyles = makeStyles(theme => ({
  podcastTile: {
    cursor: 'pointer',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    //height: '12em',
    maxHeight: '100%',
    maxWidth: '100%',
    minHeight: 0,
    minWidth: 0,
    // position: 'relative',
    userSelect: 'none',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    // minHeight: '8em',
    // minWidth: '8em',
    // width: '11vw',
    // height: '11vw',
  },
  imageOpacityRamp: {
    background: opacityRamp,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
  },
  imageSquare: {
    width: '100%',
  },
  text: ({textColor}) => ({
    color: textColor,
    fontSize: '75%',
    fontWeight: theme.typography.weight.bold,
    height: '100%',
    textOverflow: 'ellipsis',
    width: '100%',
    display: 'inline-flex',
  }),
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '15%',
    overflow: 'hidden',
    paddingLeft: '0.25em',
    paddingRight: '0.25em',
  }
}))

const PodcastTile = ({podcast, textColor}) => {
  const {rss} = usePodcast(podcast)

  const title = rss ? channelSelectors.v2.title(rss) : podcast.title
  const imageUrl = channelSelectors.v2.imageUrl(rss)

  const classes = useStyles({textColor})

  const dispatch = useDispatch()
  const gotoThisPodcast = () => dispatch(actions.pushHistory(`/podcast/${podcast.id}`))

  return (
    <div className={classes.podcastTile} onClick={gotoThisPodcast}>
      <Square className={classes.imageSquare}>
        <div className={classes.imageOpacityRamp} />
        <img className={classes.image} src={imageUrl} />
      </Square>
      <div className={classes.textBox}>
        <div className={classes.text}>
          {title}
        </div>
      </div>
    </div>
  )
}

export default PodcastTile
