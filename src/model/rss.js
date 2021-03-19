// RSS has several different standards (versions 0.91, 1, 2, with variants).
//
// The `usePodcast` hook found in the `api` subpackage returns a raw JSON
// copy of the RSS document without any concern for what the format or
// content is, even whether it's valid.
//
// This component is intended to provide some lenses on the raw JSON RSS
// document, that can be used to try to optimistically interpret the RSS
// doc according to one of the standards.

// note the selectors pattern engenders a mutation-free style.
// avoid use of any mutators defined here

export const channelSelectors = {
  v2: {
    description: rssDoc => rssDoc?.rss?.channel?.description,
    imageUrl: rssDoc => {
      const channel = rssDoc?.rss?.channel

      // take the channel.image.url if available
      const imageUrl = channel?.image?.url

      if (imageUrl) return imageUrl

      // fallback to itunes:image
      const itunesImage = channel?.['itunes:image']

      if (!itunesImage) return null

      // outstandingly, this may be an array
      if (Array.isArray(itunesImage)) {
        return itunesImage[0]?.attributes?.href
      }
      else {
        return itunesImage.attributes?.href
      }
    },
    items: rssDoc => rssDoc?.rss?.channel?.item,
    language: rssDoc => rssDoc?.rss?.channel?.language,
    title: rssDoc => rssDoc?.rss?.channel?.title,
  },
}

// mutators intended *only* for the "scrub after parse" that might be
// better done in a backend along with the rss parse itself.
export const channelMutators = {
  v2: {
    imageUrl: (rssDoc, nextImageUrl) => {
      const channel = rssDoc?.rss?.channel
      const channelImageUrl = channel?.image?.url
      const itunesImage = channel?.['itunes:image'] // fallback to itunes:image

      if (channelImageUrl) {
        channel.image.url = nextImageUrl
      } else if (itunesImage) {
        // outstandingly, this may be an array
        if (Array.isArray(itunesImage)) {
          channel['itunes:image'][0].attributes.href = nextImageUrl
        } else {
          channel['itunes:image'].attributes.href = nextImageUrl
        }
      }

      return rssDoc
    }
  }
}

export const itemSelectors = {
  v2: {
    // audioType: item => item?.enclosure?.attributes?.type,
    audioUrl: item => item?.enclosure?.attributes?.url,
    description: item => item?.description,
    duration: item=> item?.['itunes:duration'],
    pubDate: item => item?.pubDate,
    title: item => item?.title,
    url: item => item?.link,
  },
}
