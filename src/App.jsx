import React from 'react'
import { hot } from 'react-hot-loader/root'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'

import { Provider as StoreProvider } from './store'

import ThemeProvider from './styling/ThemeProvider'

import usePodcasts from './api/usePodcasts'
import useChronicle from './api/useChronicle'
import useChronicler from './api/useChronicler'

import Audio from './views/Audio'
import Error from './views/Error'
import Loading from './views/Loading'
import Mushipan from './views/MushipanRouter'

import { routesConfig } from './routes'

const useStyles = makeStyles(theme => ({
  app: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    maxHeight: '100vh',
  },
  appBackground: {
    maxHeight: '100vh',
  },
  appCanvas: {
    maxHeight: '100vh',
  },
}))

const ThemedAppContent = () => {
  const classes = useStyles()

  const {data, error} = usePodcasts()

  return (
    <div className={classes.app}>
      <Container className={classes.appBackground} maxWidth="md" disableGutters={true}>
        <Paper className={classes.appCanvas}>
          {
            data
              ? (<Mushipan routes={routesConfig} />)
              : error
              ? (<Error e={error} />)
              : (<Loading />)
          }
        </Paper>
      </Container>
    </div>
  )
}

const Chronicle = () => {
  useChronicle()
  useChronicler()

  return null
}

const App = () => (
  <StoreProvider>
    <ThemeProvider>
      <CssBaseline />
      <Audio />
      <Chronicle />
      <ThemedAppContent />
    </ThemeProvider>
  </StoreProvider>
)

export default hot(App)
