import React from 'react'
import { hot } from 'react-hot-loader/root'

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import useChronicle from './api/useChronicle'
import { Provider as StoreProvider } from './store'
import ThemeProvider from './styling/ThemeProvider'
import Audio from './views/Audio'
import Auth from './views/Auth'
import Mushipan from './views/MushipanRouter'
import UserData from './views/UserData'

import { routesConfig } from './routes'

Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  integrations: [new Integrations.BrowserTracing()],

  tracesSampleRate: 0.7,
})

// const userAgent = navigator.userAgent
// const isChrome = userAgent.indexOf('Chrome') >= 0

const useStyles = makeStyles(theme => ({
  app: {
    backgroundColor: theme.palette.background.default,
    bottom: 0,
    color: theme.palette.text.primary,
    alignItems: 'stretch',
    display: 'flex',
    fontFamily: theme.typography.family.primary,
    justifyContent: 'center',
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
  <Sentry.ErrorBoundary fallback={'An error has occurred'}>
    <button onClick={methodDoesNotExist}>Break the world</button>
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
  </Sentry.ErrorBoundary>
)

export default hot(App)
