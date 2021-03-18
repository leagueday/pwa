import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import useFacets from '../../api/useFacets'
import BottomBlock from '../BottomBlock'
import ContentLayout from '../ContentLayout'
import Square from '../Square'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import LiveBroadcastsMockup, {mockupGetHasBroadcasts as hasLiveMockupData} from './LiveBroadcastsMockup'
import PlusMinusButton from './PlusMinusButton'
import ReplayBroadcastsMockup, {mockupGetHasBroadcasts as hasReplayMockupData} from './ReplayBroadcastsMockup'

const useStyles = makeStyles(theme => ({
  channelColor: ({channelColor}) => ({
    color: channelColor,
  }),
  headline: {
    padding: '1em',
    width: '100%',
    overflow: 'hidden',
  },
  headlineTitleRow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    fontSize: '150%',
    fontWeight: theme.typography.weight.bold,
    userSelect: 'none',
  },
  headlineTypename: {
    textTransform: 'uppercase',
    userSelect: 'none',
  },
  liveBroadcasts: {
    marginTop: '1.5em',
  },
  logoImage: {
    width: '100%',
  },
  logoImageContainer: {
    paddingTop: '0.5em',
    width: '7em',
  },
}))

const Logo = ({channel, classes}) => (
  <Square className={classes.logoImageContainer}>
    <img className={classes.logoImage} src={channel?.imageUrl} />
  </Square>
)

const Headline = ({channel, classes, hasBroadcasts}) => (
  <div className={classes.headline}>
    <div className={classes.headlineTypename}>
      Audio Content Aggregator
    </div>
    <div className={cx(classes.headlineTitleRow, classes.channelColor)}>
      {channel.title}
    </div>
    <div className={classes.headlineTitleRow}>
      {
        hasBroadcasts ? 'Podcasts and Live Events AudioCasts' : 'Podcasts'
      }
    </div>
    <div className={classes.headlineTitleRow}>
      <PlusMinusButton channelTag={channel.tag} channelTitle={channel.title} />
    </div>
  </div>
)

const AggregatorContent = ({channel}) => {
  const classes = useStyles({channelColor: channel.color})

  const facets = useFacets(channel.tag)

  const hasLive = hasLiveMockupData(channel)
  const hasReplay = hasReplayMockupData(channel)

  return (
    <ContentLayout
      accentColor={channel.color}
      renderTopLeft={
        () => (<Logo channel={channel} classes={classes} />)
      }
      renderTopRight={
        () => (<Headline channel={channel} classes={classes} hasBroadcasts={hasLive || hasReplay}/>)
      }>
      { hasLive && (
        <BottomBlock accentColor={channel.color} titleStart={channel.title} titleRest="Live">
          <LiveBroadcastsMockup
            className={classes.liveBroadcasts}
            channel={channel}
            channelColor={channel.color} />
        </BottomBlock>
      )}
      { hasReplay && (
        <BottomBlock accentColor={channel.color} titleStart={channel.title} titleRest="Replays">
          <ReplayBroadcastsMockup
            className={classes.replayBroadcasts}
            channel={channel}
            channelColor={channel.color} />
        </BottomBlock>
      )}
        <BottomBlock accentColor={channel.color} titleStart={channel.title} titleRest="Podcasts">
          <FacetedPodcastTiles data={facets} />
        </BottomBlock>
    </ContentLayout>
  )
}

export default AggregatorContent
