import React from 'react'
import { hot } from 'react-hot-loader/root'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'

import { Provider as StoreProvider } from './store'

import ThemeProvider from './styling/ThemeProvider'
import * as typography from './styling/typography'

import usePodcasts from './api/usePodcasts'

import BasicLayout from './views/BasicLayout'
import Loading from './views/Loading'

const useStyles = makeStyles(theme => ({
  container: {
  },
  paper: {
    margin: '1em',
    padding: '1em',
  },
  root: {
    flexGrow: 1,
  },
}))

const App = () => {
  const classes = useStyles()

  const {data, categories, subCategories, error} = usePodcasts()

  return (
    <StoreProvider>
      <ThemeProvider>
        <CssBaseline />
        <div className={classes.root}>
          <Container className={classes.container} maxWidth="md">
            <Paper className={classes.paper}>
              {
                data ? (<BasicLayout />) : (<Loading />)
              }
            </Paper>
          </Container>
        </div>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default hot(App)
