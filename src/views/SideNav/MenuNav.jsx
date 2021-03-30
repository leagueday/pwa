import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {makeStyles} from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import {channelSelectors} from '../../model/rss'
import {actions, selectors} from '../../store'
import useChannels from '../../api/useChannels'
import useMyList from '../../api/useMyList'
import usePodcasts from '../../api/usePodcasts'
import usePodcast from '../../api/usePodcast'

const useStyles = makeStyles(theme => ({
}))

const PodcastMenuItem = ({onClick, podcast}) => {
  const {rss} = usePodcast(podcast)

  const title = channelSelectors.v2.title(rss)
  // const imageUrl = channelSelectors.v2.imageUrl(rss)

  return (<MenuItem onClick={onClick}>{title}</MenuItem>)
}

const MenuNav = ({anchor, hide, home, isVisible}) => {
  const hideAnd = alsoDo => () => {
    hide()
    alsoDo()
  }

  const dispatch = useDispatch()

  const user = useSelector(selectors.getUser)
  const isAuthenticated = !!user

  const signOut = () => dispatch(actions.logout())
  const signIn = () => dispatch(actions.login())

  const [signInOutText, signInOut] = isAuthenticated ? ['Sign Out', signOut] : ['Sign In', signIn]

  const goHome = home ? null : () => dispatch(actions.pushHistory('/'))

  const myChannels = useChannels().myList
  const makeGotoChannel = channelTag => hideAnd(() => dispatch(actions.pushHistory(`/channel/${channelTag}`)))
  const makeGotoPodcast = podcastId => hideAnd(() => dispatch(actions.pushHistory(`/podcast/${podcastId}`)))

  const [getIsOnMyList, addToMyList, removeFromMyList, isMyListEmpty] = useMyList(user?.token?.access_token)
  const {data: podcasts} = usePodcasts()
  const myListPodcasts = isMyListEmpty || !podcasts ? [] : podcasts.filter(podcast => getIsOnMyList('podcast', podcast.id))

  const classes = useStyles()

  return (
    <Menu
      id="menu-nav"
      anchorEl={anchor}
      keepMounted
      open={isVisible}
      onClose={hide}
    >
      {goHome && <MenuItem onClick={hideAnd(goHome)}>Home</MenuItem>}
      { myChannels.map(
        ({tag, title, imageUrl}) => (
          <MenuItem key={tag} onClick={makeGotoChannel(tag)}>{title}</MenuItem>
        )
      ) }
      { myListPodcasts.map(
        podcast => (
          <PodcastMenuItem key={podcast.id} onClick={makeGotoPodcast(podcast.id)} podcast={podcast} />
        )
      ) }
      <MenuItem onClick={hideAnd(signInOut)}>{signInOutText}</MenuItem>
    </Menu>
  )
}

export default MenuNav
