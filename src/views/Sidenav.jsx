import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import SidenavCategories from './SidenavCategories'
import SidenavGameboard from './SidenavGameboard'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5em',
  },
  spacer: {
    minHeight: '1em',
  }
}))

const Sidenav = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <SidenavGameboard />
      <div className={classes.spacer} />
      <SidenavCategories />
    </div>
  )
}

export default Sidenav
