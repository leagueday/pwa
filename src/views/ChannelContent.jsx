import React from 'react'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  channelContent: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
  },
  otherStuff: {
    backgroundColor: 'blue',
    flex: 1,
  },
  title: {
    fontFamily: theme.typography.family.primary,
    fontSize: '125%',
    fontWeight: theme.typography.weight.bold,
  },
}))

const ChannelContent = ({channel, className}) => {
  const classes = useStyles()

  return (
    <div className={cx(className, classes.channelContent)}>
      <img src={channel.imageUrl} />
      <div className={classes.title}>
        {channel.title}
      </div>
      <div className={classes.otherStuff}>
        ...
      </div>
    </div>
  )
}

export default ChannelContent
