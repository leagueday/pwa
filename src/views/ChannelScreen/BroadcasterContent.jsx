import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import useFacets from '../../api/useFacets'
import BottomBlock from '../BottomBlock'
import ContentLayout from '../ContentLayout'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import PlusMinusButton from '../PlusMinusButton'
import BroadcasterTextPlate from './BroadcasterTextPlate'
import ChannelChildren from './ChannelChildren'
import LiveBroadcastsMockup from './LiveBroadcastsMockup'
import ReplayBroadcastsMockup from './ReplayBroadcastsMockup'
import ReplayLiveBroadCast from './ReplayLiveBroadCast'
const useStyles = makeStyles(theme => ({
  bottomBlockItem: {},
  bottomGrid: {},
  children: {
    padding: '1em',
    [theme.breakpoints.only('xs')]: {
      padding: '2vw',
    },
  },
  childrenGridItem: {
    maxHeight: '100%',
    minHeight: 0,
  },
  imageTitleGrid: {
    flex: 0,
    paddingTop: '1em',
    [theme.breakpoints.only('xs')]: {
      paddingTop: '2vw',
    },
  },
  liveBroadcasts: {
    marginBottom: '1em',
    [theme.breakpoints.only('xs')]: {
      marginBottom: '2vw',
    },
  },
  liveness: {
    marginBottom: '1em',
    [theme.breakpoints.only('xs')]: {
      marginBottom: '2vw',
    },
  },
  livenessGridItem: {
    padding: '1em',
    [theme.breakpoints.only('xs')]: {
      padding: '2vw',
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
      width: '25vw',
    },
  },
  plusMinusButton: {
    bottom: '0.5em',
    position: 'absolute',
    fontSize: '150%',
    right: '0.5em',
    [theme.breakpoints.only('xs')]: {
      bottom: '2vw',
      fontSize: '80%',
      right: '2vw',
    },
  },
  replayBroadcasts: {
    marginBottom: '1em',
    [theme.breakpoints.only('xs')]: {
      marginBottom: '2vw',
    },
  },
  textPlate: {
    width: '100%',
  },
  titleBioGridItem: {
    paddingLeft: '1em',
    [theme.breakpoints.only('xs')]: {
      paddingLeft: '2vw',
    },
  },
  topLeftGrid: {
    marginBottom: '1em',
    [theme.breakpoints.only('xs')]: {
      marginBottom: '2vw',
    },
  },
  topLeftGridItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '1em',
    [theme.breakpoints.only('xs')]: {
      paddingRight: '2vw',
    },
  },
  topRightGrid: {
    marginBottom: '1em',
    [theme.breakpoints.only('xs')]: {
      marginBottom: '2vw',
    },
  },
  topRightGridItem: {
    marginBottom: '1em',
    [theme.breakpoints.only('xs')]: {
      marginBottom: '2vw',
    },
  },
}))

const TopSection = ({ classes, channel }) => (
  <Grid className={classes.imageTitleGrid} container>
    <Grid className={classes.topLeftGridItem} item xs={6} sm={4} md={4} lg={2}>
      <div className={classes.logoImageContainer}>
        <img className={classes.logoImage} src={channel.imageUrl} />
        <PlusMinusButton
          className={classes.plusMinusButton}
          subjectId={channel.tag}
          subjectKind="channel"
        />
      </div>
    </Grid>
    <Grid
      className={classes.topRightGridItem}
      item
      xs={12}
      sm={8}
      md={8}
      lg={10}
    >
      <BroadcasterTextPlate channel={channel} className={classes.textPlate} />
      <ChannelChildren
        className={classes.children}
        childTags={channel.children}
      />
    </Grid>
  </Grid>
)

const BroadcasterContent = ({ channel }) => {
  const classes = useStyles({ channelColor: channel.color })

  const facetedPodcasts = useFacets(channel.tag)

  return (
    <ContentLayout
      accentColor={channel.color}
      renderTop={() => <TopSection channel={channel} classes={classes} />}
    >
      <Grid className={classes.bottomGrid} container>
        <Grid className={classes.bottomBlockItem} item xs={12}>
          <BottomBlock
            accentColor={channel.color}
            titleStart="Live"
            titleRest="Broadcasts"
          >
            <LiveBroadcastsMockup
              className={classes.liveBroadcasts}
              channel={channel}
              channelColor={channel.color}
            />
          </BottomBlock>
        </Grid>
        <Grid className={classes.bottomBlockItem} item xs={12}>
          <BottomBlock
            accentColor={channel.color}
            titleStart="Replay"
            titleRest="Broadcasts"
          >
          <ReplayLiveBroadCast   
            className={classes.replayBroadcasts}
            channel={channel}
            channelColor={channel.color}/>     
            {/* <ReplayBroadcastsMockup
              className={classes.replayBroadcasts}
              channel={channel}
              channelColor={channel.color}
            /> */}
          </BottomBlock>
        </Grid>
        <Grid className={classes.bottomBlockItem} item xs={12}>
          <BottomBlock
            accentColor={channel.color}
            titleStart="Top"
            titleRest="Podcasts"
          >
            <FacetedPodcastTiles data={facetedPodcasts} />
          </BottomBlock>
        </Grid>
      </Grid>
    </ContentLayout>
  )
}

export default BroadcasterContent
