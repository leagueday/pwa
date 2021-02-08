import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Color from 'color'
import cx from 'classnames'
import dayjs from 'dayjs'
import dayjsDurationPlugin from 'dayjs/plugin/duration'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'

import PauseRoundedIcon from '@material-ui/icons/PauseRounded'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded'
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded'

import * as colors from '../styling/colors'
import { actions, constants as storeConstants, selectors, thunks } from '../store'
import * as consts from './consts'

dayjs.extend(dayjsDurationPlugin)

const TITLE_HEIGHT = '2em'
const PROGRESS_HEIGHT = '1.5em'
const UNDERBAR_CONTROLS_HEIGHT = '2em'
// assert(TITLE_HEIGHT + PROGRESS_HEIGHT + UNDERBAR_CONTROLS_HEIGHT == consts.AUDIO_CONTROLS_HEIGHT)

const useStyles = makeStyles(theme => ({
  audioControls: {
    alignItems: 'stretch',
    backgroundColor: theme.palette.background.control,
    display: 'flex',
    flexDirection: 'row',
    height: consts.AUDIO_CONTROLS_HEIGHT,
    userSelect: 'none',
    width: '100%',
  },
  audioControlsLeft: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    maxWidth: '100%',
    overflowX: 'hidden',
    // padding: '1em',
    paddingLeft: '1em',
  },
  audioControlsRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 'auto',
    maxWidth: consts.AUDIO_CONTROLS_HEIGHT,
    minWidth: consts.AUDIO_CONTROLS_HEIGHT,
  },
  audioControlsRightCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  durationLabel: {
    bottom: '-1em',
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.sans,
    fontSize: '75%',
    fontStyle: 'oblique',
    position: 'absolute',
    right: '0.5em',
  },
  forwardButton: {
    transform: 'scaleX(-1)',
  },
  nextButton: {
  },
  progressBox: {
    // backgroundColor: colors.darkerCharcoal,
    // borderRadius: theme.spacing(1),
    position: 'relative',
    height: PROGRESS_HEIGHT,
    paddingLeft: '0.33em',
    paddingRight: '0.33em',
  },
  replayButton: {
    transform: 'scaleX(1.01)',
  },
  sliderColor: {
    color: colors.babyBlue,
  },
  sliderThumbColor: {
    backgroundColor: colors.brightPlum,
  },
  sliderThumbTooltip: {
    background: Color(colors.blackPlum).fade(0.6).toString(),
    border: `1px solid ${colors.darkBabyBlue}`,
    borderRadius: '3px',
    color: colors.vintageTubeFaint,
  },
  title: {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: theme.typography.serif,
    fontSize: '85%',
    height: TITLE_HEIGHT,
    maxWidth: '100%',
    minWidth: 0,
    overflowX: 'hidden',
    paddingLeft: '0.5em',
    paddingTop: '0.5em',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  underbarButton: {
  },
  underbarSpacer: {
    maxWidth: '1em',
    minWidth: '1em',
  },
  underbarControls: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    height: UNDERBAR_CONTROLS_HEIGHT,
    justifyContent: 'center',
  },
  vintageTubeDisabled: {
    color: colors.vintageTubeDull,
  },
  vintageTube: {
    color: colors.vintageTubeBright,
  },
}))

const hmsRegex = RegExp('^\\d{1,2}:')
const maybeHmsToSecondsOnly = maybeDurationString => {
  // When the duration comes from the 'itunes:Duration' RSS extension meta,
  // it's a string in 'hh:mm:ss' format. That's potentially useful for display
  // prior to loading the <audio /> element with the media url. After that,
  // the <audio /> element emits an event when it parses the media header and
  // it conveys the duration in numerical seconds.
  //
  // The 'itunes:Duration' value is discarded in Redux in favor of the <audio />
  // media duration which seems more dependable.
  if ('string' !== typeof(maybeDurationString) || !hmsRegex.test(maybeDurationString)) {
    return maybeDurationString
  }

  const p = maybeDurationString.split(':')
  let s = 0
  let m = 1

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10)
    m *= 60
  }

  return s
}

const percentageToPosition = duration => percentage => percentage / 100 * duration

const secondsToHms = s => dayjs.duration(s * 1000).format(
    s >= 3600
      ? 'H:mm:ss'
      : 'mm:ss'
  )

