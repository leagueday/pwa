import React from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import * as consts from './consts'
import { selectors } from '../store'
import AudioControls from './AudioControls'
import BrandGradientHorizontalStripe from './BrandGradientHorizontalStripe'

// BasicLayout
//
// * nothing in here should scroll
// * this is like a full screen view (capped to the container)
// * whatever might scroll is more granular and within the children

const getCalcContentHeight = (viewportHeight, isAudioControlsHidden) => {
  const stripesHeight = isAudioControlsHidden ? consts.STRIPE_HEIGHT : `2 * ${consts.STRIPE_HEIGHT}`
  const commonPart = `${viewportHeight} - ${stripesHeight}`

  return `calc(${commonPart}` +
    (isAudioControlsHidden ? '' : ` - ${consts.AUDIO_CONTROLS_HEIGHT}`) + ')'
}

const calcContentHeight =
  isAudioControlsHidden =>
    ({viewportHeight}) => getCalcContentHeight(viewportHeight, isAudioControlsHidden)

const useStyles = makeStyles(theme => ({
  audioControls: {
    maxHeight: consts.AUDIO_CONTROLS_HEIGHT,
    minHeight: consts.AUDIO_CONTROLS_HEIGHT,
  },
  basicLayout: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    maxHeight: '100%',
    minHeight: '100%',
  },
  content: {
    alignItems: 'stretch',
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
      <BrandGradientHorizontalStripe />
      <div
        className={cx(
          classes.content,
          isAudioDisplayed ? classes.contentWhenAudioDisplayed : classes.contentWhenAudioHidden
        )}
      >
        {props.children}
      </div>
      { isAudioDisplayed && (
        <>
          <BrandGradientHorizontalStripe />
          <div className={classes.audioControls}>
            <AudioControls />
          </div>
        </>
      ) }
    </div>
  )
}

export default BasicLayout
