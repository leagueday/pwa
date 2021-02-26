import React from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import * as consts from './consts'
import { selectors } from '../store'
import AudioControls from './AudioControls'
import BrandGradientHorizontalStripe from './BrandGradientHorizontalStripe'
import SideNav from './SideNav'
import {addScrollStyle} from './util'
import * as colors from '../styling/colors'

// BasicLayout
//
// * nothing in here should scroll
// * this is like a full screen view (capped to the container)
// * whatever might scroll is more granular and within the children

const getCalcContentHeight = (viewportHeight, isAudioControlsHidden) => {
  const stripesHeight = isAudioControlsHidden ? consts.STRIPE_HEIGHT : `2 * ${consts.STRIPE_HEIGHT}`
  const commonPart = `${viewportHeight} - ${stripesHeight}`

  return `calc(${commonPart}` +
    (isAudioControlsHidden ? '' : ` - ${consts.AUDIO_CONTROLS_HEIGHT}`) + ')'
}

const calcContentHeight =
  isAudioControlsHidden =>
    ({viewportHeight}) => getCalcContentHeight(viewportHeight, isAudioControlsHidden)

const useStyles = makeStyles(theme => ({
  audioControls: {
    maxHeight: consts.AUDIO_CONTROLS_HEIGHT,
    minHeight: consts.AUDIO_CONTROLS_HEIGHT,
  },
  basicLayoutCol: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
  },
  basicLayoutRow: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
  },
  contentFrame: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    maxHeight: '100%',
    minHeight: '100%',
    overflowY: 'hidden',
    width: '100%',
  },
  contentWhenAudioDisplayed: {
    maxHeight: calcContentHeight(false),
    minHeight: calcContentHeight(false),
  },
  contentWhenAudioHidden: {
    maxHeight: calcContentHeight(true),
    minHeight: calcContentHeight(true),
  },
  sideNavScroller: addScrollStyle(colors.blue)({
    marginRight: '0.5em',
    maxHeight: '100%',
    minHeight: '100%',
    overflowY: 'auto',
    width: consts.SIDENAV_WIDTH,
  }),
}))

const BasicLayout = props => {
  const viewportHeight = useSelector(selectors.getViewportHeight)

  const classes = useStyles({viewportHeight})

  const audioItemUrl = useSelector(selectors.getAudioUrl)
  const isAudioDisplayed = !!audioItemUrl

  const navVisibility = useSelector(selectors.getNavVisibility)

  // by default the sidenav is visible
  // although currently same category-filter feature is provided by menu and sidenav
  // the menu is by default closed
  const isSidenavVisible = navVisibility !== false

  return (
    <div className={classes.basicLayoutCol}>
      <BrandGradientHorizontalStripe />
      <div className={classes.basicLayoutRow}>
        <Hidden xsDown>
          { isSidenavVisible && (
            <div className={classes.sideNavScroller}>
              <SideNav />
            </div>
          ) }
        </Hidden>
        <div className={classes.contentFrame}>
          <div
            className={
              isAudioDisplayed
                ? classes.contentWhenAudioDisplayed
                : classes.contentWhenAudioHidden
            }
          >
            {props.children}
          </div>
        </div>
      </div>
      { isAudioDisplayed && (
        <>
          <BrandGradientHorizontalStripe />
          <div className={classes.audioControls}>
            <AudioControls />
          </div>
        </>
      ) }
    </div>
  )
}

export default BasicLayout
