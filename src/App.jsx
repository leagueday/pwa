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
import Error from './views/Error'
import Loading from './views/Loading'
import Mushipan from './views/MushipanRouter'

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
    overflow: 'hidden',
  },
  appBackground: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxHeight: '100%',
    minHeight: '100%',
    maxWidth: '1600px',
    minWidth: '166px',
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
      <div className={classes.appBackground}>
        {
          data
            ? (<Mushipan routes={routesConfig} />)
            : error
            ? (<Error e={error} />)
            : (<Loading />)
        }
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
    <CssBaseline />
    <ThemeProvider>
      <Audio />
      <Chronicle />
      <ThemedAppContent />
    </ThemeProvider>
  </StoreProvider>
)

export default hot(App)
