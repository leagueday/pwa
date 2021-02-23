import React from 'react'
import {useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import {selectors} from '../store'
import * as colors from '../styling/colors'

import {addScrollStyle} from './util'
import BasicLayout from './BasicLayout'
import HomeContent from './HomeContent'
import SideNav from './SideNav'

const useStyles = makeStyles(theme => ({
  mainContent: {
    maxHeight: '100%',
    overflowY: 'hidden',
    width: '100%',
  },
  sideNavScroller: addScrollStyle(colors.blue)({
    marginRight: '0.5em',
    maxHeight: '100%',
    minHeight: '100%',
    overflowY: 'auto',
  }),
}))

// const HorizontalCollapse = props => {
//   // As of material-ui version 5 this will be available with
//   // <Collapse orientation="horizontal"> ...
//
//   const classes = useStyles()
//
//   return (
//     <Collapse
//       className={classes.fullHeight}
//       classes={{
//         container: classes.horizontalCollapseContainer,
//         entered: classes.horizontalCollapseEntered,
//         hidden: classes.horizontalCollapseHidden,
//       }}
//       in={props.in}
//       >
//       {props.children}
//     </Collapse>
//   )
// }

const MainScreen = () => {
  const classes = useStyles()

  const navVisibility = useSelector(selectors.getNavVisibility)

  // by default the sidenav is visible
  // although currently same category-filter feature is provided by menu and sidenav
  // the menu is by default closed
  const isSidenavVisible = navVisibility !== false

  /* {
      filterKind === storeConsts.FILTER_KIND_FEATURED
        ? (<CategorizedContent categoryFieldname="featuredDisplayCategory" rankFieldname="featuredDisplayRank"/>)
        : (<CategorizedContent />)
  } */

  return (
    <BasicLayout mode="main">
      <Hidden xsDown>
        { isSidenavVisible && (
          <div className={classes.sideNavScroller}>
            <SideNav />
          </div>
        ) }
      </Hidden>
      <div className={classes.mainContent}>
        <HomeContent />
      </div>
    </BasicLayout>
  )
}

export default MainScreen
