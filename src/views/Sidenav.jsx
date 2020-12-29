import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import PodcastCategoriesList from './PodcastCategoriesList'
import SidenavGameboard from './SidenavGameboard'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5em',
  },
}))

const Sidenav = () => {
  const classes = useStyles()

  return (
    <Card className={classes.container}>
      <SidenavGameboard />
      <PodcastCategoriesList />
    </Card>
  )
}

export default Sidenav
