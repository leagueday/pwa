import { PodcastParseResult, PodcastTrackPosition } from './datamodel_types'

// collection schema
export interface User {
  emailAddress: string // unique id
  latestListen: PodcastTrackPosition
  isSuperuser: boolean
  podcasts: Array<string> // [foreign key]
  channels: Array<string> // [foreign key]
}

// collection schema
export interface Podcast {
  rssUrl: string // unique id
  isDisabled: boolean
  accentColor?: string
  parseResult?: PodcastParseResult
  note?: string
  description?: string // curation - ours
}

// collection schema
export interface Facet {
  title: string // unique id
  podcasts: Array<string> // [foreign key]
}

// collection schema
export interface ViewFacet {
  viewName: string // unique id
  facets: Array<string> // [foreign key]
}

// collection schema
export interface Channel {
  title: string // unique id
  imageUrl: string
  facets: Array<string> // [foreign key]
}

// a single document
export interface GlobalChannels {
  channels: Array<string> // [foreign key]
  cutoff: number
}

// collection schema
export interface ChannelCategory {
  title: string // unique id
  channels: Array<string> // [foreign key]
}
