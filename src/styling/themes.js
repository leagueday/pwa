import { createMuiTheme } from '@material-ui/core/styles'

import * as colors from './colors'
import * as typography from './typography'

export const spec = createMuiTheme({
  palette: {
    background: {
      paper: colors.bluishBlack, // card background, sidebar background
      control: colors.darkCharcoal, // header background
      default: colors.charcoal, // grid background
    },
    secondary: {
      contrastText: colors.vintageTubeDark,
      dark: colors.vintageTubeDull,
      light: colors.vintageTubeBright,
      main: colors.vintageTubeFaint,
    },
    text: {
      disabled: colors.vintageTubeDull,
      hint: colors.vintageTube,
      primary: colors.vintageTubeBright,
      secondary: colors.vintageTubeFaint,
    },
    type: 'dark',
  },
  typography: {
    fontFamily: typography.sans,
    fontWeightBold: 700,
    fontWeightLight: 300,
    fontWeightNormal: 400,
    mono: typography.mono,
    sans: typography.sans,
    serif: typography.serif,
  },
})

// tbd - convey this via theme...
// const mainBackground = colors.darkCharcoal
// const cardBackground = colors.bluishBlack
