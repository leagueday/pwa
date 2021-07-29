// // provide a smidge of durability
// // tbd if wanted, completed listening to some track

// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import { constants as storeConstants, selectors, thunks } from '../store'

// import * as constants from './consts'
// import alterUser from './alterUser'
// import debounce from './debounce'
// import { IdbKvMap } from './idb'

// const idbStore = new IdbKvMap('chronicle')

// const getLatestListen = userData => async () =>
//   userData?.latestListen
//     ? Promise.resolve(userData?.latestListen)
//     : idbStore.get(constants.CHRONICLE_LATEST_LISTEN_ID)

// const storeLatestListen = async (
//   user,
//   podcastId,
//   podcastName,
//   audioUrl,
//   audioPosition,
//   podcastUrl,
//   itemIndex,
//   duration,
//   title
// ) =>
//   ((bearerToken, latestListen) =>
//     bearerToken
//       ? alterUser(bearerToken, user.email, { latestListen })
//       : idbStore.set(constants.CHRONICLE_LATEST_LISTEN_ID, latestListen))(
//     user?.token?.access_token,
//     {
//       podcastId,
//       podcastName,
//       audioUrl,
//       audioPosition,
//       podcastUrl,
//       itemIndex,
//       duration,
//       title,
//     }
//   )

// const db10StoreLatestListen = debounce(10000)(storeLatestListen)

// const useChronicleWriter = () => {
//   const audioMode = useSelector(selectors.getAudioMode)
//   const podcastId = useSelector(selectors.getAudioPodcastId)
//   const podcastName = useSelector(selectors.getAudioPodcastName)
//   const audioUrl = useSelector(selectors.getAudioUrl)
//   const audioPosition = useSelector(selectors.getAudioPosition)

//   const podcastUrl = useSelector(selectors.getAudioPodcastUrl)
//   const itemIndex = useSelector(selectors.getAudioItemIndex)
//   const duration = useSelector(selectors.getAudioDuration)
//   const title = useSelector(selectors.getAudioTitle)

//   const user = useSelector(selectors.getUser)

//   React.useEffect(() => {
//     if (audioMode === storeConstants.AUDIO_MODE_PLAY)
//       db10StoreLatestListen(
//         user,
//         podcastId,
//         podcastName,
//         audioUrl,
//         audioPosition,
//         podcastUrl,
//         itemIndex,
//         duration,
//         title
//       )
//   }, [audioMode, audioPosition, audioUrl, podcastId])
// }

// const useChronicleReader = () => {
//   const dispatch = useDispatch()

//   const userData = useSelector(selectors.getUserData)

//   React.useEffect(
//     // on mount, check if the "latest listen" might be useful wrt current redux
//     // i.e. if no audio is already selected, then autoload..
//     () => {
//       dispatch(thunks.audio.maybeUseLatestListen(getLatestListen(userData)))
//     },
//     [userData]
//   )
// }

// const useChronicle = () => {
//   useChronicleWriter()
//   useChronicleReader()
// }

// export default useChronicle
