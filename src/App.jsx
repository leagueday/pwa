import React from 'react'
import { hot } from 'react-hot-loader/root'
import { useSelector } from 'react-redux'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'

import { Provider as StoreProvider } from './store'

import ThemeProvider from './styling/ThemeProvider'

import usePodcasts from './api/usePodcasts'
import * as selectors from './store/selectors'

import AudioPlayer from './views/AudioPlayer'
import BasicLayout from './views/BasicLayout'
import Error from './views/Error'
import Loading from './views/Loading'

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

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const {data, error} = usePodcasts()

  return (
    <div className={classes.app}>
      <Container className={classes.appBackground} maxWidth="md" disableGutters={smDown}>
        <Paper className={classes.appCanvas}>
          {
            data
              ? (<BasicLayout />)
              : error
              ? (<Error e={error} />)
              : (<Loading />)
          }
        </Paper>
      </Container>
    </div>
  )
}

const App = () => (
  <StoreProvider>
    <ThemeProvider>
      <CssBaseline />
      <AudioPlayer />
      <ThemedAppContent />
    </ThemeProvider>
  </StoreProvider>
)

export default hot(App)
