import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import { selectors } from '../store'

import * as consts from './consts'
import AppBar from './AppBar'
import PodcastsGrid from './PodcastsGrid'
import SelectedPodcast from './SelectedPodcast'
import SideNav from './SideNav'

// BasicLayout
//
// * Donut scroll away the app bar
// * Lets just scroll what makes sense to scroll

const useStyles = makeStyles(theme => ({
  appBarContainer: {
    maxHeight: consts.APPBAR_HEIGHT,
    minHeight: consts.APPBAR_HEIGHT,
  },
  basicLayout: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    maxHeight: '100vh',
    minHeight: '100vh',
  },
  content: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    maxHeight: `calc(100vh - ${consts.APPBAR_HEIGHT})`,
    minHeight: `calc(100vh - ${consts.APPBAR_HEIGHT})`,
  },
  // contentWithNav: {  - tbd menu
  //   [theme.breakpoints.up('sm')]: {
  //     maxHeight: `calc(100vh - ${APPBAR_HEIGHT})`,
  //     minHeight: `calc(100vh - ${APPBAR_HEIGHT})`,
  //   },
  //   [theme.breakpoints.only('xs')]: {
  //     maxHeight: `calc(100vh - ${APPBAR_HEIGHT} - ${SMALLNAV_HEIGHT})`,
  //     minHeight: `calc(100vh - ${APPBAR_HEIGHT} - ${SMALLNAV_HEIGHT})`,
  //   },
  // },
  podcastsGridContainer: {
    flex: 1,
    maxHeight: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingTop: theme.spacing(1),
  },
  sideNavContainer: {
    maxHeight: '100%',
    overflowY: 'auto',
    paddingTop: '0.5em',
    width: consts.SIDENAV_WIDTH,
  },
}))

const BasicLayout = () => {
  const classes = useStyles()

  const showCategories = useSelector(selectors.getShowCategories)

  // by default the sidenav is visible
  // although currently same category-filter feature is provided by menu and sidenav
  // the menu is by default closed
  const isSidenavVisible = showCategories !== false

  return (
    <>
      <SelectedPodcast />
      <div className={classes.basicLayout}>
        <div className={classes.appBarContainer}>
          <AppBar />
        </div>
        <div className={classes.content}>
          <Hidden xsDown>
            { isSidenavVisible && (
                <div className={classes.sideNavContainer}>
                  <SideNav />
                </div>
              )
            }
          </Hidden>
          <div className={classes.podcastsGridContainer}>
              <PodcastsGrid />
          </div>
        </div>
      </div>
    </>
  )
}

export default BasicLayout
