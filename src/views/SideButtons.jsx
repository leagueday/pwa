import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { colors } from '../styling'
import { IcoLeftSolid, IcoRightSolid } from './icons'
import { makeIconButton } from './IconButton'

const useStyles = makeStyles({
  button: {
    pointerEvents: 'initial',
    zIndex: 1000,
    cursor: 'pointer',
    padding: 0,
    margin: 0,
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
    maxHeight: '100%',
    right: 0,
    top: 0,
    userSelect: 'none',
  },
  sideButtons: {
    height: '100%',
    minHeight: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
})

const SideButtons = ({ children, accentColor, onLeftClick, onRightClick }) => {
  const classes = useStyles()

  return (
    <div className={classes.sideButtons}>
      {children}
      <div className={classes.overlay}>
        {onLeftClick ? (
         <ChevronLeftIcon color={'white'} fontSize={'large'} onClick={onLeftClick} className={classes.button}/>
        ) : (
          <div />
        )}
        {onRightClick ? (
          <ChevronRightIcon color={'white'} fontSize={'large'} onClick={onRightClick} className={classes.button}/>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

export default SideButtons
