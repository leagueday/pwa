import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import PodcastTile from './PodcastTile'

const useStyles = makeStyles(theme => ({
  facetedPodcastTiles: {
    display: 'flex',
    flexDirection: 'column',
  },
  tile: {
    flex: 1,
    marginRight: '1%',
    width: '16.667%', // 100/6
    ['&:last-child']: {
      marginRight: 0,
    },
  },
  tilesRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '0.5em',
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

  const nextColor = (
    (colorList, offset) => () => {
      const result = colorList[offset]
      offset = offset + 1 === colorList.length ? 0 : offset + 1
      return result
    }
  )([colors.cyan, colors.blue, colors.violet, colors.magenta, colors.orange, colors.yellow], 0)

  return (
    <div className={classes.facetedPodcastTiles}>
      {
        entries.map(
          ([title, podcasts]) => (
            <div key={title} className={classes.tilesRowContainer}>
              <div className={classes.title}>
                {title}
              </div>
              <div className={classes.tilesRow}>
                {
                  podcasts.map(
                    podcast => (
                      <div key={podcast.id} className={classes.tile}>
                        <PodcastTile
                          podcast={podcast}
                          textColor={nextColor()}
                        />
                      </div>
                      )
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
