import React from 'react'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'

import Expander from './Expander'
import LiveAndUpcomingLozenge from './LiveAndUpcomingLozenge'
import MyChannels from './MyChannels'
import MyPodcasts from './MyPodcasts'
import SearchLozenge from './SearchLozenge'

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  expander: {
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    paddingTop: '0.5em',
  },
  sideNav: {
    backgroundColor: colors.darkerGray,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    paddingBottom: '0.5em',
    paddingTop: '0.5em',
    width: '100%',
  },
}))

const SideNav = () => {
  const classes = useStyles()

  return (
    <div className={classes.sideNav}>
      <SearchLozenge />
      <LiveAndUpcomingLozenge className={classes.lozenge} />
      <div className={classes.inset}>
        <Expander className={classes.expander} text="MY CHANNELS" tag="chan">
          <MyChannels />
        </Expander>
        <Expander className={classes.expander} text="MY PODCASTS" tag="poca">
          <MyPodcasts />
        </Expander>
      </div>
    </div>
  )
}

export default SideNav
