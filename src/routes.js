import React from 'react'

const ChannelScreen = React.lazy(() => import('./views/ChannelScreen'))
const IconDump = React.lazy(() => import('./views/IconDump'))
const HomeScreen = React.lazy(() => import('./views/HomeScreen'))
const PodcastScreen = React.lazy(() => import('./views/PodcastScreen'))
const PodcastScreen2 = React.lazy(() => import('./views/PodcastScreen2'))

const matchFirstToken = match => pathTokens => pathTokens?.length > 0 && pathTokens[0] === match
const takeNextToken = pathTokens => pathTokens.length > 1 ? pathTokens[1] : null

//
// routesConfig: Array<[testRoute, View, getViewProps]>
//

export const routesConfig = [
  [
    matchFirstToken('icons'),
    IconDump,
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
    matchFirstToken('podcast'),
    PodcastScreen,
    pathTokens => ({
      podcastId: takeNextToken(pathTokens)
    })
  ],
  [
    matchFirstToken('podcast2'),
    PodcastScreen2,
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
