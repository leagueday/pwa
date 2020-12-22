import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'

import usePodcasts from '../api/usePodcasts'

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.grey['400'],
  },
  catCard: {
    backgroundColor: theme.palette.grey['700'],
    fontSize: '80%',
    margin: '0.5em',
    padding: '0.25em',
    userSelect: 'none',
  },
  catCardCat: {
    whiteSpace: 'nowrap',
  },
  catCardSubcat: {
    fontSize: '90%',
    paddingLeft: '0',
  },
  catCardSubcats: {
    listStyleType: 'none',
    marginBlockEnd: '0.25em',
    marginBlockStart: '0.25em',
    paddingInlineStart: '1em',
    whiteSpace: 'nowrap',
  }
}))

const PodcastCategoriesList = () => {
  const classes = useStyles()

  const {categories, subCategories, error} = usePodcasts()

  return (<Card className={classes.card}>
    {
      categories && categories.map(
        cat => {
          const subcats = subCategories[cat]

          return (
            <Card key={cat} className={classes.catCard}>
              <Box className={classes.catCardCat} textOverflow="clip" overflow="hidden">
                {cat}
              </Box>
              <Box className={classes.catCardSubcatsDiv} textOverflow="clip" overflow="hidden">
                <ul className={classes.catCardSubcats}>
                  {
                    subcats && subcats.map(
                      subcat => (
                       <li key={subcat} className={classes.catCardSubcat}>
                         {subcat}
                       </li>
                      )
                    )
                  }
                </ul>
              </Box>
            </Card>
          )
        }
      )
    }
  </Card>)
}

export default PodcastCategoriesList
