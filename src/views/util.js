import Color from 'color'
import stringStripHtml from 'string-strip-html'
import * as colors from '../styling/colors'

export const addScrollStyle = scrollbarColor => styleClassInitializer => ({
  ...styleClassInitializer,
  '&::-webkit-scrollbar': {
    height: '0.5em',
    width: '0.5em',
  },
  '&::-webkit-scrollbar-corner': {
    background: Color(scrollbarColor).darken(0.8).toString(),
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: scrollbarColor,
    borderRadius: '0.25em',
  },
  '&::-webkit-scrollbar-track': {
    background: Color(scrollbarColor).darken(0.8).toString(),
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
})

export const cycleColorSequence = [
  colors.cyan,
  colors.blue,
  colors.violet,
  colors.magenta,
  colors.orange,
  colors.yellow
]

export const makeNextColor = () => (
    offset => () => {
      const result = cycleColorSequence[offset]
      offset = offset + 1 === cycleColorSequence.length ? 0 : offset + 1
      return result
    }
  )(0)

export const stripHtml =
    maybeHtmlString => {
      if (!maybeHtmlString) return maybeHtmlString

      const t = typeof maybeHtmlString

      if (t === 'string') return stringStripHtml(maybeHtmlString)?.result

      if (t === 'object') return Object.values(maybeHtmlString).join(' ')

      return maybeHtmlString
    }
