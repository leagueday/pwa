export const getAppState = store => store.app

export const getCategoryFilter = store => getAppState(store)?.categoryFilter
export const getSelectedAudio = store => getAppState(store)?.selectedAudio
export const getSelectedAudioMode = store => getAppState(store)?.selectedAudio?.mode
export const getSelectedAudioUrl = store => getAppState(store)?.selectedAudio?.url
export const getSelectedPodcast = store => getAppState(store)?.selectedPodcast
export const getShowCategories = store => getAppState(store)?.showCategories
export const getStarred = store => getAppState(store)?.starred
export const getTheme = store => getAppState(store)?.theme

export const getRouterState = store => store.router
export const getRouterLocation = store => getRouterState(store)?.location
export const getRouterPreviousLocations = store => getRouterState(store)?.previousLocations
