import React from 'react'
import {useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Collapse from '@material-ui/core/Collapse'
import Hidden from '@material-ui/core/Hidden'

import * as colors from '../styling/colors'
import {constants as storeConsts, selectors, useFilter} from '../store'

import * as consts from './consts'
import { addScrollStyle } from './util'
import BasicLayout from './BasicLayout'
import FeaturedContent from './FeaturedContent'
import PodcastsGrid from './PodcastsGrid'
import SideNav from './SideNav'
import usePodcasts from '../api/usePodcasts'

const useStyles = makeStyles(theme => ({
  contentSection: {
    backgroundColor: colors.blackPlum,
    margin: '0.5em',
    padding: '0.5em',
  },
  horizontalCollapseContainer: addScrollStyle({
    maxHeight: '100%',
    overflowY: 'auto',
    transitionProperty: 'width',
    width: 0,
  }),
  horizontalCollapseEntered: {
    width: consts.SIDENAV_WIDTH,
  },
  horizontalCollapseHidden: {
    width: 0,
  },
  mainContent: addScrollStyle({
    flex: 1,
    maxHeight: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  }),
  mainSidenav: {
  },
}))

const HorizontalCollapse = props => {
  // As of material-ui version 5 this will be available with
  // <Collapse orientation="horizontal"> ...

  const classes = useStyles()

  return (
    <Collapse
      classes={{
        container: classes.horizontalCollapseContainer,
        entered: classes.horizontalCollapseEntered,
        hidden: classes.horizontalCollapseHidden,
      }}
      in={props.in}
      >
      {props.children}
    </Collapse>
  )
}

const PodcastsGridWithDefaultData = () => {
  const classes = useStyles()

  const {filteredData} = usePodcasts()

  return (
    <Card className={classes.contentSection}>
      <PodcastsGrid data={filteredData} />
    </Card>)
}

const MainScreen = () => {
  const classes = useStyles()

  const navVisibility = useSelector(selectors.getNavVisibility)

  const {kind: filterKind} = useFilter()

  // by default the sidenav is visible
  // although currently same category-filter feature is provided by menu and sidenav
  // the menu is by default closed
  const isSidenavVisible = navVisibility !== false

  return (
    <BasicLayout mode="main">
      <Hidden xsDown>
        <HorizontalCollapse in={isSidenavVisible}>
          <div className={classes.mainSidenav}>
            <SideNav />
          </div>
        </HorizontalCollapse>
      </Hidden>
      <div className={classes.mainContent}>
        {
          filterKind === storeConsts.FILTER_KIND_FEATURED
            ? (<FeaturedContent />)
            : (<PodcastsGridWithDefaultData />)
        }
      </div>
    </BasicLayout>
  )
}

export default MainScreen
