import React from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import * as selectors from '../store/selectors'

import AppBar from './AppBar'
import PodcastsGrid from './PodcastsGrid'
import SelectedPodcast from './SelectedPodcast'
import SideNav from './SideNav'
// import SmallNav from './SmallNav' - tbd menu

// This, and the css calcs, seem required to get the
// scrollbar right (should scroll the podcasts grid
// only, and there should only be one scroller!)
const APPBAR_HEIGHT = '2.5em'
// const SMALLNAV_HEIGHT = '4em'  - tbd menu

const useStyles = makeStyles(theme => ({
  appBarContainer: {
    minHeight: APPBAR_HEIGHT,
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
  contentWithoutNav: {
    maxHeight: `calc(100vh - ${APPBAR_HEIGHT})`,
    minHeight: `calc(100vh - ${APPBAR_HEIGHT})`,
  },
  sideNavContainer: {
    flex: 30,
    maxHeight: '100%',
    overflowY: 'auto',
    padding: '0.5em',
  },
  // smallNavContainer: {  - tbd menu
  //   minHeight: SMALLNAV_HEIGHT,
  // },
  podcastsGridContainer: {
    flex: 70,
    maxHeight: '100%',
    overflowY: 'auto',
  },
}))

const BasicLayout = () => {
  const classes = useStyles()

  const isCategoriesVisible = useSelector(selectors.getShowCategories)

  //  - tbd menu
  // const contentNavClass = isCategoriesVisible ? classes.contentWithNav : classes.contentWithoutNav
  const contentNavClass = classes.contentWithoutNav

  /*  - tbd menu
        <Hidden smUp xsUp={!isCategoriesVisible}>
          <div className={classes.smallNavContainer}>
            <SmallNav />
          </div>
        </Hidden>
   */

  return (
    <>
      <SelectedPodcast />
      <div className={classes.basicLayout}>
        <div className={classes.appBarContainer}>
          <AppBar />
        </div>
        <div className={cx(classes.content, contentNavClass)}>
          { isCategoriesVisible && (
              <Hidden xsDown>
                <div className={classes.sideNavContainer}>
                  <SideNav />
                </div>
              </Hidden>
            )
          }
          <div className={classes.podcastsGridContainer}>
              <PodcastsGrid />
          </div>
        </div>
      </div>
    </>
  )
}

export default BasicLayout
