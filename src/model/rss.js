// RSS has several different standards (versions 0.91, 1, 2, with variants).
//
// The `usePodcast` hook found in the `api` subpackage returns a raw JSON
// copy of the RSS document without any concern for what the format or
// content is, even whether it's valid.
//
// This component is intended to provide some lenses on the raw JSON RSS
// document, that can be used to try to optimistically interpret the RSS
// doc according to one of the standards.

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
