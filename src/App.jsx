import React from 'react'
import { createUseStyles } from 'react-jss'

import { Provider } from './store'

import * as typography from './styling/typography'

const useStyles = createUseStyles({
  dataDump: {

  },
  sans: {
    fontFamily: typography.sans
  },
  serif: {
    fontFamily: typography.serif
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
      <div>
        🚧
        <div className={classes.sans}>
          Almost before we knew it, we had left the ground.
        </div>
        <div className={classes.serif}>
          Almost before we knew it, we had left the ground.
        </div>
        <div className={classes.dataDump}>
          { renderData(data) }
        </div>
      </div>
    </Provider>
  )
}

export default App
