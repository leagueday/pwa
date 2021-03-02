import React from 'react'
import Color from 'color'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  icon: {
    height: '65%',
    width: '65%',
  },
  iconButton: ({backgroundColor, color, size}) => ({
    alignItems: 'center',
    backgroundColor: backgroundColor,
    borderRadius: '50%',
    borderWidth: 0,
    color: color,
    cursor: 'pointer',
    display: 'flex',
    filter: 'drop-shadow(1px 1px 4px #000000)',
    flexDirection: 'row',
    height: size,
    justifyContent: 'center',
    width: size,
    '&:hover': {
      backgroundColor: Color(backgroundColor).lighten(0.25).string(),
    },
    '&:active': {
      filter: 'none',
      backgroundColor: Color(backgroundColor).lighten(0.35).string(),
    },
  }),
  ripple: {
    position: 'relative',
    overflow: 'hidden',
    transform: 'translate3d(0, 0, 0)',
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      backgroundImage: 'radial-gradient(circle, #000 10%, transparent 10.01%)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
      transform: 'scale(10,10)',
      opacity: 0,
      transition: 'transform .5s, opacity 1s',
    },
    '&:active:after': {
      transform: 'scale(0,0)',
      opacity: .2,
      transition: '0s',
    },
  },
})

export const makeIconButton = Icon => ({backgroundColor, color, onClick, size}) => {
  const classes = useStyles(({backgroundColor, color, size}))

  return (
    <Icon classes={{
        outer: cx(classes.iconButton, classes.ripple),
        inner: classes.icon
      }} onClick={onClick} />
  )
}
