import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import { IcoLeft, IcoRight } from '../icons'
import {makeIconButton} from '../IconButton'
import DotNavigator from './DotNavigator'

const useStyles = makeStyles({
  button: {
    pointerEvents: 'initial',
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
                       currentIndex,
                       numElements,
                       onLeftClick,
                       onRightClick,
                       primaryColor,
                       setCurrentIndex}) => {
  const classes = useStyles()

  return (
    <div className={classes.sideButtons}>
      {children}
      <DotNavigator
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        numElements={numElements}
        primaryColor={primaryColor} />
      <div className={classes.overlay}>
        <LeftButton className={classes.button}
                    color={primaryColor}
                    onClick={onLeftClick}
                    backgroundColor={colors.darkerGray}
                    shadowColor={null}
                    strokeWidth="3"
                    isTransparent />
        <RightButton className={classes.button}
                     color={primaryColor}
                     onClick={onRightClick}
                     backgroundColor={colors.darkerGray}
                     shadowColor={null}
                     strokeWidth="3"
                     isTransparent />
      </div>
    </div>
  )
}

export default SideButtons
