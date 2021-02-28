import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import useFacets from '../../api/useFacets'
import { addScrollStyle } from '../util'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import BottomBlock from './BottomBlock'
import BroadcasterTextPlate from './BroadcasterTextPlate'
import ChannelChildren from './ChannelChildren'
import FavoritePodcasts from './FavoritePodcasts'
import Liveness from './Liveness'
import PreviousBroadcasts from './PreviousBroadcasts'

const useStyles = makeStyles({
  bottomBlockItem: { },
  bottomGrid: ({channelColor}) => addScrollStyle(channelColor)({
    flex: 1,
    height: '100%',
    overflow: 'auto',
  }),
  broadcasterContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: '1em',
    paddingTop: '1em',
  },
  children: {
    marginBottom: '1em',
  },
  childrenGridItem: {
    maxHeight: '100%',
    minHeight: 0,
  },
  favoritePodcasts: {
    marginBottom: '1em',},
  image: {
    height: '100%',
    width: '100%',
  },
  imageGridItem: {
    paddingRight: '4em',
  },
  imageTitleGrid: {
    flex: 0,
  },
  liveness: {
    marginBottom: '1em',
  },
  livenessGridItem: {
    paddingRight: '4em',
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
})

const BroadcasterContent = ({channel}) => {
  const classes = useStyles({channelColor: channel.color})

  const facetedPodcasts = useFacets(channel.tag)

  return (
    <div className={classes.broadcasterContent}>
      <Grid className={classes.imageTitleGrid} container>
        <Grid className={classes.imageGridItem} item xs={12} md={6} lg={4} xl={3}>
          <img className={classes.image} src={channel.imageUrl} />
        </Grid>
        <Grid className={classes.titleBioGridItem} item xs={12} md={6} lg={8} xl={9}>
          <BroadcasterTextPlate channel={channel} className={classes.textPlate}/>
        </Grid>
        <Grid className={classes.livenessGridItem} item xs={12} md={6} lg={4} xl={3}>
          <Liveness className={classes.liveness} />
        </Grid>
        <Grid className={classes.childrenGridItem} item xs={12} md={6} lg={8} xl={9}>
          <ChannelChildren className={classes.children} childTags={channel.children} />
        </Grid>
      </Grid>
      <Grid className={classes.bottomGrid} container>
        <Grid className={classes.bottomBlockItem} item xs={12}>
          <BottomBlock title="Previous Broadcasts" channelColor={channel.color}>
            <PreviousBroadcasts className={classes.previousBroadcasts} channel={channel} channelColor={channel.color} />
          </BottomBlock>
        </Grid>
        <Grid className={classes.bottomBlockItem} item xs={12}>
          <BottomBlock title="Favorite Podcasts" channelColor={channel.color}>
            <FacetedPodcastTiles data={facetedPodcasts} />
          </BottomBlock>
        </Grid>
      </Grid>
    </div>
  )
}

export default BroadcasterContent
