import React from 'react'
import {useDispatch} from 'react-redux'
import Color from 'color'

import {makeStyles} from '@material-ui/core'

import {actions} from '../../store'
import {colors} from '../../styling'
import {IcoUp} from '../icons'
import {makeIconButton} from '../IconButton'

const UpButton = makeIconButton(IcoUp)

const buttonShadowColor = Color(colors.brandBlack).darken(0.5).string()

const useStyles = makeStyles(theme => ({
  extraSmallHidden: {
    height: 0,
    position: 'relative',
  },
  showButton: {
    left: '2vw',
    position: 'absolute',
    top: '-8vw',
  },
}))

const ExtraSmallHidden = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const onShow = () => dispatch(actions.showAudioControls())

  return (
    <div className={classes.extraSmallHidden}>
      <UpButton className={classes.showButton}
                color={colors.magenta}
                onClick={onShow}
                backgroundColor={colors.brandBlack}
                shadowColor={buttonShadowColor}
                size="6vw"
                strokeWidth="3"/>
    </div>
  )
}

export default ExtraSmallHidden
