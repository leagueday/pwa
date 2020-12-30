import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import usePodcasts from '../api/usePodcasts'

const useStyles = makeStyles(theme => ({
  category: {
    color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5em',
  }
}))

const Item = ({cat}) => {
  const classes = useStyles()

  return (
    <div className={classes.category}>
      {cat}
    </div>
  )
}

const SidenavCategories = () => {
  const classes = useStyles()

  const {categories} = usePodcasts()

  if (!categories) return null

  return (
    <Card className={classes.container}>
      {
        categories.filter(cat => cat !== 'Uncategorized').map(
          cat => (<Item key={cat} cat={cat} />)
        )
      }
    </Card>
  )
}

export default SidenavCategories
