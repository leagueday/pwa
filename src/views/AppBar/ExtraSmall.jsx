import React from 'react'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core'

import * as colors from '../../styling/colors'
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
  menuButtonContainer: {
    marginLeft: 'auto',
  },
  title: {
    padding: '0 2vw',
  },
}))

//
const XsAppBar = ({className, home}) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.appBar, className)}>
      <div className={classes.logoContainer}>
        <img className={classes.logo} src="/img/logo_square_transparent.png" />
      </div>
      <div className={classes.title}>
        LeagueDay
      </div>
      <div className={classes.menuButtonContainer}>
        <MenuButton className={classes.menuButton} strokeWidth={3} />
      </div>
    </div>
  )
}

export default XsAppBar
