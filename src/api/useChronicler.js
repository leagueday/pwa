// provide a smidge of durability

import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {constants as storeConstants, selectors} from '../store'

import * as constants from './consts'
import { IdbKvMap } from './idb'

const idbStore = new IdbKvMap('chronicle')

const debounce = minIntervalMs => f => {
  let wait = false

  return (...args) => {
    if (wait) return

    wait = true
    setTimeout(
      () => { wait = false },
      minIntervalMs
    )

    f(...args)
  }
}

const debounce10s = debounce(10 * 1000)

const storeLatestListen =
  async (podcastId,
         audioUrl,
         audioPosition,
         podcastUrl,
         itemIndex,
         duration,
         title) =>
    idbStore.set(constants.CHRONICLE_LATEST_LISTEN_ID, {
      podcastId,
      audioUrl,
      audioPosition,
      podcastUrl,
      itemIndex,
      duration,
      title,
    })

const useChronicler = () => {
  // most recent listened / debounce
  const audioMode = useSelector(selectors.getAudioMode)
  const podcastId = useSelector(selectors.getAudioPodcastId)
  const audioUrl = useSelector(selectors.getAudioUrl)
  const audioPosition = useSelector(selectors.getAudioPosition)

  const podcastUrl = useSelector(selectors.getAudioPodcastUrl)
  const itemIndex = useSelector(selectors.getAudioItemIndex)
  const duration = useSelector(selectors.getAudioDuration)
  const title = useSelector(selectors.getAudioTitle)

  const itemKey = React.useMemo(
    () => podcastId + '/' + audioUrl,
    [audioUrl, podcastId]
  )

  React.useEffect(
    debounce10s(
      () => {
        if (audioMode === storeConstants.AUDIO_MODE_PLAY)
          storeLatestListen(
            podcastId,
            audioUrl,
            audioPosition,
            podcastUrl,
            itemIndex,
            duration,
            title)
      }
    ),
    [audioMode, audioPosition, audioUrl, podcastId]
  )
  // completed listening to some track
  // React.useEffect(
  //   () => {
  //
  //   },
  //   []
  // )
}

export default useChronicler
