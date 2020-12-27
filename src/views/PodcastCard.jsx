import React from 'react'

import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'

import * as typography from '../styling/typography'

import { selectPodcast } from '../store/actions'

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.grey['700'],
    cursor: 'pointer',
    fontFamily: typography.serif,
    fontSize: '85%',
    margin: '0.25em',
    padding: '0.25em',
    userSelect: 'none',
  },
  cardContent: {
    padding: '0.5em',
  },
  cats: {
    color: theme.palette.grey[400],
    fontSize: '85%',
  },
  podcast: {
    marginBottom: '0.25em',
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
}))

const makeSelectPodcast = (dispatch, podcast) => () => {
  console.log(podcast)

  dispatch(selectPodcast(podcast))
}

const PodcastCard = ({podcast}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  return (
    <CardActionArea onClick={makeSelectPodcast(dispatch, podcast)}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.podcast}>
            {podcast.name}
          </div>
          <div className={classes.cats}>
            {`${podcast.category} / ${podcast.subCategory}`}
          </div>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}

export default PodcastCard
