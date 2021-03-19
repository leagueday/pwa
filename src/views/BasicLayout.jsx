import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import { selectors } from '../store'
import AudioControls from './AudioControls'
import BrandGradientHorizontalStripe from './BrandGradientHorizontalStripe'
import SideNav from './SideNav'

// BasicLayout
//
// * nothing in here should scroll
// * this is like a full screen view (capped to the container)
// * whatever might scroll is more granular and within the children

// const getCalcContentHeight = (viewportHeight, isAudioControlsHidden) => {
//   const stripesHeight = isAudioControlsHidden ? consts.STRIPE_HEIGHT : `2 * ${consts.STRIPE_HEIGHT}`
//   const commonPart = `${viewportHeight} - ${stripesHeight}`
//
//   return `calc(${commonPart}` +
//     (isAudioControlsHidden ? '' : ` - ${consts.AUDIO_CONTROLS_HEIGHT}`) + ')'
// }
//
// const calcContentHeight =
//   isAudioControlsHidden =>
//     ({viewportHeight}) => getCalcContentHeight(viewportHeight, isAudioControlsHidden)

const useStyles = makeStyles(theme => ({
  basicLayoutCol: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    width: '100%',
  },
  basicLayoutRow: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    minHeight: 0,
  },
  contentFrame: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: '100%',
    justifyContent: 'flex-start',
    overflowY: 'hidden',
    paddingLeft: '0.5em',
    width: '100%',
  },
  sideNav: { },
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
            <div>
              <SideNav className={classes.sideNav} isHome={props.isHome} />
            </div>
          ) }
        </Hidden>
        <div className={classes.contentFrame}>
          {props.children}
        </div>
      </div>
      { isAudioDisplayed && (
        <>
          <BrandGradientHorizontalStripe />
          <AudioControls />
        </>
      ) }
    </div>
  )
}

export default BasicLayout
