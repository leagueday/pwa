import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  previousBroadcasts: { },
}))

const PreviousBroadcasts = ({children, className}) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.previousBroadcasts, className)}>
      previous broadcasts
    </div>
  )
}

export default PreviousBroadcasts
