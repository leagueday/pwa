
// App

export const getAppState = store => store.app
export const getFilter = store => getAppState(store)?.filter
export const getNavExpander = tag => store => getAppState(store)?.navExpanders?.[tag]
export const getNavVisibility = store => getAppState(store)?.navVisibility
export const getSelectedPodcast = store => getAppState(store)?.selectedPodcast
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
export const getAudioSeeked = store => getAudioState(store)?.audioSeeked
export const getAudioTapsForward = store => getAudioState(store)?.controllerTaps.forward
export const getAudioTapsReplay = store => getAudioState(store)?.controllerTaps.replay
export const getAudioTitle = store => getAudioState(store)?.title
export const getAudioUrl = store => getAudioState(store)?.audioUrl
