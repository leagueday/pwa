import React from 'react'
import {useDispatch} from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import {actions} from '../../store'

const useStyles = makeStyles(theme => ({
  link: ({color}) => ({
    color,
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:link': { // a normal, unvisited link
    },
    '&:visited': { // a link the user has visited
    },
    '&:hover': { // a link when the user mouses over it
      fontWeight: theme.typography.weight.bold,
    },
    '&:active': { // a link the moment it is clicked
    },
  }),
  schedulePopper: {
    userSelect: 'none',
  },
  text: { },
  textPop: {
  },
}))

const SchedulePopper = ({className, text, link, color}) => {
  const classes = useStyles({color})

  // const dispatch = useDispatch()
  // const gotoSchedule = link ? () => dispatch(actions.pushHistory(link)) : null

  return (
    <div className={cx(classes.schedulePopper, className)}>
      <div className={classes.text}>{text}</div>
      { link && (
        <div className={classes.textPop}>
          <a className={classes.link} href={link}>
            See full schedule.
          </a>
        </div>
      )}
    </div>
  )
}

export default SchedulePopper
