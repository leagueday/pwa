
import * as actions from '../../actions'
import * as selectors from '../../selectors'
import { channelSelectors, itemSelectors } from '../../../model/rss'
import { loadOrFetchPodcastRssDoc } from '../../../api/usePodcast'

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

          dispatch(actions.selectAudio(podcastId, podcastUrl, nextItemUrl, nextItemIndex, nextItemDuration))
        }
      )
    }
