import React from 'react'
import Color from 'color'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import { colors } from '../styling'

const useStyles = makeStyles({
  icon: ({ isTransparent }) => ({
    height: '65%',
    strokeOpacity: isTransparent ? 0.3 : null,
    width: '65%',
  }),
  iconButton: ({
    backgroundColor,
    color,
    shadowColor,
    size,
    isTransparent,
  }) => ({
    alignItems: 'center',
    backgroundColor,
    borderRadius: '50%',
    borderWidth: 0,
    color: isTransparent ? Color(color).fade(0.2).string() : color,
    cursor: 'pointer',
    display: 'flex',
    filter: shadowColor ? `drop-shadow(1px 1px 4px ${shadowColor})` : 'none',
    flexDirection: 'row',
    height: size,
    justifyContent: 'center',
    padding: '0.15em',
    width: size,
    '&:hover': {
      backgroundColor: backgroundColor
        ? Color(backgroundColor).lighten(0.35).string()
        : null,
      color: isTransparent ? color : null,
    },
    '&:active': {
      filter: 'none',
      backgroundColor: backgroundColor
        ? Color(backgroundColor).lighten(0.45).string()
        : null,
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
      opacity: 0.2,
      transition: '0s',
    },
  },
})

export const makeIconButton = Icon => {
  const Component = ({
    backgroundColor,
    className,
    color,
    iconClassName,
    isTransparent,
    onClick,
    shadowColor,
    size,
    strokeWidth,
  }) => {
    const classes = useStyles({
      backgroundColor,
      color,
      isTransparent,
      shadowColor,
      size,
    })

    return (
      <Icon
        classes={{
          outer: cx(classes.iconButton, classes.ripple, className),
          inner: cx(classes.icon, iconClassName),
        }}
        onClick={onClick}
        strokeWidth={strokeWidth}
      />
    )
  }

  Component.defaultProps = {
    color: colors.magenta,
    isTransparent: false,
    onClick: null,
    shadowColor: 'black',
    size: '2em',
    strokeWidth: null,
  }

  return Component
}
