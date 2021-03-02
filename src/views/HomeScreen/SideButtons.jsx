import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import DotNavigator from './DotNavigator'

const useStyles = makeStyles({
  overlay: {
    alignItems: 'center',
    background: 'rgba(70, 0, 240, 0.45)',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  sideButtons: {
    height: '100%',
    position: 'relative',
    width: '100%',
  },
})

/*
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            numElements={data.length}
            primaryColor={primaryColor}>
 */
const SideButtons = ({ children,
                       currentIndex,
                       numElements,
                       primaryColor,
                       setCurrentIndex}) => {
  const classes = useStyles()

  const [next, prev] = [
    currentIndex === numElements - 1 ? null : () => setCurrentIndex(currentIndex + 1),
    currentIndex === 0 ? null : () => setCurrentIndex(currentIndex - 1),
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
        <div>
          over
        </div>
        <div>
          lay
        </div>
      </div>
    </div>
  )
}

export default SideButtons
