import React from 'react'

import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'

import * as colors from '../styling/colors'
import * as typography from '../styling/typography'
import * as actions from '../store/actions'
import { channelSelectors } from '../model/rss'
import usePodcast from '../api/usePodcast'

import LazyPodcastTitleImage from './LazyPodcastTitleImage'

const useStyles = makeStyles(theme => ({
  card: {
    border: `1px solid ${colors.darkGreen}`,
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0.1em',
    minHeight: '4em',
    userSelect: 'none',
  },
  cardContent: {
    backgroundColor: colors.darkCharcoal,
    display: 'flex',
    flexDirection: 'row',
  },
  cardText: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 1,
    flexDirection: 'column',
    maxWidth: '100%',
    overflowX: 'hidden',
    padding: '0.5em',
    width: '100%',
  },
  foregroundImage: {
    bottom: '-4px',
    height: '3.9em',
    left: '0px',
    position: 'absolute',
    right: '-4px',
    top: '0px',
    width: '3.9em',
  },
  foregroundImageContainer: {
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: '6px',
    flexGrow: 0,
    flexShrink: 0,
    height: '4em',
    overflow: 'hidden',
    padding: '0.15em',
    position: 'relative',
    width: '4em',
  },
  foregroundImageVertGloss: {
    background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 5%, rgba(255,255,255,0.1) 9%, rgba(255,255,255,0.1) 93%, rgba(255,255,255,0.4) 98%, rgba(96,96,96,0.5) 100%)',
    bottom: 0,
    height: '4em',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '4em',
  },
  foregroundImageHorizGloss: {
    background: 'linear-gradient(270deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 5%, rgba(255,255,255,0.1) 9%, rgba(255,255,255,0.1) 93%, rgba(255,255,255,0.4) 98%, rgba(96,96,96,0.5) 100%)',
    bottom: 0,
    height: '4em',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '4em',
  },
  language: {
    color: theme.palette.text.secondary,
    fontFamily: typography.mono,
    fontSize: '75%',
  },
  title: {
    color: theme.palette.text.secondary,
    fontFamily: typography.serif,
    fontSize: '75%',
    fontWeight: theme.typography.fontWeightBold,
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
}))

// const makeSelectPodcast = (dispatch, podcast) => () => {
//   dispatch(selectPodcast(podcast))
// }

const PodcastCard = ({podcast}) => {
  const {rss, error: podcastError} = usePodcast(podcast)

  const classes = useStyles()

  const title = channelSelectors.v2.title(rss)
  const language = channelSelectors.v2.language(rss)

  const dispatch = useDispatch()
  const selectThis = () => dispatch(actions.selectPodcast(podcast))

  return (
    <div className={classes.card} onClick={selectThis}>
      <div className={classes.cardContent}>
        <div className={classes.foregroundImageContainer}>
          <LazyPodcastTitleImage className={classes.foregroundImage} podcast={podcast} />
          <div className={classes.foregroundImageVertGloss} />
          <div className={classes.foregroundImageHorizGloss} />
        </div>
        <div className={classes.cardText}>
          <div className={classes.title}>
            {title}
          </div>
          <div className={classes.language}>
            {language}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodcastCard
