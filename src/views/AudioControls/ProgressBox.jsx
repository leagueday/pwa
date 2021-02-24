import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Slider from '@material-ui/core/Slider'

import {actions, selectors} from '../../store'

import {
  formatSecondsDuration,
  maybeHmsToSecondsOnly,
  percentageToPosition,
  secondsToHms
} from './util'

import TooltipThumb from './TooltipThumb'
import {makeStyles} from '@material-ui/core/styles'
import * as colors from '../../styling/colors'

const PROGRESS_HEIGHT = '1.5em'

const useStyles = makeStyles(theme => ({
  durationLabel: {
    bottom: '-1em',
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.family.secondary,
    fontSize: '75%',
    fontStyle: 'oblique',
    position: 'absolute',
    right: '0.5em',
  },
  progressBox: {
    // backgroundColor: colors.darkerCharcoal,
    // borderRadius: theme.spacing(1),
    position: 'relative',
    height: PROGRESS_HEIGHT,
    paddingLeft: '0.33em',
    paddingRight: '0.33em',
  },
  sliderColor: {
    color: colors.blue,
  },
  sliderThumbColor: {
    backgroundColor: colors.violet,
  },
}))

const ProgressBox = () => {
  const classes = useStyles()

  const position = useSelector(selectors.getAudioPosition)
  const seeked = useSelector(selectors.getAudioSeeked)
  const duration = maybeHmsToSecondsOnly(
    useSelector(selectors.getAudioDuration)
  )

  const durationLabel = React.useMemo(
    () => formatSecondsDuration(duration),
    [duration]
  )

  const dispatch = useDispatch()

  // when dragging or while waiting for the consequent seek operation to complete
  const [ephemeralValue, setEphemeralValue] = React.useState()

  const hasEphemeralValue = ephemeralValue != null

  // There are 2 ways in play here to determine the Slider thumb label. (current pos mm:ss)
  //
  // * `valueLabelFormat` supplied by prop to Slider,
  // * Redux subscriptions in `TooltipThumb`
  //
  // Redux subscriptions give a precise time that begins updating as soon as the audio
  // is played - because it's a number of seconds.
  //
  // The `valueLabelFormat` prop function is called with the Slider value which is a
  // percentage 1-100.
  //
  // The `valueLabelFormat` prop function is used for updating the thumb text while
  // dragging - in which case the Redux audio position isn't updating - that updates
  // when the <audio/> element emits timeupdate events...
  //
  // The thumb text update on drag `onChange` is more localized and temporary... the
  // `onChangeCommitted` allows deferring the update to wider app state and <audio/>...

  const valueLabelFormat = React.useCallback(
    percentage => secondsToHms(percentageToPosition(duration)(percentage)),
    [duration]
  )

  const valueFromAudioEvent = Math.floor(position / duration * 100)

  const onChange = (event, value) => {
    // called while dragging
    setEphemeralValue(value)
  }

  const onChangeCommitted = (event, value) => {
    // called once dragged
    const position = percentageToPosition(duration)(value)
    dispatch(actions.seekAudio(position))
  }

  // on seek-completed
  React.useEffect(
    () => {
      if (seeked) {
        setEphemeralValue(null)
      }
    },
    [seeked]
  )

  // console.log('duration', duration, 'position', position, 'value', value, 'ephValue', ephemeralValue)

  return (
    <div className={classes.progressBox}>
      <Slider
        classes={{
          colorPrimary: classes.sliderColor,
          thumbColorPrimary: classes.sliderThumbColor,
        }}
        ValueLabelComponent={TooltipThumb}
        valueLabelDisplay="on"
        valueLabelFormat={hasEphemeralValue ? valueLabelFormat : null}
        value={hasEphemeralValue ? ephemeralValue : valueFromAudioEvent}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
      />
      <div className={classes.durationLabel}>{durationLabel}</div>
    </div>
  )
}

export default ProgressBox
