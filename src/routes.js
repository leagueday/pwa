import React from 'react'

const ChannelScreen = React.lazy(() => import('./views/ChannelScreen'))
const IconDump = React.lazy(() => import('./views/IconDump'))
const HomeScreen = React.lazy(() => import('./views/HomeScreen'))
const PodcastScreen = React.lazy(() => import('./views/PodcastScreen'))

const DEFAULT_PATH = null

export const routesConfig = [
  [
    'icons',
    IconDump,
    { }
  ],
  [
    'channel',
    ChannelScreen,
    { channelTag: 'nextPathToken' },
  ],
  [
    'podcast',
    PodcastScreen,
    { podcastId: 'nextPathToken' },
  ],
  [
    DEFAULT_PATH,
    HomeScreen,
    { },
  ],
]
