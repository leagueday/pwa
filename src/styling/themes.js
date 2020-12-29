import { createMuiTheme } from '@material-ui/core/styles'

import * as colors from './colors'
import * as typography from './typography'

export const generic = createMuiTheme({
  palette: {
    background: {
      paper: colors.bluishBlack,
      control: colors.darkCharcoal,
      default: colors.charcoal,
    },
    type: 'dark',
  },
  spacing: 4,
  typography: {
    fontFamily: typography.sans,
  },
})

export const spec = createMuiTheme({
  palette: {
    background: {
      paper: colors.bluishBlack, // card background, sidebar background
      control: colors.darkCharcoal, // header background
      default: colors.charcoal, // grid background
    },
    type: 'dark',
  },
  spacing: () => 0,
  typography: {
    fontFamily: typography.sans,
  },
})

// tbd - convey this via theme...
// const mainBackground = colors.darkCharcoal
// const cardBackground = colors.bluishBlack
