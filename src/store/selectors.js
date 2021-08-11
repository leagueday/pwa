// App

export const getAppState = store => store.app
export const getAudioControlsExpanded = store => store.app.audioControlsExpanded
export const getAudioControlsHidden = store => store.app.audioControlsHidden
export const getFilter = store => getAppState(store)?.filter
export const getMyList = store => getAppState(store)?.userData?.my
export const getNavExpander = tag => store =>
  getAppState(store)?.navExpanders?.[tag]
export const getNavVisibility = store => getAppState(store)?.navVisibility
export const getPageNum = id => store => getAppState(store)?.pageNums[id]
export const getTaps = store => getAppState(store)?.taps
export const getTheme = store => getAppState(store)?.theme
export const getUser = store => getAppState(store)?.user
export const getUserData = store => getAppState(store)?.userData
export const getFriendsList = store => getAppState(store)?.friends

// Router

export const getRouterState = store => store.router
export const getRouterLocation = store => getRouterState(store)?.location

// Audio

export const getAudioState = store => store.audio
export const getAudioDuration = store => getAudioState(store)?.duration
export const getAudioEvents = store => getAudioState(store)?.events
export const getAudioItemIndex = store => getAudioState(store)?.itemIndex
export const getAudioMode = store => getAudioState(store)?.mode
export const getAudioPodcastId = store => getAudioState(store)?.podcastId
export const getAudioPodcastName = store => getAudioState(store)?.podcastName
export const getAudioPodcastUrl = store => getAudioState(store)?.podcastUrl
export const getAudioPosition = store => getAudioState(store)?.position
export const getAudioSeek = store => getAudioState(store)?.seek
export const getAudioSeeked = store => getAudioState(store)?.events.seeked
export const getAudioTaps = store => getAudioState(store)?.taps
export const getAudioTitle = store => getAudioState(store)?.title
export const getAudioUrl = store => getAudioState(store)?.audioUrl
export const getAudioVolume = store => getAudioState(store)?.volume
