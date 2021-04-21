import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core'

import {colors} from '../styling'

const useStyles = makeStyles(theme => ({
  comingSoon: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
  },
  comingSoonRow: {
    alignItems: 'center',
    borderRadius: '1em',
    display: 'flex',
    height: '2em',
    minWidth: 0,
    padding: '0.35em 0.35em',
    [theme.breakpoints.up('sm')]: {
      backgroundColor: colors.brandBlack,
      color: colors.white80,
    },
    [theme.breakpoints.only('xs')]: {
      backgroundColor: colors.lightGray,
      color: colors.darkGray,
    },
  },
  logo: {
    display: 'block',
    maxHeight: '100%',
    width: 'auto',
  },
  logoContainer: {
    height: '100%',
  },
  text: {
    fontFamily: theme.typography.family.primary,
    fontSize: '100%',
    fontWeight: theme.typography.weight.bold,
    margin: '0 0.25em',
    textTransform: 'uppercase',
  },
}))

const ComingSoon = ({ className }) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.comingSoon, className)}>
      <div className={classes.comingSoonRow}>
        <div className={classes.logoContainer}>
          <img
            className={classes.logo}
            src="/img/logo_square_transparent.png"
          />
        </div>
        <div className={classes.text}>Coming Soon</div>
      </div>
    </div>
  )
}

export default ComingSoon
