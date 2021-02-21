import React from 'react'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import useContentVariation from '../api/useContentVariation'
import ContentTitleBar from './ContentTitleBar'

// const dumpMap = map => Array.from(map.entries())

const BANNER_IMAGE_URL_KEY = 'home_banner_img_url'
const BANNER_TITLE_TEXT_KEY = 'home_banner_title_text'
const BANNER_TEXT_KEY = 'home_banner_text'
const PRIMARY_COLOR_KEY = 'home_primary_color'

const PRIMARY_COLOR_DEFAULT = colors.darkGray

const getColor = defaultColor => colorName => {
  if (!colorName) return defaultColor

  return colors[colorName] ?? colorName
}

const useStyles = makeStyles(theme => ({
  bannerImageGroup: ({bannerImageUrl}) => ({
    alignItems: 'flex-start',
    background: `url(${bannerImageUrl})`,
    display: 'flex',
    flexDirection: 'column',
    height: '360px',
    justifyContent: 'flex-end',
    width: '1108px',
  }),
  bannerImageText: ({primaryColor}) => ({
    fontSize: '90%',
  }),
  bannerImageTextGroup: ({primaryColor}) => ({
    alignItems: 'flex-start',
    background: `${Color(primaryColor).fade(0.1).darken(0.65).toString()}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: '0.5em',
    paddingLeft: '0.33em',
    paddingTop: '0.5em',
    width: '100%',
  }),
  bannerImageTitle: ({primaryColor}) => ({
    color: primaryColor,
  }),
}))

const HomeScreenContent = () => {
  const {data: contentVariation} = useContentVariation()

  // console.log('CV', dumpMap(contentVariation))

  const [
      bannerImageUrl,
      bannerTitleText,
      bannerText,
      primaryColor,
    ] = React.useMemo(
      () => [
        contentVariation.get(BANNER_IMAGE_URL_KEY),
        contentVariation.get(BANNER_TITLE_TEXT_KEY),
        contentVariation.get(BANNER_TEXT_KEY),
        getColor(PRIMARY_COLOR_DEFAULT)(contentVariation.get(PRIMARY_COLOR_KEY)),
      ],
      [contentVariation]
    )

  const classes = useStyles({primaryColor, bannerImageUrl})

  return (
    <div className={classes.homeContent}>
      <ContentTitleBar text="Home" primaryColor={primaryColor} />
      <div className={classes.bannerImageGroup}>
        <div className={classes.bannerImageTextGroup}>
          <div className={classes.bannerImageTitle}>{bannerTitleText}</div>
          <div className={classes.bannerImageText}>{bannerText}</div>
        </div>
      </div>
    </div>
  )
}

export default HomeScreenContent
