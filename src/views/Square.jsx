import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      minHeight: '200px',
    },
  },
  square: {
    position: 'relative',
    width: '50%',
  },
}))

const Square = ({ children, className }) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.square, className)}>
      <div className={classes.content}>{children}</div>
    </div>
  )
}

export default Square
