import React from 'react'

const IconDump = React.lazy(() => import('./views/IconDump'))
const MainScreen = React.lazy(() => import('./views/MainScreen'))
const PodcastScreen = React.lazy(() => import('./views/PodcastScreen'))

const DEFAULT_PATH = null

export const routesConfig = [
  [
    'icons',
    IconDump,
    { }
  ],
  [
    'podcast',
    PodcastScreen,
    { podcastId: 'nextPathToken' },
  ],
  [
    DEFAULT_PATH,
    MainScreen,
    { },
  ],
]
