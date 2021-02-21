import React from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import * as consts from './consts'
import { selectors } from '../store'
import AppBar from './AppBar'
import AudioControls from './AudioControls'

// BasicLayout
//
// * nothing in here should scroll
// * this is like a full screen view (capped to the container)
// * whatever might scroll is more granular and within the children

const calcContentHeight =
  isAudioControlsHidden =>
    isAudioControlsHidden
      ? ({viewportHeight}) => `calc(${viewportHeight} - ${consts.APPBAR_HEIGHT})`
      : ({viewportHeight}) => `calc(${viewportHeight} - ${consts.APPBAR_HEIGHT} - ${consts.AUDIO_CONTROLS_HEIGHT})`

const useStyles = makeStyles(theme => ({
  basicLayout: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    maxHeight: '100%',
    minHeight: '100%',
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
    borderBottom: `1px solid ${colors.yellow}`,
    borderTop: `1px solid ${colors.yellow}`,
    display: 'flex',
    flexDirection: 'row',
  },
  contentWhenAudioDisplayed: {
    maxHeight: calcContentHeight(false),
    minHeight: calcContentHeight(false),
  },
  contentWhenAudioHidden: {
    maxHeight: calcContentHeight(true),
    minHeight: calcContentHeight(true),
  },
}))

const BasicLayout = props => {
  const viewportHeight = useSelector(selectors.getViewportHeight)

  const classes = useStyles({viewportHeight})

  const audioItemUrl = useSelector(selectors.getAudioUrl)
  const isAudioDisplayed = !!audioItemUrl

  return (
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
  )
}

export default BasicLayout
