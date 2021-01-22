import stringStripHtml from 'string-strip-html'

import * as colors from '../styling/colors'

export const addScrollStyle = styleClassInitializer => ({
  ...styleClassInitializer,
  '&::-webkit-scrollbar': {
    width: '0.5em',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: colors.darkBabyBlue,
    borderRadius: '3px',
  }
})

export const stripHtml =
    maybeHtmlString =>
      maybeHtmlString
        ? stringStripHtml(maybeHtmlString)?.result
        : maybeHtmlString
