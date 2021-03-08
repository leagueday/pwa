import React from 'react'

const AuthDemo = React.lazy(() => import('./views/AuthDemo'))
const ChannelScreen = React.lazy(() => import('./views/ChannelScreen'))
const EventScreen = React.lazy(() => import('./views/EventScreen'))
const IconDump = React.lazy(() => import('./views/IconDump'))
const HomeScreen = React.lazy(() => import('./views/HomeScreen'))
const PodcastScreen = React.lazy(() => import('./views/PodcastScreen'))

const matchFirstToken = match => pathTokens => pathTokens?.length > 0 && pathTokens[0] === match
const takeNextToken = pathTokens => pathTokens.length > 1 ? pathTokens[1] : null

//
// routesConfig: Array<[testRoute, View, getViewProps]>
//

export const routesConfig = [
  [
    matchFirstToken('auth-demo'),
    AuthDemo,
    () => ({})
  ],
  [
    matchFirstToken('channel'),
    ChannelScreen,
    pathTokens => ({
      channelTag: takeNextToken(pathTokens)
    }),
  ],
  [
    matchFirstToken('event'),
    EventScreen,
    pathTokens => ({
      tag: takeNextToken(pathTokens)
    })
  ],
  [
    matchFirstToken('icons'),
    IconDump,
    () => ({})
  ],
  [
    matchFirstToken('podcast'),
    PodcastScreen,
    pathTokens => ({
      podcastId: takeNextToken(pathTokens)
    })
  ],
  [
    () => true,
    HomeScreen,
    () => ({}),
  ],
]
