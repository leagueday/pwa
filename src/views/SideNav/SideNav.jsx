import React from 'react'
import {useDispatch} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import {actions} from '../../store'
import * as consts from '../consts'
import {addScrollStyle} from '../util'
import { IcoHome } from '../icons'
import IconButton from '../IconButton'
import Expander from './Expander'
import LiveAndUpcomingLozenge from './LiveAndUpcomingLozenge'
import MyChannels from './MyChannels'
import MyPodcasts from './MyPodcasts'
import SearchLozenge from './SearchLozenge'

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  controls: {
    padding: '0.5em',
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

  const dispatch = useDispatch()
  const goHome = () => dispatch(actions.pushHistory('/'))

  return (
    <div className={classes.sideNav}>
      <div className={classes.controls}>
        <IconButton onClick={goHome}>
          <IcoHome />
        </IconButton>
      </div>
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
