import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import {actions, selectors} from '../../store'
import {addScrollStyle} from '../util'
import {makeIconButton} from '../IconButton'
import Expander from './Expander'
import LiveAndUpcomingLozenge from './LiveAndUpcomingLozenge'
import MyChannels from './MyChannels'
import MyPodcasts from './MyPodcasts'
import SignInOutButton from './SignInOutButton'

import {IcoMagnifier} from '../icons'

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '0.5vw',
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
    margin: '1vw',
    width: '50%',
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
  searchButton: {
    backgroundColor: colors.darkGray,
    margin: '0.5vw',
  },
  sideNav: {
    alignItems: 'flex-start',
    backgroundColor: colors.darkerGray,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'max(min(1.6vw, 14px), 12px)',
    height: '100%',
    width: 'min(8%, 7em)',
  },
  signInOutButton: {
    fontSize: '75%',
  },
  signInOutButtonContainer: {
    paddingBottom: '0.25vw',
  },
}))

const SearchButton = makeIconButton(IcoMagnifier)

const SkinnySideNav = ({className, isHome}) => {
  const classes = useStyles(({isHome}))

  const dispatch = useDispatch()
  const goHome = isHome ? null : () => dispatch(actions.pushHistory('/'))

  const user = useSelector(selectors.getUser)

  return (
    <div className={cx(classes.sideNav, className)}>
      <div className={classes.control}>
        <img className={classes.logo} onClick={goHome} src="/img/logo_square_transparent.png" />
      </div>
      <div className={classes.control}>
        <div className={classes.signInOutButtonContainer}>
          <SignInOutButton className={classes.signInOutButton} />
        </div>
      </div>
      <div className={classes.control}>
        <SearchButton className={classes.searchButton} />
      </div>
      <LiveAndUpcomingLozenge className={classes.lozenge} skinny />
      <div className={classes.scroller}>
        <div className={classes.scrollerChild}>
          <Expander className={classes.expander} text="MY CHANNELS" tag="chan" skinny>
            <MyChannels skinny />
          </Expander>
          {user && (
            <Expander className={classes.expander} text="MY PODCASTS" tag="poca" skinny>
              <MyPodcasts skinny />
            </Expander>
          )}
        </div>
      </div>
    </div>
  )
}

export default SkinnySideNav
