import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  schedulePopper: {
    userSelect: 'none',
  },
  text: { },
  textPop: ({color}) => ({
    color,
    cursor: 'pointer',
    textDecoration: 'underline',
  }),
}))

const SchedulePopper = ({className, text, color}) => {
  const classes = useStyles({color})

  return (
    <div className={cx(classes.schedulePopper, className)}>
      <div className={classes.text}>{text}</div>
      <div className={classes.textPop}>See full schedule.</div>
    </div>
  )
}

export default SchedulePopper
