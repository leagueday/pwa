import { createMuiTheme } from '@material-ui/core/styles'

import * as colors from './colors'
import * as typography from './typography'

export const spec = createMuiTheme({
  palette: {
    background: {
      paper: colors.black, // card background, sidebar background
      control: colors.black, // header background
      default: colors.black, // grid background
    },
    secondary: {
      contrastText: colors.darkGray,
      dark: colors.white30,
      light: colors.white,
      main: colors.white80,
    },
    text: {
      disabled: colors.white30,
      hint: colors.white80,
      primary: colors.white,
      secondary: colors.white30,
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
