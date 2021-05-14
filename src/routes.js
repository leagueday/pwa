import React from 'react'

const ChannelScreen = React.lazy(() => import('./views/ChannelScreen'))
const EventScreen = React.lazy(() => import('./views/EventScreen'))
const IconDump = React.lazy(() => import('./views/IconDump'))
const HomeScreen = React.lazy(() => import('./views/HomeScreen'))
const ProfileScreen =React.lazy(()=>import('./views/MyProfile'))
const GoLive =React.lazy(()=>import('./views/GoLive'))
const PodcastScreen = React.lazy(() => import('./views/PodcastScreen'))
const SetupScreen = React.lazy(() => import('./views/SetupScreen'));
const GoToLiveData= React.lazy(() => import('./views/GoLive/GoLiveData'));
const PreviewPage=React.lazy(()=>import('./views/GoLive/PreviewPage'))
const DestributionPage=React.lazy(()=>import('./views/GoLive/DestributionPage'))
const matchFirstToken = match => pathTokens =>
  pathTokens?.length > 0 && pathTokens[0] === match
const takeNextToken = pathTokens =>
  pathTokens.length > 1 ? pathTokens[1] : null
const isAdminUser = userData => (userData?.isAdmin ? true : false)

//
// routesConfig: Array<[testRoute, checkPermission, View, getViewProps]>
//

export const routesConfig = [
  [
    matchFirstToken('channel'),
    () => true,
    ChannelScreen,
    pathTokens => ({
      channelTag: takeNextToken(pathTokens),
    }),
  ],
  [
    matchFirstToken('event'),
    () => true,
    EventScreen,
    pathTokens => ({
      tag: takeNextToken(pathTokens),
    }),
  ],
  [matchFirstToken('icons'), isAdminUser, IconDump, () => ({})],
  [
    matchFirstToken('podcast'),
    () => true,
    PodcastScreen,
    pathTokens => ({
      podcastId: takeNextToken(pathTokens),
    }),
  ],
  [
    matchFirstToken('setup'),
    isAdminUser,
    SetupScreen,
    pathTokens => ({
      subject: takeNextToken(pathTokens),
    }),
  ],
  [matchFirstToken('profile'),() => true, ProfileScreen, () => ({})],
  [matchFirstToken('live'),() => true, GoLive, () => ({})],
  [matchFirstToken('gotolive'),() => true, GoToLiveData, () => ({})],
  [matchFirstToken('preview'),() => true, PreviewPage, () => ({})],
  [matchFirstToken('channelist'),() => true, DestributionPage, () => ({})],
  [() => true, () => true, HomeScreen, () => ({})],
]
