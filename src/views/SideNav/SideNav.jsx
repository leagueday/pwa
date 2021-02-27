import React from 'react'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'

import * as consts from '../consts'
import {addScrollStyle} from '../util'
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
  scroller: addScrollStyle(colors.blue)({
    flex: 1,
    marginRight: '0.5em',
    minHeight: 0,
    overflowY: 'auto',
    width: consts.SIDENAV_WIDTH,
  }),
  scrollerChild: {
    minHeight: '100%',
  },
  sideNav: {
    backgroundColor: colors.darkerGray,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
      <div className={classes.scroller}>
        <div className={classes.scrollerChild}>
          <Expander className={classes.expander} text="MY CHANNELS" tag="chan">
            <MyChannels />
          </Expander>
          <Expander className={classes.expander} text="MY PODCASTS" tag="poca">
            <MyPodcasts />
          </Expander>
        </div>
      </div>
    </div>
  )
}

export default SideNav
