import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import { addScrollStyle } from '../util'
import { selectors } from '../../store'
import AudioControls from '../AudioControls'
import BrandGradientHorizontalStripe from '../BrandGradientHorizontalStripe'
import SideNav from '../SideNav'
import { colors } from '../../styling'

const useStyles = makeStyles(theme => ({
  content: () =>
    addScrollStyle(
      colors.orange,
      theme
    )({
      alignItems: 'stretch',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      marginLeft: '0.25em',
      overflowX: 'hidden',
      overflowY: 'scroll',
      background: 'black',
    }),
  basicLayoutCol: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    width: '100%',
    minHeight: '920px',
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
    overflowY: 'scroll',
    background: 'black',
    width: '100%',
  },
  sideNav: {},
}))

const SmUpBasicLayout = props => {
  const classes = useStyles();

  const audioItemUrl = useSelector(selectors.getAudioUrl);
  const isAudioDisplayed = !!audioItemUrl

  const navVisibility = useSelector(selectors.getNavVisibility);

  // smUp nav is by default open
  const isNavVisible = navVisibility !== false

  return (
    // <div className={classes.content}>
      <div className={classes.basicLayoutCol}>
        <BrandGradientHorizontalStripe />
        <div className={classes.basicLayoutRow}>
          <SideNav
            className={classes.sideNav}
            home={props.home}
            visible={isNavVisible}
          />
          <div className={classes.contentFrame}>{props.children}</div>
        </div>
        {isAudioDisplayed && (
          <>
            <BrandGradientHorizontalStripe />
            <AudioControls />
          </>
        )}
      </div>
    // </div>
  )
}

export default SmUpBasicLayout
