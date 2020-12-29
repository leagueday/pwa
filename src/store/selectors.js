export const getAppState = store => store.app

export const getSelectedAudio = store => getAppState(store)?.selectedAudio
export const getSelectedAudioMode = store => getAppState(store)?.selectedAudio?.mode
export const getSelectedAudioUrl = store => getAppState(store)?.selectedAudio?.url
export const getSelectedPodcast = store => getAppState(store)?.selectedPodcast
export const getShowCategories = store => getAppState(store)?.showCategories
export const getTheme = store => getAppState(store)?.theme
