import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import PodcastTile from './PodcastTile'

const useStyles = makeStyles(theme => ({
  facetedPodcastTiles: {
    display: 'flex',
    flexDirection: 'column',
  },
  facetedPodcastTilesRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '0.5em',
  },
  facetedPodcastTilesRowContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '0.75em',
  },
  facetedPodcastTilesTitle: {
    fontSize: '125%',
    fontWeight: theme.typography.weight.bold,
  },
}))

const FacetedPodcastTiles = ({data}) => {
  const classes = useStyles()

  const entries = data ? Array.from(data.entries()) : []

  return (
    <div className={classes.facetedPodcastTiles}>
      {
        entries.map(
          ([title, podcasts]) => (
            <div key={title} className={classes.facetedPodcastTilesRowContainer}>
              <div className={classes.facetedPodcastTilesTitle}>
                {title}
              </div>
              <div className={classes.facetedPodcastTilesRow}>
                {
                  podcasts.map(
                    podcast => (<PodcastTile key={podcast.id} podcast={podcast} />)
                  )
                }
              </div>
            </div>
          )
        )
      }
    </div>
  )
}

export default FacetedPodcastTiles
