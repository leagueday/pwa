import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import SideNavCategories from './SideNavCategories'
import SideNavGameboard from './SideNavGameboard'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    padding: '0.5em',
  },
  spacer: {
    minHeight: '1em',
  }
}))

const SideNav = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <SideNavGameboard />
      <div className={classes.spacer} />
      <SideNavCategories />
    </div>
  )
}

export default SideNav
