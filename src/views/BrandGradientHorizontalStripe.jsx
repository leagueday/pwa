import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import { colors } from '../styling'

const useStyles = makeStyles(theme => ({
  brandGradientHorizontalStripe: {
    position: 'relative',
    zIndex: 0,
    background: `linear-gradient(90deg, ${colors.cyan} 0%, ${colors.magenta} 50%, ${colors.yellow} 100%)`,
    height: '.5vw',
    width: '100%',
  },
}));

const BrandGradientHorizontalStripe = ({ className }) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.brandGradientHorizontalStripe, className)} />
  )
}

export default BrandGradientHorizontalStripe;