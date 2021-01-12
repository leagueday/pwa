
// App

export const getAppState = store => store.app
export const getCategoryFilter = store => getAppState(store)?.categoryFilter
export const getSelectedPodcast = store => getAppState(store)?.selectedPodcast
export const getShowCategories = store => getAppState(store)?.showCategories
export const getStarred = store => getAppState(store)?.starred
export const getTheme = store => getAppState(store)?.theme

// Router

export const getRouterState = store => store.router
export const getRouterLocation = store => getRouterState(store)?.location
export const getRouterPreviousLocations = store => getRouterState(store)?.previousLocations

// Audio

export const getAudioState = store => store.audio
export const getAudioDuration = store => getAudioState(store)?.duration
export const getAudioItemIndex = store => getAudioState(store)?.itemIndex
export const getAudioMode = store => getAudioState(store)?.mode
export const getAudioPodcastId = store => getAudioState(store)?.podcastId
export const getAudioPodcastUrl = store => getAudioState(store)?.podcastUrl
export const getAudioPosition = store => getAudioState(store)?.position
export const getAudioSeek = store => getAudioState(store)?.seek
export const getAudioTapsForward = store => getAudioState(store)?.controllerTaps.forward
export const getAudioTapsReplay = store => getAudioState(store)?.controllerTaps.replay
export const getAudioUrl = store => getAudioState(store)?.audioUrl
