import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import PagedPodcastTiles from './PagedPodcastTiles'

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
  },
  title: {
    fontSize: '125%',
    fontWeight: theme.typography.weight.bold,
  },
}))

const FacetedPodcastTiles = ({data}) => {
  const classes = useStyles()

  const entries = data ? Array.from(data.entries()) : []

  let index = -1

  return (
    <div className={classes.facetedPodcastTiles}>
      {
        entries.map(
          ([title, podcasts]) => (
            <div key={index++} className={classes.tilesRowContainer}>
              <div className={classes.title}>
                {title}
              </div>
              <PagedPodcastTiles id={title} podcasts={podcasts} />
            </div>
          )
        )
      }
    </div>
  )
}

export default FacetedPodcastTiles
