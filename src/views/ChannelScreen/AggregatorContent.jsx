import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import useFacets from '../../api/useFacets'
import BottomBlock from '../BottomBlock'
import ContentLayout from '../ContentLayout'
import Square from '../Square'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import PreviousBroadcastsMockup, {mockupGetHasBroadcasts} from './PreviousBroadcastsMockup'

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
  logoImage: {
    width: '100%',
  },
  logoImageContainer: {
    width: '100%',
  },
  previousBroadcasts: {
    marginTop: '1.5em',
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
  </div>
)

const AggregatorContent = ({channel}) => {
  const classes = useStyles({channelColor: channel.color})

  const facets = useFacets(channel.tag)

  const hasBroadcasts = mockupGetHasBroadcasts(channel)

  return (
    <ContentLayout
      accentColor={channel.color}
      renderTopLeft={
        () => (<Logo channel={channel} classes={classes} />)
      }
      renderTopRight={
        () => (<Headline channel={channel} classes={classes} hasBroadcasts={hasBroadcasts}/>)
      }>
        <BottomBlock accentColor={channel.color} titleStart={channel.title} titleRest="Podcasts">
          <FacetedPodcastTiles data={facets} />
        </BottomBlock>
        { hasBroadcasts && (
          <BottomBlock accentColor={channel.color} titleStart={channel.title} titleRest="Live Event Replays">
            <PreviousBroadcastsMockup
              className={classes.previousBroadcasts}
              channel={channel}
              channelColor={channel.color} />
          </BottomBlock>
        )}
    </ContentLayout>
  )
}

export default AggregatorContent
