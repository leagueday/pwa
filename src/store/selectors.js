export const getAppState = store => store.app

export const getSelectedPodcast = store => getAppState(store)?.selectedPodcast
