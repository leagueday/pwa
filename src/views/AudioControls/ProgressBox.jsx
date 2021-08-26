import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

import { actions, selectors } from '../../store'
import { colors } from '../../styling'
import {
  formatSecondsDuration,
  maybeHmsToSecondsOnly,
  percentageToPosition,
  secondsToHms,
} from '../dateutil'
import TooltipThumb from './TooltipThumb'

const PROGRESS_HEIGHT = '1.5em'
const PROGRESS_HEIGHT_MD = '1.2em'

const useStyles = makeStyles(theme => ({
  durationLabel: ({ isExpanded }) => ({
    bottom: 0,
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.family.secondary,
    fontSize: '75%',
    position: 'absolute',
    right: '0.5em',
    [theme.breakpoints.down('md')]: {
      fontSize: '70%',
    },
    [theme.breakpoints.only('xs')]: {
      display: isExpanded ? 'initial' : 'none',
    },
  }),
  progressBox: {
    height: PROGRESS_HEIGHT,
    marginTop: '1em',
    paddingLeft: '0.33em',
    paddingRight: '0.33em',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      height: PROGRESS_HEIGHT_MD,
      marginTop: '0.75em',
    },
    [theme.breakpoints.only('xs')]: {
      margin: 0,
      padding: 0,
    },
  },
  sliderColor: {
    color: colors.blue,
  },
  sliderRoot: {
    padding: '0 0 2vw 0',
    ['@media(pointer: coarse)']: {
      padding: '0 0 2vw 0',
    },
  },
  sliderThumbColor: {
    backgroundColor: colors.violet,
  },
}))

const ProgressBox = ({ className, isExpanded }) => {
  const classes = useStyles({ isExpanded })

  const position = useSelector(selectors.getAudioPosition)
  const seeked = useSelector(selectors.getAudioSeeked)
  
  const duration = maybeHmsToSecondsOnly(
    useSelector(selectors.getAudioDuration)
  )

  const durationLabel = React.useMemo(() => formatSecondsDuration(duration), [
    duration,
  ])

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

  const valueFromAudioEvent = Math.floor((position / duration) * 100)

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
  React.useEffect(() => {
    if (seeked) {
      setEphemeralValue(null)
    }
  }, [seeked])

  // console.log('duration', duration, 'position', position, 'value', value, 'ephValue', ephemeralValue)

  return (
    <div className={cx(classes.progressBox, className)}>
      <Slider
        classes={{
          colorPrimary: classes.sliderColor,
          root: classes.sliderRoot,
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

ProgressBox.defaultProps = {
  isExpanded: false,
}

export default ProgressBox
