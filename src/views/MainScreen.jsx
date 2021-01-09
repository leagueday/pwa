import React from 'react'
import {useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import {selectors} from '../store'

import * as consts from './consts'
import BasicLayout from './BasicLayout'
import PodcastsGrid from './PodcastsGrid'
import SideNav from './SideNav'

const useStyles = makeStyles(theme => ({
  mainPodcastsGrid: {
    flex: 1,
    maxHeight: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  mainSidenav: {
    maxHeight: '100%',
    overflowY: 'auto',
    paddingTop: '0.5em',
    width: consts.SIDENAV_WIDTH,
  },
}))

const MainScreen = () => {
  const classes = useStyles()

  const showCategories = useSelector(selectors.getShowCategories)

  // by default the sidenav is visible
  // although currently same category-filter feature is provided by menu and sidenav
  // the menu is by default closed
  const isSidenavVisible = showCategories !== false

  return (
    <BasicLayout mode="main">
      <Hidden xsDown>
        { isSidenavVisible && (
            <div className={classes.mainSidenav}>
              <SideNav />
            </div>
          )
        }
      </Hidden>
      <div className={classes.mainPodcastsGrid}>
        <PodcastsGrid />
      </div>
    </BasicLayout>
  )
}

export default MainScreen
