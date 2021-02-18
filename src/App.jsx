import React from 'react'
import { hot } from 'react-hot-loader/root'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'

import { Provider as StoreProvider, actions, selectors } from './store'

import ThemeProvider from './styling/ThemeProvider'

import usePodcasts from './api/usePodcasts'
import useChronicle from './api/useChronicle'

import Audio from './views/Audio'
import Error from './views/Error'
import Loading from './views/Loading'
import Mushipan from './views/MushipanRouter'

import { routesConfig } from './routes'

const viewportHeightStyleProp = ({viewportHeight}) => viewportHeight

const useStyles = makeStyles(theme => ({
  app: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    maxHeight: viewportHeightStyleProp,
    minHeight: viewportHeightStyleProp,
  },
  appBackground: {
    maxHeight: '100%',
    minHeight: '100%',
  },
  appCanvas: {
    maxHeight: '100%',
    minHeight: '100%',
  },
}))

const ThemedAppContent = () => {
  const viewportHeight = useSelector(selectors.getViewportHeight)
  const dispatch = useDispatch()

  React.useEffect(
    () => {
      if (window) {
        const dispatchViewportHeight = () => {
          dispatch(actions.setViewportHeight(`${window.innerHeight}px`))
        }

        window.addEventListener('resize', dispatchViewportHeight)
        dispatchViewportHeight()
      }
    },
    [window]
  )

  const classes = useStyles({viewportHeight})

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
  return null
}

const App = () => (
  <StoreProvider>
    <CssBaseline />
    <ThemeProvider>
      <Audio />
      <Chronicle />
      <ThemedAppContent />
    </ThemeProvider>
  </StoreProvider>
)

export default hot(App)
