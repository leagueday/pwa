import React from 'react'
import { createUseStyles } from 'react-jss'

import { Provider } from './store'

import * as typography from './styling/typography'

console.log(process.env.NODE_ENV, process.env.AIRTABLE_API_KEY)

const useStyles = createUseStyles({
  container: {
    padding: '2em',
  },
  dataDump: {
    fontFamily: typography.mono,
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

  return 'data rendering'
}

const App = () => {
  const classes = useStyles()

  const data = null

  return (
    <Provider>
      <div className={classes.container}>
        <div className={classes.heading}>
          <div className={classes.headingContent}>
            🚧 LeagueDay Podcasts 🚧
          </div>
        </div>
        <div className={classes.dataDump}>
          { renderData(data) }
        </div>
      </div>
    </Provider>
  )
}

export default App
