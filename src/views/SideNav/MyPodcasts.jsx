import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'

import useMyList from '../../api/useMyList'
import usePodcast from '../../api/usePodcast'
import usePodcasts from '../../api/usePodcasts'
import {channelSelectors} from '../../model/rss'
import {actions, selectors, useLocationPathname} from '../../store'
import {colors} from '../../styling'

import Item from './Item'

const useStyles = makeStyles({
  myPodcasts: {
  },
  image: {
    border: `2px solid ${colors.white80}`,
  },
})

const isPodcastSelected = (locationPathname, podcastId) => {
  const path = locationPathname ?? ''

  if (path.substr(0, 9) !== '/podcast/') {
    return false
  }
  else {
    return path.substr(9) === podcastId
  }
}

const MyPodcastItem = ({podcast, isSelected, onClick, imageClass, skinny}) => {
  const {rss} = usePodcast(podcast)

  const title = channelSelectors.v2.title(rss)
  const imageUrl = channelSelectors.v2.imageUrl(rss)

  return (
    <Item
      imageClass={imageClass}
      imageUrl={imageUrl}
      title={title}
      isSelected={isSelected}
      onClick={onClick}
      skinny={skinny}
    />
  )
}

const MyPodcasts = ({skinny}) => {
  const classes = useStyles()

  const user = useSelector(selectors.getUser)

  const [getIsOnMyList, addToMyList, removeFromMyList, isMyListEmpty] = useMyList(user?.token?.access_token)
  const {data: podcasts} = usePodcasts()

  const myListPodcasts = isMyListEmpty || !podcasts ? [] : podcasts.filter(podcast => getIsOnMyList('podcast', podcast.id))

  // tbd add channels

  const dispatch = useDispatch()
  const makeGotoThisPodcast = podcastId => () => dispatch(actions.pushHistory(`/podcast/${podcastId}`))

  const locationPathname = useLocationPathname()

  return (
    <div className={classes.myPodcasts}>
      {
        myListPodcasts.map(
          podcast => (
            <MyPodcastItem
              key={podcast.id}
              podcast={podcast}
              onClick={makeGotoThisPodcast(podcast.id)}
              isSelected={isPodcastSelected(locationPathname, podcast.id)}
              imageClass={classes.image}
              skinny={skinny}
            />
          )
        )
      }
    </div>
  )
}

export default MyPodcasts
