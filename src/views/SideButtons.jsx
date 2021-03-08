import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import { IcoLeft, IcoRight } from './icons'
import {makeIconButton} from './IconButton'

const useStyles = makeStyles({
  button: {
    pointerEvents: 'initial',
    zIndex: 1000,
  },
  overlay: {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    padding: '0.5em',
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    userSelect: 'none',
  },
  sideButtons: {
    maxHeight: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
})

const LeftButton = makeIconButton(IcoLeft)
const RightButton = makeIconButton(IcoRight)

const SideButtons = ({ children,
                       accentColor,
                       onLeftClick,
                       onRightClick }) => {
  const classes = useStyles()

  return (
    <div className={classes.sideButtons}>
      {children}
      <div className={classes.overlay}>
        {onLeftClick
          ? (<LeftButton className={classes.button}
                         color={accentColor}
                         onClick={onLeftClick}
                         backgroundColor={colors.darkerGray}
                         shadowColor={null}
                         strokeWidth="3"
                         isTransparent/>)
          : (<div/>)
        }
        {onRightClick
          ? (<RightButton className={classes.button}
                          color={accentColor}
                          onClick={onRightClick}
                          backgroundColor={colors.darkerGray}
                          shadowColor={null}
                          strokeWidth="3"
                          isTransparent/>)
          : (<div/>)
        }
      </div>
    </div>
  )
}

export default SideButtons