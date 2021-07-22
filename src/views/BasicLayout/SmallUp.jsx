import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { selectors } from '../../store'
import AudioControls from '../AudioControls'
import BrandGradientHorizontalStripe from '../BrandGradientHorizontalStripe'
import SideNav from '../SideNav'

const useStyles = makeStyles(theme => ({
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
    // overflowY: 'hidden',
    width: '100%',
  },
  sideNav: {},
}))

const SmUpBasicLayout = props => {
  const classes = useStyles()

  const audioItemUrl = useSelector(selectors.getAudioUrl)
  const isAudioDisplayed = !!audioItemUrl

  const navVisibility = useSelector(selectors.getNavVisibility)

  // smUp nav is by default open
  const isNavVisible = navVisibility !== false

  return (
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
  )
}

export default SmUpBasicLayout
