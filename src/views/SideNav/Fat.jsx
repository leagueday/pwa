import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'

import {actions, selectors} from '../../store'
import {colors} from '../../styling'
import {addScrollStyle} from '../util'
import Expander from './Expander'
import LiveAndUpcomingLozenge from './LiveAndUpcomingLozenge'
import MyChannels from './MyChannels'
import MyPodcasts from './MyPodcasts'
import SearchLozenge from './SearchLozenge'
import SignInOutButton from './SignInOutButton'

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
    padding: '0.5vw',
    width: '100%',
  },
  expander: {
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    paddingTop: '0.5em',
  },
  logo: {
    cursor: ({home}) => home ? 'default' : 'pointer',
    display: 'block',
    width: '100%',
  },
  logoContainer: {
    flex: 2,
    paddingRight: '5%',
  },
  scroller: addScrollStyle(colors.blue, theme)({
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
    fontSize: 'max(min(1.6vw, 14px), 12px)',
    height: '100%',
    width: 'min(17%, 14em)',
  },
  signInOutButton: {
    fontSize: '80%',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  signInOutButtonContainer: {
    flex: 1.5,
    marginLeft: 'auto',
    paddingBottom: '0.25vw',
  },
}))

const FatSideNav = ({className, home}) => {
  const classes = useStyles(({home}))

  const dispatch = useDispatch()
  const goHome = home ? null : () => dispatch(actions.pushHistory('/'))

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

export default FatSideNav
