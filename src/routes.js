import React from 'react'

import MainScreen from './views/MainScreen'
import PodcastScreen from './views/PodcastScreen'

const DEFAULT_PATH = null

export const routesConfig = [
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
