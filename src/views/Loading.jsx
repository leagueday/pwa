import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  loading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontFamily: theme.typography.family.primary,
  },
}))

const Loading = () => {
  const classes = useStyles()

  return (
    <div className={classes.loading}>
      <div className={classes.text}>
        Loading...
      </div>
    </div>
  )
}

export default Loading
