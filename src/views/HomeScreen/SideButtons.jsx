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
                       primaryColor,
                       setCurrentIndex}) => {
  const classes = useStyles()

  const [next, prev] = [
    (
      nextIndex => () => setCurrentIndex(nextIndex)
    )(
      (currentIndex + 1) % numElements
    ),
    (
      prevIndex => () => setCurrentIndex(prevIndex)
    )(
      currentIndex === 0 ? numElements - 1 : currentIndex - 1
    )
  ]

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
                    onClick={prev}
                    backgroundColor={colors.darkerGray}
                    shadowColor={null}
                    strokeWidth="3"
                    isTransparent />
        <RightButton className={classes.button}
                     color={primaryColor}
                     onClick={next}
                     backgroundColor={colors.darkerGray}
                     shadowColor={null}
                     strokeWidth="3"
                     isTransparent />
      </div>
    </div>
  )
}

export default SideButtons
