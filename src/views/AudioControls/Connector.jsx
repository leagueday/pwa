import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useMyList from '../../api/useMyList'
import {
  actions,
  constants as storeConstants,
  selectors,
  thunks,
} from '../../store'

const Connector = ({ children }) => {
  const dispatch = useDispatch()

  const user = useSelector(selectors.getUser)
  const audioMode = useSelector(selectors.getAudioMode)
  const podcastId = useSelector(selectors.getAudioPodcastId)
  const itemUrl = useSelector(selectors.getAudioUrl)

  const [getIsOnMyList, addToMyList, removeFromMyList] = useMyList(
    user?.token?.access_token
  )
  const isOnMyList = getIsOnMyList('podcast', podcastId)

  const isDisabled = !itemUrl
  const isPlaying = audioMode === storeConstants.AUDIO_MODE_PLAY

  const popOnclick =
    audioMode === storeConstants.AUDIO_MODE_PLAY
      ? () => dispatch(actions.pauseAudio())
      : () => dispatch(actions.playAudio())

  const forwardButtonOnclick = () => {
    dispatch(actions.forwardAudio())
  }

  const minusButtonOnclick = () => {
    return removeFromMyList('podcast', podcastId)
  }

  const nextButtonOnclick = () => {
    dispatch(thunks.audio.playNextTrack())
  }

  const plusButtonOnclick = () => {
    return addToMyList('podcast', podcastId)
  }

  const replayButtonOnclick = () => {
    dispatch(actions.replayAudio())
  }

  const titleOnclick = () => {
    dispatch(actions.pushHistory(`/podcast/${podcastId}`))
  }

  const plusOrMinusOnclick = isOnMyList ? minusButtonOnclick : plusButtonOnclick

  return (
    <>
      {children({
        forwardButtonOnclick,
        isDisabled,
        isOnMyList,
        isPlaying,
        nextButtonOnclick,
        plusOrMinusOnclick,
        popOnclick,
        replayButtonOnclick,
        titleOnclick,
      })}
    </>
  )
}

export default Connector
