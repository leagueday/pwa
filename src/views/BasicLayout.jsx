import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'

import * as selectors from '../store/selectors'

import themedViews from './themedViews'

import PodcastsGrid from './PodcastsGrid'
import SelectedPodcast from './SelectedPodcast'
import Sidenav from './Sidenav'

const useStyles = makeStyles(theme => ({
  appbarContainer: {
    minHeight: '2.5em',
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
    maxHeight: 'calc(100vh - 2.5em)',
    minHeight: 'calc(100vh - 2.5em)',
  },
  sidenavContainer: {
    flex: 30,
    maxHeight: '100%',
    overflowY: 'auto',
    padding: '0.5em',
  },
  podcastsGridContainer: {
    flex: 70,
    maxHeight: '100%',
    overflowY: 'auto',
  },
}))

const BasicLayout = () => {
  const classes = useStyles()

  const theme = useSelector(selectors.getTheme)

  const { AppBar } = themedViews[theme]

  const isCategoriesVisible = useSelector(selectors.getShowCategories)

  return (
    <>
      <SelectedPodcast />
      <div className={classes.basicLayout}>
        <div className={classes.appbarContainer}>
          <AppBar />
        </div>
        <div className={classes.content}>
          { isCategoriesVisible && (
              <Hidden xsDown>
                <div className={classes.sidenavContainer}>
                  <Sidenav />
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
