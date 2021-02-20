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
      disabled: colors.vintageTubeDull, // tbd this triggers a warning at runtime, type doesn't really have `disabled`
      hint: colors.vintageTube,
      primary: colors.vintageTubeBright,
      secondary: colors.vintageTubeFaint,
    },
    type: 'dark',
  },
  typography: {
    weight: {
      bold: typography.weightBold,
      normal: typography.weightNormal,
    },
    family: {
      primary: typography.familyPrimary,
      secondary: typography.familySecondary,
    },
  },
})
