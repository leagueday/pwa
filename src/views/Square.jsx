import React from 'react'
import cx from 'classnames'
import { useLocationPathname } from '../store'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/styles'
import { useMediaQuery } from '@mui/material'
const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    width: '100%',
  },
  square: {
    position: 'relative',
    width: '50%',
  },
}))

const Square = ({ children, className }) => {
  const theme = useTheme()
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))
  const location = useLocationPathname()
  const creatorPage = location === '/creator'
  const classes = useStyles()

  return (
    <div className={cx(classes.square, className)}>
      <div className={classes.content} style={{ minHeight: mdUp && !creatorPage && '200px' }}>{children}</div>
    </div>
  )
}

export default Square
