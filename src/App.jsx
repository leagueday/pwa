import React from 'react'
import { hot } from 'react-hot-loader/root'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'

import { Provider as StoreProvider, actions, selectors } from './store'

import ThemeProvider from './styling/ThemeProvider'

import usePodcasts from './api/usePodcasts'
import useChronicle from './api/useChronicle'

import Audio from './views/Audio'
import Auth from './views/Auth'
import Error from './views/Error'
import Loading from './views/Loading'
import Mushipan from './views/MushipanRouter'
import UserData from './views/UserData'

import { routesConfig } from './routes'

const viewportHeightStyleProp = ({viewportHeight}) => viewportHeight

const useStyles = makeStyles(theme => ({
  app: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    fontFamily: theme.typography.family.primary,
    justifyContent: 'center',
    maxHeight: viewportHeightStyleProp,
    minHeight: viewportHeightStyleProp,
    maxWidth: '100vw',
    minWidth: '100vw',
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
      <div className={classes.pseudoContainer}>
        <Paper className={classes.appCanvas}>
          {
            data
              ? (<Mushipan routes={routesConfig} />)
              : error
              ? (<Error e={error} />)
              : (<Loading />)
          }
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
      <ThemedAppContent />
    </ThemeProvider>
    <UserData />
  </StoreProvider>
)

export default hot(App)
