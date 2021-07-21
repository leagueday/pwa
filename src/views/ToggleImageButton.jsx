import React from 'react'
import Color from 'color'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'

import { colors } from '../styling'

const useStyles = makeStyles(theme => ({
  image: {
    width: '30%',
  },
  imageButton: ({ backgroundColor, shadowColor, size }) => ({
    alignItems: 'center',
    backgroundColor: backgroundColor,
    borderRadius: '60px',
    borderWidth: 0,
    width: '60%',
    cursor: 'pointer',
    display: 'flex',
    filter: `drop-shadow(1px 1px 4px ${shadowColor})`,
    flexDirection: 'row',
    justifyContent: 'space-around',
    '&:hover': {
      backgroundColor: Color(backgroundColor).lighten(0.25).string(),
    },
    '&:active': {
      filter: 'none',
      backgroundColor: Color(backgroundColor).lighten(0.35).string(),
    },
  }),
  playPause: {
    fontSize: '150%',
    fontWeight: theme.typography.fontWeightBold
  },
}));

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
      {on ? <p className={classes.playPause}>Pause</p> : <p className={classes.playPause}>Play</p>}
    </div>
  )
}

ToggleImageButton.defaultProps = {
  backgroundColor: colors.brandBlack,
  on: false,
  shadowColor: colors.black,
  size: '2em',
}

export default ToggleImageButton;