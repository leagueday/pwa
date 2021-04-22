import React from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import { actions } from '../../store'

const useStyles = makeStyles({
  image: {
    cursor: 'pointer',
    maxHeight: '100%',
  },
  logoButton: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 0,
    paddingLeft: '0.5em',
  },
})

const LogoButton = ({ className, playing }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [imageUrl, onClick] = playing
    ? ['/img/logo_gray_circle_pause.png', () => dispatch(actions.pauseAudio())]
    : ['/img/logo_gray_circle_play.png', () => dispatch(actions.playAudio())]

  return (
    <div className={cx(classes.logoButton, className)}>
      <img className={classes.image} onClick={onClick} src={imageUrl} />
    </div>
  )
}

export default LogoButton
