import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import * as typography from '../styling/typography'

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.grey['700'],
    fontFamily: typography.serif,
    fontSize: '50%',
    margin: '0.25em',
    padding: '0.25em',
    userSelect: 'none',
  },
  cats: {
  },
  feed: {
    fontWeight: 600,
    marginBottom: '0.25em',
  },
  feedLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:active': {
      color: theme.palette.action.active,
    },
    '&:hover': {
      cursor: 'pointer',
    },
    '&:visited': {
    },
  },
  name: {
  }
}))

const PodcastFeedCard = ({podcastFeed}) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <div className={classes.feed}>
        <a className={classes.feedLink} href={podcastFeed.feed}>{podcastFeed.name}</a>
      </div>
      <div className={classes.cats}>
        {`${podcastFeed.category} / ${podcastFeed.subCategory}`}
      </div>
    </Card>
  )
}

export default PodcastFeedCard
