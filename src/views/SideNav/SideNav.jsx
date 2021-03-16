import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import {actions, selectors} from '../../store'
import useContentVariation from '../../api/useContentVariation'
import * as consts from '../consts'
import {addScrollStyle} from '../util'
import { IcoHome } from '../icons'
import {makeIconButton} from '../IconButton'
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
    padding: '0.5em',
  },
  expander: {
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    paddingTop: '0.5em',
  },
  logo: {
    flex: 1,
    minWidth: 0,
    maxWidth: '8em',
    paddingLeft: '0.25em',
  },
  scroller: addScrollStyle(colors.blue)({
    flex: 1,
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
    width: '100%',
  },
  signInOutButton: {
    marginLeft: 'auto',
  },
}))

const HomeButton = makeIconButton(IcoHome)

const SideNav = ({className}) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const goHome = () => dispatch(actions.pushHistory('/'))

  const userData = useSelector(selectors.getUserData)

  const config = useContentVariation().map

  return (
    <div className={cx(classes.sideNav, className)}>
      <div className={classes.controls}>
        <HomeButton onClick={goHome}
                    size="2em"
                    color={colors.cyan}
                    backgroundColor={colors.brandBlack} />
        <img className={classes.logo} src="/img/logo.png" />
        <SignInOutButton className={classes.signInOutButton} />
      </div>
      <SearchLozenge />
      <LiveAndUpcomingLozenge className={classes.lozenge} />
      <div className={classes.scroller}>
        <div className={classes.scrollerChild}>
          <Expander className={classes.expander} text="MY CHANNELS" tag="chan">
            <MyChannels cutoff={config?.get('channelsCutoff')} />
          </Expander>
          {userData && (
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
