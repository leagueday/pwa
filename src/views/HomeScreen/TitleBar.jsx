import React from 'react'
import Color from 'color'

import dayjs from 'dayjs'
import dayjs_advancedFormat from 'dayjs/plugin/advancedFormat'

import { makeStyles } from '@material-ui/core/styles'

dayjs.extend(dayjs_advancedFormat)

const useStyles = makeStyles(theme => ({
  datetime: ({primaryColor}) => ({
    color: Color(primaryColor).fade(0.25).toString(),
    marginLeft: 'auto',
  }),
  text: {
    fontSize: '125%',
  },
  titleBar: {
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'row',
    fontWeight: theme.typography.weight.bold,
    justifyContent: 'flex-start',
    userSelect: 'none',
  },
}))

const TitleBar = ({text, primaryColor}) => {
  const classes = useStyles({primaryColor})

  return (
    <div className={classes.titleBar}>
      <div className={classes.text}>
        {text}
      </div>
      <div className={classes.datetime}>
        {dayjs().format('MMMM Do, YYYY')}
      </div>
    </div>
  )
}

export default TitleBar