const TooltipThumb = ({children, open, value}) => {
  const classes = useStyles()

  const duration = maybeHmsToSecondsOnly(
    useSelector(selectors.getAudioDuration)
  )

  const cbPosToSeconds = React.useCallback(
    percentageToPosition(duration),
    [duration]
  )

  const position = useSelector(selectors.getAudioPosition)

  // Kind of quick-and-dirty test the type of `value` to
  // know if it's preformatted (ephemeral value during
  // drag), it would be a string, else it's a number 1-100
  // representing the Slider position
  const hms = typeof(value) === 'string' ? value : secondsToHms(position)

  return (
    <Tooltip
      classes={{tooltip: classes.sliderThumbTooltip}}
      open={open}
      enterTouchDelay={0}
      placement="right"
      title={hms}
    >
      {children}
    </Tooltip>
  )
}

const ProgressBox = () => {
  const classes = useStyles()

  const position = useSelector(selectors.getAudioPosition)
  const seeked = useSelector(selectors.getAudioSeeked)
  const duration = maybeHmsToSecondsOnly(
    useSelector(selectors.getAudioDuration)
  )

  const durationLabel = React.useMemo(
    () => {
      const djsDuration = dayjs.duration(duration, 'seconds')

      if (!djsDuration) return ''

      return djsDuration.format('H:mm:ss')
    },
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

const AudioControls = () => {
  const classes = useStyles()

  const podcastId = useSelector(selectors.getAudioPodcastId)
  const itemUrl = useSelector(selectors.getAudioUrl)
  const itemTitle = useSelector(selectors.getAudioTitle)

  const isDisabled = !itemUrl
  const buttonColorClass = isDisabled ? classes.vintageTubeDisabled : classes.vintageTube

  const dispatch = useDispatch()

  const titleOnclick = () => {
    dispatch(actions.pushHistory(`/podcast/${podcastId}`))
  }

  const forwardButtonOnclick = () => {
    console.log('forward')
    dispatch(actions.forwardAudio())
  }

  const nextButtonOnclick = () => {
    console.log('next')
    dispatch(thunks.audio.playNextTrack())
  }

  const replayButtonOnclick = () => {
    console.log('replay')
    dispatch(actions.replayAudio())
  }

  const audioMode = useSelector(selectors.getAudioMode)

  const pauseOrPlayButtonOnclick = audioMode === storeConstants.AUDIO_MODE_PAUSE
    ? () => {
      console.log('play')
      dispatch(actions.playAudio())
    } : () => {
      console.log('pause')
      dispatch(actions.pauseAudio())
    }

  const PauseOrPlayIcon = audioMode === storeConstants.AUDIO_MODE_PAUSE
    ? PlayArrowRoundedIcon : PauseRoundedIcon

  return (
    <div className={classes.audioControls}>
      <div className={classes.audioControlsLeft}>
        <div className={classes.titleContainer}>
          <div className={classes.title} onClick={titleOnclick}>
            {itemTitle}
          </div>
        </div>
        <ProgressBox />
        <div className={classes.underbarControls}>
          <IconButton className={classes.underbarButton} onClick={replayButtonOnclick} size="small" disabled={isDisabled}>
            <ReplayRoundedIcon className={cx(classes.replayButton, buttonColorClass)} />
          </IconButton >
          <div className={classes.underbarSpacer} />
          <IconButton className={classes.underbarButton} onClick={pauseOrPlayButtonOnclick} size="small" disabled={isDisabled}>
            <PauseOrPlayIcon className={buttonColorClass} />
          </IconButton >
          <div className={classes.underbarSpacer} />
          <IconButton className={classes.underbarButton} onClick={forwardButtonOnclick} size="small" disabled={isDisabled}>
            <ReplayRoundedIcon className={cx(classes.forwardButton, buttonColorClass)} />
          </IconButton >
        </div>
      </div>
      <div className={classes.audioControlsRight}>
        <div className={classes.audioControlsRightCenter}>
          <IconButton className={classes.nextButton} onClick={nextButtonOnclick} disabled={isDisabled}>
            <SkipNextRoundedIcon className={buttonColorClass} />
          </IconButton >
        </div>
      </div>
    </div>
  )
}

export default AudioControls
