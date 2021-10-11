import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import GetMyList from './views/GetUserList'
import { isPlatform, getPlatforms } from '@ionic/react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import FriendsListProvider from './store/stateProviders/toggleFriend'
import Paper from '@material-ui/core/Paper'
import ListStateProvider from './store/stateProviders/listState'
import ChatStateProvider from './store/stateProviders/useChat'
import UserProfileProvider from './store/stateProviders/userState'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { Provider as StoreProvider } from './store'
import ThemeProvider from './styling/ThemeProvider'
import Audio from './views/Audio'
import Auth from './views/Auth'
import Mushipan from './views/MushipanRouter'
import UserData from './views/UserData'
import FriendsList from './views/FriendsList'
import { routesConfig } from './routes'
import { StatusBar } from '@capacitor/status-bar'

StatusBar.setOverlaysWebView({ overlay: true })

Sentry.init({
  dsn:
    'https://bca25f07acf44fe1bad1be0fbb836f75@o718294.ingest.sentry.io/5780709',
  integrations: [new Integrations.BrowserTracing()],
  release: '0.0.1',
  tracesSampleRate: 0.7,
})

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

const App = () => {
  const platform = isPlatform('hybrid')

  console.log('yo ', getPlatforms(), window.location, 'platform ',platform)

  useEffect(() => {
    const hideStatusBar = async () => {
      await StatusBar.hide()
    }
    hideStatusBar()
  }, [])
  return (
    <Sentry.ErrorBoundary fallback={'An error has occurred'}>
      <StoreProvider>
        <ListStateProvider>
          <UserProfileProvider>
            <FriendsListProvider>
              <ChatStateProvider>
                <Audio />
                <Auth />
                <CssBaseline />
                <ThemeProvider>
                  <StyledAppContent />
                </ThemeProvider>
                <UserData />
                <FriendsList />
                <GetMyList />
              </ChatStateProvider>
            </FriendsListProvider>
          </UserProfileProvider>
        </ListStateProvider>
      </StoreProvider>
    </Sentry.ErrorBoundary>
  )
}

export default hot(App)
