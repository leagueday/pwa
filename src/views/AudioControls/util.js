import dayjs from 'dayjs'
import dayjsDurationPlugin from 'dayjs/plugin/duration'

dayjs.extend(dayjsDurationPlugin)

const hmsRegex = RegExp('^\\d{1,2}:')

export const formatSecondsDuration = ds => {
  const duration = dayjs.duration(ds, 'seconds')

  if (!duration) return ''

  return duration.format('H:mm:ss')
}

export const maybeHmsToSecondsOnly = maybeDurationString => {
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

export const percentageToPosition = duration => percentage => percentage / 100 * duration

export const secondsToHms = s => dayjs.duration(s * 1000).format(
  s >= 3600
    ? 'H:mm:ss'
    : 'mm:ss'
)
