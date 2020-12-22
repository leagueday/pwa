import React from 'react'

import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'

import usePodcasts from '../api/usePodcasts'

const useStyles = makeStyles(theme => ({
  card: {
    marginRight: '1em',
  },
  catCard: {
    backgroundColor: theme.palette.grey['400'],
    color: theme.palette.grey['800'],
    fontSize: '80%',
    paddingLeft: '1em',
    userSelect: 'none',
  },
  catCardCat: {

  },
  catCardSubcat: {
    fontSize: '90%',
    paddingLeft: '0',
    '&:before': {
      content: '∙'
    },
  },
  catCardSubcats: {
    listStyleType: 'none',
    marginBlockStart: '0.25em',
    paddingInlineStart: '1em',
  }
}))

const PodcastCategoriesList = () => {
  const classes = useStyles()

  const {categories, subCategories, error} = usePodcasts()

  console.log('cats', JSON.stringify(categories))

  return (<Card className={classes.card}>
    {
      categories && categories.map(
        cat => {
          const subcats = subCategories[cat]

          return (
            <Card key={cat} className={classes.catCard}>
              <div className={classes.catCardCat}>
                {cat}
              </div>
              <div className={classes.catCardSubcatsDiv}>
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
              </div>
            </Card>
          )
        }
      )
    }
  </Card>)
}

export default PodcastCategoriesList
