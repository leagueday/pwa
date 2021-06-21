import React from 'react'
import cx from 'classnames'
import NextLive from '../NextLive';
import { makeStyles } from '@material-ui/core/styles'

import useFacets from '../../api/useFacets'
import BottomBlock from '../BottomBlock'
import ContentLayout from '../ContentLayout'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import PlusMinusButton from '../PlusMinusButton'
import LiveBroadcastsMockup, {
  mockupGetHasBroadcasts as hasLiveMockupData,
} from './LiveBroadcastsMockup'
import ReplayBroadcastsMockup, {
  mockupGetHasBroadcasts as hasReplayMockupData,
} from './ReplayBroadcastsMockup'

const useStyles = makeStyles(theme => ({
  channelColor: ({ channelColor }) => ({
    color: channelColor,
  }),
  headline: {
    padding: '1em',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.only('xs')]: {
      padding: '2vw',
    },
  },
  headlineTitleRow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    fontSize: '150%',
    fontWeight: theme.typography.weight.bold,
    userSelect: 'none',
    [theme.breakpoints.only('xs')]: {
      fontSize: '90%',
    },
  },
  liveBroadcasts: {
    marginTop: '1.5em',
    [theme.breakpoints.only('xs')]: {
      marginTop: '3vw',
    },
  },
  logoImage: {
    width: '100%',
  },
  logoImageContainer: {
    paddingTop: '0.5em',
    position: 'relative',
    width: '10.5em',
    [theme.breakpoints.only('xs')]: {
      paddingTop: '2vw',
      width: '20vw',
    },
  },
  plusMinusButton: {
    bottom: '0.5em',
    position: 'absolute',
    right: '0.5em',
    [theme.breakpoints.only('xs')]: {
      bottom: '2vw',
      right: '2vw',
    },
  },
}))

const Logo = ({ channel, classes }) => (
  <div className={classes.logoImageContainer}>
    <img className={classes.logoImage} src={channel?.imageUrl} />
    <div className={classes.headlineTitleRow}>
      <PlusMinusButton
        className={classes.plusMinusButton}
        subjectId={channel.tag}
        subjectKind="channel"
      />
    </div>
  </div>
)

const Headline = ({ channel, classes, hasBroadcasts }) => (
  <div className={classes.headline}>
    <div className={cx(classes.headlineTitleRow, classes.channelColor)}>
      {channel.title}
    </div>
    <div className={classes.headlineTitleRow}>
      {hasBroadcasts ? 'Live AudioCasts and Replays' : 'Podcasts'}
    </div>
    <NextLive titleStart={channel.title}/>
  </div>
)

const AggregatorContent = ({ channel }) => {
  const classes = useStyles({ channelColor: channel.color })
  const facets = useFacets(channel.tag)
  const hasLive = hasLiveMockupData(channel)
  const hasReplay = hasReplayMockupData(channel)

  return (
    <ContentLayout
      accentColor={channel.color}
      renderTopLeft={() => <Logo channel={channel} classes={classes} />}
      renderTopRight={() => (
        <Headline
          channel={channel}
          classes={classes}
          hasBroadcasts={hasLive || hasReplay}
        />
      )}
    >
      {hasLive && (
        <BottomBlock
          accentColor={channel.color}
          titleStart={channel.title}
          titleRest="Live"
        >
          <LiveBroadcastsMockup
            className={classes.liveBroadcasts}
            channel={channel}
            channelColor={channel.color}
          />
        </BottomBlock>
      )}

      {hasReplay && (
        <BottomBlock
          accentColor={channel.color}
          titleStart={channel.title}
          titleRest="Replays"
        >
          <ReplayBroadcastsMockup
            className={classes.replayBroadcasts}
            channel={channel}
            channelColor={channel.color}
          />
        </BottomBlock>
      )}
     
     {channel.tag != 'lol' ? (
         <BottomBlock
            accentColor={channel.color}
            titleStart={channel.title}
            titleRest="Podcasts"
          >
            <FacetedPodcastTiles data={facets} />
          </BottomBlock>   
       ):''
     }
      
    </ContentLayout>
  )
}

export default AggregatorContent
