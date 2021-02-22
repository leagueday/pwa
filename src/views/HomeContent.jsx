import React from 'react'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import ContentTitleBar from './ContentTitleBar'
import HomeBanner from './HomeBanner'

const PRIMARY_COLOR = colors.magenta

const getColor = defaultColor => colorName => {
  if (!colorName) return defaultColor

  return colors[colorName] ?? colorName
}

const useStyles = makeStyles(theme => ({
  homeContent: {
  },
}))

const HomeScreenContent = () => {
  const classes = useStyles()

  return (
    <div className={classes.homeContent}>
      <ContentTitleBar text="Home" primaryColor={PRIMARY_COLOR} />
      <HomeBanner primaryColor={PRIMARY_COLOR} />
    </div>
  )
}

export default HomeScreenContent
