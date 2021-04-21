import Color from 'color'
import stringStripHtml from 'string-strip-html'

import { colors } from '../styling'

export const addScrollStyle = (
  scrollbarColor,
  theme
) => styleClassInitializer => ({
  ...styleClassInitializer,
  [theme.breakpoints.up('sm')]: {
    '&::-webkit-scrollbar': {
      height: '0.5em',
      width: '0.5em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: scrollbarColor,
      borderRadius: '0.25em',
    },
    '&::-webkit-scrollbar-track': {
      background: Color(scrollbarColor).darken(0.8).toString(),
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
  },
  [theme.breakpoints.only('xs')]: {
    '&::-webkit-scrollbar': {
      height: '0.5vw',
      width: '0.5vw',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: scrollbarColor,
      borderRadius: '0.25vw',
    },
    '&::-webkit-scrollbar-track': {
      background: Color(scrollbarColor).darken(0.8).toString(),
      boxShadow: 'inset 0 0 2vw rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 2vw rgba(0,0,0,0.00)',
    },
  },
  '&::-webkit-scrollbar-corner': {
    background: Color(scrollbarColor).darken(0.8).toString(),
  },
})

// fade to gray ramp, only on even rows
export const computeZebraBackgroundColor = rowIndex =>
  rowIndex & 1
    ? null
    : Color(colors.lightGray)
        .fade(Math.max(0, (100 - (10 * rowIndex) / 2) / 100))
        .rgb()
        .string()

export const cycleColorSequence = [
  colors.cyan,
  colors.blue,
  colors.violet,
  colors.magenta,
  colors.orange,
  colors.yellow,
]

export const makeNextColor = () =>
  (offset => () => {
    const result = cycleColorSequence[offset]
    offset = offset + 1 === cycleColorSequence.length ? 0 : offset + 1
    return result
  })(0)

export const slideTransitionGroup = {
  enter: ({ isSlidingLeft }) =>
    isSlidingLeft
      ? {
          position: 'absolute',
          overflow: 'hidden',
          transform: 'translateX(100%)',
        }
      : {
          position: 'absolute',
          overflow: 'hidden',
          transform: 'translateX(-100%)',
        },
  enterActive: ({ isSlidingLeft }) =>
    isSlidingLeft
      ? {
          position: 'absolute',
          overflow: 'hidden',
          transform: 'translateX(0%)',
          transition: 'transform 500ms ease-in-out',
          width: '100%',
        }
      : {
          position: 'absolute',
          overflow: 'hidden',
          transform: 'translateX(0%)',
          transition: 'transform 500ms ease-in-out',
          width: '100%',
        },
  enterDone: {},
  exit: {
    overflow: 'hidden',
    transform: 'translateX(0%)',
  },
  exitActive: ({ isSlidingLeft }) =>
    isSlidingLeft
      ? {
          overflow: 'hidden',
          transform: 'translateX(-100%)',
          transition: 'transform 500ms ease-in-out',
        }
      : {
          overflow: 'hidden',
          transform: 'translateX(100%)',
          transition: 'transform 500ms ease-in-out',
        },
  exitDone: {},
}

export const stripHtml = maybeHtmlString => {
  if (!maybeHtmlString) return maybeHtmlString

  const t = typeof maybeHtmlString

  if (t === 'string') return stringStripHtml(maybeHtmlString)?.result

  if (t === 'object') return Object.values(maybeHtmlString).join(' ')

  return maybeHtmlString
}
