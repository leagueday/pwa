import React from 'react'
import {useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import {selectors} from '../store'
import * as colors from '../styling/colors'

import * as consts from './consts'
import {addScrollStyle} from './util'
import BasicLayout from './BasicLayout'
import HomeContent from './HomeContent'
import SideNav from './SideNav'

const useStyles = makeStyles(theme => ({
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
  // const classes = useStyles()
  //
  // const navVisibility = useSelector(selectors.getNavVisibility)
  //
  // // by default the sidenav is visible
  // // although currently same category-filter feature is provided by menu and sidenav
  // // the menu is by default closed
  // const isSidenavVisible = navVisibility !== false

  /* {
      filterKind === storeConsts.FILTER_KIND_FEATURED
        ? (<CategorizedContent categoryFieldname="featuredDisplayCategory" rankFieldname="featuredDisplayRank"/>)
        : (<CategorizedContent />)
  } */

  return (
    <BasicLayout>
      <HomeContent />
    </BasicLayout>
  )
}

export default MainScreen
