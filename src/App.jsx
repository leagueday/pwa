import React from 'react'
import { hot } from 'react-hot-loader/root'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import ListStateProvider from './store/stateProviders/listState'
import UserProfileProvider from './store/stateProviders/userState'
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
  dsn:
    'https://bca25f07acf44fe1bad1be0fbb836f75@o718294.ingest.sentry.io/5780709',
  integrations: [new Integrations.BrowserTracing()],
  release: '0.0.1',
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

// const Chronicle = () => {
//   useChronicle()
//   return null
// }

const App = () => {

  ;(function (w, d, s) {
    if (w.SDW) console.error('SDW widget already included')
    ;(w.SDW = {}), (w.SDW._r = s)
    let methods = [
      'mount',
      'unmount',
      'addWidget',
      'updateWidget',
      'removeWidget',
      'initStyles',
    ]
    w.SDW._q = []
    methods.forEach(
      method =>
        (w.SDW[method] = function () {
          w.SDW._q.push([method, arguments])
        })
    )
    var script = d.createElement('script')
    script.async = 1
    script.src = s
    var before = d.getElementsByTagName('script')[0]
    before.parentNode.insertBefore(script, before)
  })(window, document, 'https://widgets.shadow.gg/realtime/scriptLoader.js')

  return (
    <Sentry.ErrorBoundary fallback={'An error has occurred'}>
      <StoreProvider>
        <ListStateProvider>
          <UserProfileProvider>
            <Audio />
            <Auth />
            {/* <Chronicle /> */}
            <CssBaseline />
            <ThemeProvider>
              <StyledAppContent />
            </ThemeProvider>
            <UserData />
          </UserProfileProvider>
        </ListStateProvider>
      </StoreProvider>
    </Sentry.ErrorBoundary>
  )
}

export default hot(App)
