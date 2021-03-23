import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import {actions, selectors} from '../../store'
import * as consts from '../consts'
import {addScrollStyle} from '../util'
import Expander from './Expander'
import LiveAndUpcomingLozenge from './LiveAndUpcomingLozenge'
import MyChannels from './MyChannels'
import MyPodcasts from './MyPodcasts'
import SearchLozenge from './SearchLozenge'
import SignInOutButton from './SignInOutButton'

const SIDENAV_WIDTH = '17%'

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  controls: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'none',
    justifyContent: 'space-between',
    padding: '0.5em',
    width: '100%',
  },
  expander: {
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    paddingTop: '0.5em',
  },
  logo: {
    cursor: ({isHome}) => isHome ? 'default' : 'pointer',
    display: 'block',
    width: '100%',
  },
  logoContainer: {
    flex: 2,
    paddingRight: '5%',
  },
  scroller: addScrollStyle(colors.blue)({
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    width: '100%',
  }),
  scrollerChild: {
    minHeight: '100%',
    width: '100%',
  },
  sideNav: {
    backgroundColor: colors.darkerGray,
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.2vw',
    height: '100%',
    width: SIDENAV_WIDTH,
  },
  signInOutButton: {
    fontSize: '80%',
    width: '100%',
  },
  signInOutButtonContainer: {
    flex: 1.5,
    marginLeft: 'auto',
    paddingBottom: '0.25vw',
  },
}))

const SideNav = ({className, isHome}) => {
  const classes = useStyles(({isHome}))

  const dispatch = useDispatch()
  const goHome = isHome ? null : () => dispatch(actions.pushHistory('/'))

  const user = useSelector(selectors.getUser)

  return (
    <div className={cx(classes.sideNav, className)}>
      <div className={classes.controls}>
        <div className={classes.logoContainer}>
          <img className={classes.logo} onClick={goHome} src="/img/logo.png" />
        </div>
        <div className={classes.signInOutButtonContainer}>
          <SignInOutButton className={classes.signInOutButton} />
        </div>
      </div>
      <SearchLozenge />
      <LiveAndUpcomingLozenge className={classes.lozenge} />
      <div className={classes.scroller}>
        <div className={classes.scrollerChild}>
          <Expander className={classes.expander} text="MY CHANNELS" tag="chan">
            <MyChannels />
          </Expander>
          {user && (
            <Expander className={classes.expander} text="MY PODCASTS" tag="poca">
              <MyPodcasts />
            </Expander>
          )}
        </div>
      </div>
    </div>
  )
}

export default SideNav
