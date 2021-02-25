import React from 'react'
import Color from 'color'

import dayjs from 'dayjs'
import dayjs_advancedFormat from 'dayjs/plugin/advancedFormat'

import { makeStyles } from '@material-ui/core/styles'

dayjs.extend(dayjs_advancedFormat)

const useStyles = makeStyles(theme => ({
  contentTitleBar: {
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: theme.typography.family.primary,
    fontWeight: theme.typography.weight.bold,
    justifyContent: 'flex-start',
    userSelect: 'none',
  },
  contentTitleBarDatetime: ({primaryColor}) => ({
    color: Color(primaryColor).fade(0.25).toString(),
    marginLeft: 'auto',
  }),
  contentTitleBarText: {
    fontSize: '125%',
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
