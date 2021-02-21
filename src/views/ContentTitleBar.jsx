import React from 'react'
import Color from 'color'

import dayjs from 'dayjs'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  contentTitleBar: {
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  contentTitleBarDatetime: ({primaryColor}) => ({
    color: Color(primaryColor).fade(0.25).toString(),
    fontWeight: theme.typography.weight.bold,
    marginLeft: 'auto',
  }),
  contentTitleBarText: {
    fontSize: '125%',
    fontWeight: theme.typography.weight.bold,
  },
}))

const ContentTitleBar = ({text, primaryColor}) => {
  const classes = useStyles({primaryColor})

  return (
    <div className={classes.contentTitleBar}>
      <div className={classes.contentTitleBarText}>
        {text}
      </div>
      <div className={classes.contentTitleBarDatetime}>
        {dayjs().format('MMMM Do, YYYY')}
      </div>
    </div>
  )
}

export default ContentTitleBar
