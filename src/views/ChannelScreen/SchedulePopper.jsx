import React from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import { actions } from '../../store'

const useStyles = makeStyles(theme => ({
  link: ({ color }) => ({
    color,
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:link': {
      // a normal, unvisited link
    },
    '&:visited': {
      // a link the user has visited
    },
    '&:hover': {
      // a link when the user mouses over it
      fontWeight: theme.typography.weight.bold,
    },
    '&:active': {
      // a link the moment it is clicked
    },
  }),
  schedulePopper: {
    userSelect: 'none',
  },
  text: {},
  textPop: {
    margin: '0 0 0 0.5em'
  },
}))

const SchedulePopper = ({ className, text, link, color }) => {
  const classes = useStyles({ color })

  // const dispatch = useDispatch()
  // const gotoSchedule = link ? () => dispatch(actions.pushHistory(link)) : null

  return (
    <div className={cx(classes.schedulePopper, className)}>
      <span className={classes.text}>{text}</span>
      {link && (
        <span className={classes.textPop}>
          <a className={classes.link} href={link}>
            See Full Schedule
          </a>
        </span>
      )}
    </div>
  )
}

export default SchedulePopper
