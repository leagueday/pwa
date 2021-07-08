import React from 'react'
import Color from 'color'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'

import { colors } from '../styling'

const useStyles = makeStyles({
  image: {
    width: '70%',
    height: '70%',
  },
  imageButton: ({ backgroundColor, shadowColor, size }) => ({
    alignItems: 'center',
    backgroundColor: backgroundColor,
    borderRadius: '50%',
    borderWidth: 0,
    cursor: 'pointer',
    display: 'flex',
    filter: `drop-shadow(1px 1px 4px ${shadowColor})`,
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
      opacity: 0.2,
      transition: '0s',
    },
  },
})

const ToggleImageButton = ({
  className,
  backgroundColor,
  size,
  on,
  onClick,
  onImage,
  offImage,
  shadowColor,
}) => {
  const classes = useStyles({ backgroundColor, shadowColor, size })
  return (
    <div className={cx(classes.imageButton, className)} onClick={onClick} >
      <img
        className={classes.image}
        src={on ? onImage : offImage}
        draggable="false"
      />
      {/* {on ? onImage : offImage} */}
    </div>
  )
}

ToggleImageButton.defaultProps = {
  backgroundColor: colors.brandBlack,
  on: false,
  shadowColor: colors.black,
  size: '2em',
}

export default ToggleImageButton
