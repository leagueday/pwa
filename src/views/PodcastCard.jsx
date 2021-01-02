import React from 'react'

import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'

import * as typography from '../styling/typography'
import { selectPodcast } from '../store/actions'
import usePodcastImage from '../api/usePodcastImage'

import LazyPodcastTitleImage from './LazyPodcastTitleImage'

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.common.white,
    cursor: 'pointer',
    fontFamily: typography.serif,
    fontSize: '85%',
    margin: '0.25em',
    // padding: '0.25em',
    paddingTop: '100%',
    userSelect: 'none',
    '&:before': {
      content: '""',
      backgroundImage: ({podcastImageBlob}) =>
        podcastImageBlob ? `url(${URL.createObjectURL(podcastImageBlob)})` : null,
      backgroundSize: 'contain',
      bottom: '0px',
      left: '0px',
      margin: '0.25em',
      opacity: '0.65',
      position: 'absolute',
      right: '0px',
      top: '0px',
    },
  },
  card2: {
    height: '15em',
    minHeight: '14em',
    width: '15em',
  },
  cardContent: {
    minHeight: '15em',
    padding: '0.5em',
  },
  cats: {
    color: theme.palette.grey[400],
    fontSize: '85%',
  },
  podcast: {
    marginBottom: '0.25em',
  },
  podcastImage: {
    minHeight: '14em',
  },
  podcastLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:active': {
      color: theme.palette.action.active,
    },
    '&:hover': {
      cursor: 'pointer',
    },
    '&:visited': {},
  },
  square: {
    display: 'flex',
    paddingTop: '100%',
  },
  squareContent: {
    bottom: '0px',
    left: '0px',
    paddingTop: '100%',
    position: 'absolute',
    right: '0px',
    top: '0px',
  },
  squareImage: {
    content: '""',
    backgroundImage: ({podcastImageBlob}) =>
      podcastImageBlob ? `url(${URL.createObjectURL(podcastImageBlob)})` : null,
    backgroundSize: 'contain',
    bottom: '0px',
    left: '0px',
    opacity: '0.65',
    paddingTop: '100%',
    position: 'absolute',
    right: '0px',
    top: '0px',
  },
  squareWrap: {
    minHeight: '14em',
    position: 'relative',
  },
  stupidHeader: {
    fontFamily: typography.serif,
    fontSize: '80%',
    fontWeight: theme.typography.fontWeightBold,
  },
  stupidJoke: {
    fontSize: '80%',
    fontStyle: 'oblique',
    fontWeight: theme.typography.fontWeightLight,
    marginTop: '0.5em',
  },
}))

const makeSelectPodcast = (dispatch, podcast) => () => {
  dispatch(selectPodcast(podcast))
}

// <PodcastImageCard podcast={podcast} podcastImageBlob={podcastImageBlob} />
// <div className={classes.squareWrap}>
//   <div className={classes.squareImage}></div>
//   <div className={classes.squareContent}>
//     <div className={classes.podcast}>
//       {podcast.name}
//     </div>
//     <div className={classes.cats}>
//       {`${podcast.category} / ${podcast.subCategory}`}
//     </div>
//   </div>
// </div>

const PodcastCard = ({podcast}) => {
  // const {blob: podcastImageBlob} = usePodcastImage(podcast)
  // const classes = useStyles({podcastImageBlob})
  // <LazyPodcastTitleImage className={null} podcast={podcast} />

  const classes = useStyles()

  const [stupid, setStupid] = React.useState()

  React.useEffect(
    () => {
        fetch("/.netlify/functions/node-fetch", { headers: { accept: "Accept: application/json" } })
        .then((x) => x.json())
        .then(({ msg }) => setStupid(msg))
    },
    []
  )

  return (
    <Card>
      <CardContent>
        <div className={classes.stupidHeader}>
          A stupid joke verifies the netlify function is working
        </div>
        <div className={classes.stupidJoke}>
          {stupid}
        </div>
      </CardContent>
    </Card>
  )
}

export default PodcastCard
