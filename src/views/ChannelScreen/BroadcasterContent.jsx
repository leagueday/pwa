import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import useFacets from '../../api/useFacets'
import BottomBlock from '../BottomBlock'
import ContentLayout from '../ContentLayout'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import Square from '../Square'
import BroadcasterTextPlate from './BroadcasterTextPlate'
import ChannelChildren from './ChannelChildren'
import LiveBroadcastsMockup from './LiveBroadcastsMockup'
import MockupPlusMinusButtons from './MockupPlusMinusButtons'
import ReplayBroadcastsMockup from './ReplayBroadcastsMockup'

const useStyles = makeStyles({
  bottomBlockItem: { },
  bottomGrid: { },
  children: {
    padding: '1em',
  },
  childrenGridItem: {
    maxHeight: '100%',
    minHeight: 0,
  },
  image: {
    width: '100%',
  },
  imageSquare: {
    width: '7em',
  },
  imageTitleGrid: {
    flex: 0,
    paddingTop: '1em',
  },
  liveBroadcasts: {
    marginBottom: '1em',
  },
  liveness: {
    marginBottom: '1em',
  },
  livenessGridItem: {
    padding: '1em',
  },
  replayBroadcasts: {
    marginBottom: '1em',
  },
  textPlate: {
    width: '100%',
  },
  titleBioGridItem: {
    paddingLeft: '1em',
  },
  topLeftGrid: {
    marginBottom: '1em',
  },
  topLeftGridItem: {
    paddingRight: '1em',
  },
  topRightGrid: {
    marginBottom: '1em',
  },
  topRightGridItem: {
    marginBottom: '1em',
  },
})

const TopSection = ({classes, channel}) => (
  <Grid className={classes.imageTitleGrid} container>
    <Grid className={classes.topLeftGridItem} item xs={6} sm={4} lg={2}>
      <Square className={classes.imageSquare}>
        <img className={classes.image} src={channel.imageUrl} />
      </Square>
    </Grid>
    <Grid className={classes.topRightGridItem} item xs={12} sm={8} md={6} lg={10}>
      <BroadcasterTextPlate channel={channel} className={classes.textPlate}/>
      <MockupPlusMinusButtons channelTag={channel.tag} channelTitle={channel.title} />
      <ChannelChildren className={classes.children} childTags={channel.children} />
    </Grid>
  </Grid>
)

const BroadcasterContent = ({channel}) => {
  const classes = useStyles({channelColor: channel.color})

  const facetedPodcasts = useFacets(channel.tag)

  return (
    <ContentLayout
      accentColor={channel.color}
      renderTop={
        () => (
          <TopSection channel={channel} classes={classes} />
        )
      }
    >
      <Grid className={classes.bottomGrid} container>
        <Grid className={classes.bottomBlockItem} item xs={12}>
          <BottomBlock accentColor={channel.color} titleStart="Live" titleRest="Broadcasts">
            <LiveBroadcastsMockup
              className={classes.liveBroadcasts}
              channel={channel}
              channelColor={channel.color}
            />
          </BottomBlock>
        </Grid>
        <Grid className={classes.bottomBlockItem} item xs={12}>
          <BottomBlock accentColor={channel.color} titleStart="Replay" titleRest="Broadcasts">
            <ReplayBroadcastsMockup
              className={classes.replayBroadcasts}
              channel={channel}
              channelColor={channel.color}
            />
          </BottomBlock>
        </Grid>
        <Grid className={classes.bottomBlockItem} item xs={12}>
          <BottomBlock accentColor={channel.color} titleStart="Top" titleRest="Podcasts">
            <FacetedPodcastTiles data={facetedPodcasts} />
          </BottomBlock>
        </Grid>
      </Grid>
    </ContentLayout>
  )
}

export default BroadcasterContent
