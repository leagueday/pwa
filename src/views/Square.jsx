import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  content: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  square: {
    position: 'relative',
    width: '50%',
    '&:after': {
      content: '""',
      display: 'block',
      paddingBottom: '100%',
    },
  },
})

const Square = ({children, className}) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.square, className)}>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default Square
