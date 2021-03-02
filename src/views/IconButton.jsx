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
      backgroundColor: Color(backgroundColor).lighten(0.25).string(),
    },
  }),
  iconButtonFilter: {
  },
  ripple: {
    position: 'absolute',
    borderRadius: '50%',
    transform: 'scale(0)',
    animation: '$ripple 500ms linear',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  '@keyframes ripple': {
    to: {
      transform: 'scale(1)',
      opacity: 0,
    },
  },
})

const addRippleCreator = (onClick, rippleClass) => event => {
  const button = event.currentTarget

  const circle = document.createElement('span')
  const diameter = Math.min(button.clientHeight, button.clientWidth)
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`
  circle.classList.add(rippleClass)

  const ripple = button.getElementsByClassName(rippleClass)[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle)

  onClick()
}

export const makeIconButton = Icon => ({backgroundColor, color, onClick, size}) => {
  const classes = useStyles(({backgroundColor, color, size}))

  return (
    <Icon classes={{
        outer: cx(classes.iconButton, classes.iconButtonFilter),
        inner: classes.icon
      }} onClick={addRippleCreator(onClick, classes.ripple)} />
  )
}

// const IconButton = ({children, color, onClick, size}) => {
// }
//
// IconButton.defaultProps = {
//   size: '100%',
// }
//
// export default IconButton
