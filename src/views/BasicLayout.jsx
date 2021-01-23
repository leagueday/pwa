import React from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import * as consts from './consts'
import { selectors } from '../store'
import AppBar from './AppBar'
import AudioControls from './AudioControls'
import SelectedPodcast from './SelectedPodcast'

// BasicLayout
//
// * nothing in here should scroll
// * this is like a full screen view (capped to the container)
// * whatever might scroll is more granular and within the children

const useStyles = makeStyles(theme => ({
  basicLayout: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    maxHeight: '100vh',
    minHeight: '100vh',
  },
  basicLayoutAppBar: {
    maxHeight: consts.APPBAR_HEIGHT,
    minHeight: consts.APPBAR_HEIGHT,
  },
  basicLayoutAudioControls: {
    maxHeight: consts.AUDIO_CONTROLS_HEIGHT,
    minHeight: consts.AUDIO_CONTROLS_HEIGHT,
  },
  basicLayoutContent: {
    alignItems: 'stretch',
    borderBottom: `1px solid ${colors.pinkSalmon}`,
    borderTop: `1px solid ${colors.pinkSalmon}`,
    display: 'flex',
    flexDirection: 'row',
  },
  contentWhenAudioDisplayed: {
    maxHeight: `calc(100vh - ${consts.APPBAR_HEIGHT} - ${consts.AUDIO_CONTROLS_HEIGHT})`,
    minHeight: `calc(100vh - ${consts.APPBAR_HEIGHT} - ${consts.AUDIO_CONTROLS_HEIGHT})`,
  },
  contentWhenAudioHidden: {
    maxHeight: `calc(100vh - ${consts.APPBAR_HEIGHT})`,
    minHeight: `calc(100vh - ${consts.APPBAR_HEIGHT})`,
  },
}))

const BasicLayout = props => {
  const classes = useStyles()

  const audioItemUrl = useSelector(selectors.getAudioUrl)
  const isAudioDisplayed = !!audioItemUrl

  return (
    <>
      <SelectedPodcast />
      <div className={classes.basicLayout}>
        <div className={classes.basicLayoutAppBar}>
          <AppBar mode={props.mode}/>
        </div>
        <div
          className={cx(
            classes.basicLayoutContent,
            isAudioDisplayed ? classes.contentWhenAudioDisplayed : classes.contentWhenAudioHidden
          )}
        >
          {props.children}
        </div>
        { isAudioDisplayed && (
          <div className={classes.basicLayoutAudioControls}>
            <AudioControls />
          </div>
        ) }
      </div>
    </>
  )
}

export default BasicLayout
