import React from 'react';

const ChannelScreen = React.lazy(() => import('./views/ChannelScreen'))
const EventScreen = React.lazy(() => import('./views/EventScreen'))
const IconDump = React.lazy(() => import('./views/IconDump'))
const HomeScreen = React.lazy(() => import('./views/HomeScreen'))
const ProfileScreen = React.lazy(() => import('./views/MyProfile'))
const GoLive = React.lazy(() => import('./views/GoLive'));
const UploadAudio = React.lazy(() => import('./views/Upload'))
const PodcastScreen = React.lazy(() => import('./views/PodcastScreen'));
const GoToLiveData = React.lazy(() => import('./views/GoLive/GoLiveData'));
const PreviewPage = React.lazy(() => import('./views/GoLive/PreviewPage'));
const DestributionPage = React.lazy(() => import('./views/GoLive/DestributionPage'));
const CreateProfile = React.lazy(() => import('./views/MyProfile/CreateProfile'));
const EditProfile = React.lazy(() => import('./views/MyProfile/EditProfile'));
const matchFirstToken = match => pathTokens =>
  pathTokens?.length > 0 && pathTokens[0] === match
const takeNextToken = pathTokens =>
  pathTokens.length > 1 ? pathTokens[1] : null
const isAdminUser = userData => (userData?.isAdmin ? true : false)

export const routesConfig = [
  [
    matchFirstToken('profile'),
    () => true,
    ProfileScreen,
    pathTokens => ({
      userId: takeNextToken(pathTokens),
    }),
  ],
  [
    matchFirstToken('channel'),
    () => true,
    ChannelScreen,
    pathTokens => ({
      channelTag: takeNextToken(pathTokens),
    }),
  ],
  [
    matchFirstToken('LCS'),
    () => true,
    ChannelScreen,
    pathTokens => ({
      channelTag: 'lcs',
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
  [matchFirstToken('upload'), () => true, UploadAudio, () => ({})],
  [matchFirstToken('live'), () => true, GoLive, () => ({})],
  [matchFirstToken('gotolive'), () => true, GoToLiveData, () => ({})],
  [matchFirstToken('preview'), () => true, PreviewPage, () => ({})],
  [matchFirstToken('channelist'), () => true, DestributionPage, () => ({})],
  [matchFirstToken('create'), () => true, CreateProfile, () => ({})],
  [matchFirstToken('editprofile'), () => true, EditProfile, () => ({})],
  [() => true, () => true, HomeScreen, () => ({})],
];