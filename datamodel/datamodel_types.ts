export interface PodcastTrackPosition {
  podcastUrl: string // identify podcast
  itemAudioUrl: string // identify podcast item
  position: number // offset into item audio, seconds
}

export interface PodcastParseResult {
  rssUrl: string
  latestPubDate: string
  parseTimestamp: string
  channelImageUrl: string
  title: string
  channelDescription: string
}
