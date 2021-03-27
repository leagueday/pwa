import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core'

import * as colors from '../../styling/colors'
import {actions, selectors} from '../../store'
import {makeIconButton} from '../IconButton'

import {IcoMenu} from '../icons'

const MenuButton = makeIconButton(IcoMenu)

const useStyles = makeStyles(theme => ({
  appBar: {
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: '0 2vw',
  },
  logo: {
    display: 'block',
    height: 'auto',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  logoContainer: {
    width: '8vw',
  },
  menuButton: { },
  menuButtonContainer: {
    marginLeft: 'auto',
  },
  title: {
    padding: '0 2vw',
  },
}))

//
const XsAppBar = ({className, home}) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  // for xs nav is by default closed
  const isNavVisible = true === useSelector(selectors.getNavVisibility)

  const toggleNavVisibility = isNavVisible ? () => dispatch(actions.hideNav()) : () => dispatch(actions.showNav())

  const maybeGoHome = home ? null : () => dispatch(actions.pushHistory('/'))

  return (
    <div className={cx(classes.appBar, className)}>
      <div className={classes.logoContainer} onClick={maybeGoHome}>
        <img className={classes.logo} src="/img/logo_square_transparent.png" />
      </div>
      <div className={classes.title} onClick={maybeGoHome}>
        LeagueDay
      </div>
      <div className={classes.menuButtonContainer}>
        <MenuButton className={classes.menuButton} strokeWidth={3} onClick={toggleNavVisibility}/>
      </div>
    </div>
  )
}

export default XsAppBar
