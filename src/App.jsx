import React from 'react'
import { hot } from 'react-hot-loader/root'

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'

import { Provider as StoreProvider } from './store'

import ThemeProvider from './styling/ThemeProvider'

import useChronicle from './api/useChronicle'

import Audio from './views/Audio'
import Auth from './views/Auth'
import Mushipan from './views/MushipanRouter'
import UserData from './views/UserData'

import { routesConfig } from './routes'

const useStyles = makeStyles(theme => ({
  app: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    alignItems: 'stretch',
    display: 'flex',
    fontFamily: theme.typography.family.primary,
    justifyContent: 'center',
    // maxHeight: '100%',
    // minHeight: '100%',
    // maxWidth: '100vw',
    // minWidth: '100vw',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  appCanvas: {
    alignItems: 'stretch',
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  pseudoContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxHeight: '100%',
    minHeight: '100%',
    width: '100%',
  },
}))

const StyledAppContent = () => {
  const classes = useStyles()

  return (
    <div className={classes.app}>
      <div className={classes.pseudoContainer}>
        <Paper className={classes.appCanvas}>
          <Mushipan routes={routesConfig} />
        </Paper>
      </div>
    </div>
  )
}

const Chronicle = () => {
  useChronicle()
  return null
}

const App = () => (
  <StoreProvider>
    <Audio />
    <Auth />
    <Chronicle />
    <CssBaseline />
    <ThemeProvider>
      <StyledAppContent />
    </ThemeProvider>
    <UserData />
  </StoreProvider>
)

export default hot(App)
