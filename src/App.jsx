import React from 'react'
import { createUseStyles } from 'react-jss'

import { Provider } from './store'

import * as typography from './styling/typography'

import usePodcasts from './api/usePodcasts'

const useStyles = createUseStyles({
  container: {
    padding: '2em',
  },
  dataDump: {
    fontFamily: typography.mono,
    fontSize: '50%',
    padding: '1em',
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
  },
  headingContent: {
    fontFamily: typography.sans,
    borderBottom: '1px solid black',
    padding: '1em',
  },
})

const renderData = data => {
  if (!data) {
    return 'NO DATA'
  }

  return JSON.stringify(data, null, 2)
}

const App = () => {
  const classes = useStyles()

  const {data, error} = usePodcasts()

  return (
    <Provider>
      <div className={classes.container}>
        <div className={classes.heading}>
          <div className={classes.headingContent}>
            🚧 LeagueDay Podcasts 🚧
          </div>
        </div>
        <div className={classes.dataDump}>
          <pre>
            { renderData(data) }
          </pre>
        </div>
      </div>
    </Provider>
  )
}

export default App
