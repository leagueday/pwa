import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import PodcastTilesRow from './PodcastTilesRow'

const useStyles = makeStyles(theme => ({
  facetedPodcastTiles: {
    display: 'flex',
    flexDirection: 'column',
  },
  tilesRowContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    maxWidth: '100%',
    paddingTop: '0.75em',
    [theme.breakpoints.only('xs')]: {
      paddingTop: '3vw',
    },
  },
  title: {
    fontSize: '125%',
    fontWeight: theme.typography.weight.bold,
    [theme.breakpoints.only('xs')]: {
      fontSize: '90%',
      fontWeight: theme.typography.weight.normal,
    },
  },
}))

const FacetedPodcastTiles = ({ data }) => {
  const classes = useStyles()

  const entries = data ? Array.from(data.entries()) : []

  let index = -1

  return (
    <div className={classes.facetedPodcastTiles}>
      {entries.map(([title, podcasts]) => (
        <div key={index++} className={classes.tilesRowContainer}>
          <div className={classes.title}>{title}</div>
          <PodcastTilesRow id={title} podcasts={podcasts} />
        </div>
      ))}
    </div>
  )
}

export default FacetedPodcastTiles
