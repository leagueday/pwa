import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import useFacets from '../../api/useFacets'
import BottomBlock from '../BottomBlock'
import ContentLayout from '../ContentLayout'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import BroadcasterTextPlate from './BroadcasterTextPlate'
import ChannelChildren from './ChannelChildren'
import Liveness from './Liveness'
import PreviousBroadcastsMockup from './PreviousBroadcastsMockup'

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
    height: '100%',
    width: '100%',
  },
  imageGridItem: {
    paddingRight: '4em',
  },
  imageTitleGrid: {
    flex: 0,
    paddingTop: '0.25em',
  },
  liveness: {
    marginBottom: '1em',
  },
  livenessGridItem: {
    padding: '1em 4em',
  },
  previousBroadcasts: {
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
    marginBottom: '1em',
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
    <Grid className={classes.topLeftGridItem} item xs={12} md={6} lg={4} xl={3}>
      <Grid className={classes.topLeftGrid} container>
        <Grid className={classes.imageGridItem} item xs={12}>
          <img className={classes.image} src={channel.imageUrl} />
        </Grid>
        <Grid className={classes.livenessGridItem} item xs={12}>
          <Liveness className={classes.liveness} />
        </Grid>
      </Grid>
    </Grid>
    <Grid className={classes.topRightGridItem} item xs={12} md={6} lg={8} xl={9}>
      <Grid className={classes.topRightGrid} container>
        <Grid className={classes.titleBioGridItem} item xs={12}>
          <BroadcasterTextPlate channel={channel} className={classes.textPlate}/>
        </Grid>
        <Grid className={classes.childrenGridItem} item xs={12}>
          <ChannelChildren className={classes.children} childTags={channel.children} />
        </Grid>
      </Grid>
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
          <BottomBlock accentColor={channel.color} titleStart="Previous" titleRest="Broadcasts">
            <PreviousBroadcastsMockup
              className={classes.previousBroadcasts}
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
