import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  iconButton: ({color, size}) => ({
    color: color,
    cursor: 'pointer',
    height: '2em',
    width: '2em',
  }),
})

const IconButton = ({children, color, onClick, size}) => {
  const classes = useStyles(({color, size}))

  return (
    <div className={classes.iconButton} onClick={onClick}>
      {children}
    </div>
  )
}

IconButton.defaultProps = {
  size: '100%',
}

export default IconButton
