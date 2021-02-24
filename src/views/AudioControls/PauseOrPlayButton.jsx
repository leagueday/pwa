import React from 'react'
import {useDispatch} from 'react-redux'

import {actions} from '../../store'

const PauseOrPlayButton = ({className, playing}) => {
  const dispatch = useDispatch()

  const [
    pauseOrPlayButtonImageUrl,
    pauseOrPlayButtonOnclick,
  ] = playing
    ? [
      'img/logo_gray_circle_pause.png',
      () => dispatch(actions.pauseAudio())
    ] : [
      'img/logo_gray_circle_play.png',
      () => dispatch(actions.playAudio())
    ]

  return (
    <img
      className={className}
      onClick={pauseOrPlayButtonOnclick}
      src={pauseOrPlayButtonImageUrl}
    />
  )
}

export default PauseOrPlayButton
