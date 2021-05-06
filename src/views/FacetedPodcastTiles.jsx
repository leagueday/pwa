import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import PodcastTilesRow from './PodcastTilesRow'

const useStyles = makeStyles(theme => ({
  facetedPodcastTiles: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

const FacetedPodcastTiles = ({ data }) => {
  const classes = useStyles()
  let index = -1

  return (
    <div className={classes.facetedPodcastTiles}>
      {data.map(({ title }) => (
        <PodcastTilesRow
          key={index++}
          id={title}
          podcasts={data}
          title={title}
        />
      ))}
    </div>
  )
}

export default FacetedPodcastTiles
