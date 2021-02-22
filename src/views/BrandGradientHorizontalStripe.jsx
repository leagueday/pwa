import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import * as consts from './consts'

const useStyles = makeStyles(theme => ({
  brandGradientHorizontalStripe: {
    background: `linear-gradient(90deg, ${colors.cyan} 0%, ${colors.magenta} 50%, ${colors.yellow} 100%)`,
    height: consts.STRIPE_HEIGHT,
    width: '100%',
  },
}))

const BrandGradientHorizontalStripe = () => {
  const classes = useStyles()

  return (<div className={classes.brandGradientHorizontalStripe} />)
}

export default BrandGradientHorizontalStripe
