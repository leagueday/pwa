
import * as actions from '../../actions'
import * as selectors from '../../selectors'
import { channelSelectors, itemSelectors } from '../../../model/rss'
import { loadOrFetchPodcastRssDoc } from '../../../api/usePodcast'

export const maybeUseLatestListen =
  getLatestListen =>
    (dispatch, getState) => {
      getLatestListen().then(
        maybeLatestListen => {
          const podcastId = maybeLatestListen?.podcastId
          const audioUrl = maybeLatestListen?.audioUrl
          const audioPosition = maybeLatestListen?.audioPosition

          const podcastUrl = maybeLatestListen?.podcastUrl
          const itemIndex = maybeLatestListen?.itemIndex
          const duration = maybeLatestListen?.duration
          const title = maybeLatestListen?.title

          if (!podcastId || !audioUrl || !audioPosition) return

          const currentPodcastId = selectors.getAudioPodcastId(getState())
          const currentPodcastUrl = selectors.getAudioPodcastUrl(getState())

          if (currentPodcastId && currentPodcastUrl) return

          dispatch(actions.selectAudio(
            podcastId,
            podcastUrl,
            audioUrl,
            itemIndex,
            duration,
            title,
            audioPosition
          ))
        }
      )
    }

export const playNextTrack =
  () =>
    (dispatch, getState) => {
      const podcastId = selectors.getAudioPodcastId(getState())
      const podcastUrl = selectors.getAudioPodcastUrl(getState())
      const itemIndex = selectors.getAudioItemIndex(getState())

      loadOrFetchPodcastRssDoc(podcastId, podcastUrl).then(
        maybePodcastRssDoc => {
          const items = channelSelectors.v2.items(maybePodcastRssDoc)
          if (!items) {
            console.error('missing items during play-next', podcastId, podcastUrl)
            return
          }

          const nextItemIndex = itemIndex + 1

          if (!items.length || items.length <= nextItemIndex) {
            console.log('end of items', podcastId, podcastUrl, itemIndex)
          }

          const nextItem = items[nextItemIndex]

          const nextItemUrl = itemSelectors.v2.audioUrl(nextItem)
          const nextItemDuration = itemSelectors.v2.duration(nextItem)
          const nextItemTitle = itemSelectors.v2.title(nextItem)

          dispatch(actions.selectAudio(podcastId, podcastUrl, nextItemUrl, nextItemIndex, nextItemDuration, nextItemTitle))
        }
      )
    }
