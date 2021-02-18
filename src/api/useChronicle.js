// provide a smidge of durability
// tbd if wanted, completed listening to some track

import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {constants as storeConstants, selectors, thunks} from '../store'

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

const debounce10s = debounce(10000)

const getLatestListen = async () => idbStore.get(constants.CHRONICLE_LATEST_LISTEN_ID)

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

const useChronicleWriter = () => {
  const audioMode = useSelector(selectors.getAudioMode)
  const podcastId = useSelector(selectors.getAudioPodcastId)
  const audioUrl = useSelector(selectors.getAudioUrl)
  const audioPosition = useSelector(selectors.getAudioPosition)

  const podcastUrl = useSelector(selectors.getAudioPodcastUrl)
  const itemIndex = useSelector(selectors.getAudioItemIndex)
  const duration = useSelector(selectors.getAudioDuration)
  const title = useSelector(selectors.getAudioTitle)

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
}

const useChronicleReader = () => {
  const dispatch = useDispatch()

  React.useEffect(
    // on mount, check if the "latest listen" might be useful wrt current redux
    // i.e. if no audio is already selected, then autoload..
    () => {
      dispatch(thunks.audio.maybeUseLatestListen(getLatestListen))
    },
    []
  )
}

const useChronicle = () => {
  useChronicleWriter()
  useChronicleReader()
}

export default useChronicle
