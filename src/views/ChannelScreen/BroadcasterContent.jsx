import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import BottomBlock from './BottomBlock'
import BroadcasterTextPlate from './BroadcasterTextPlate'
import ChannelChildren from './ChannelChildren'
import FavoritePodcasts from './FavoritePodcasts'
import Liveness from './Liveness'
import PreviousBroadcasts from './PreviousBroadcasts'

const useStyles = makeStyles({
  bottomBlockItem: { },
  broadcasterContent: {
    paddingLeft: '1em',
    paddingTop: '1em',
  },
  children: {
    backgroundColor: 'green',
    minHeight: 0,
  },
  childrenGridItem: {
    backgroundColor: 'blue',
    maxHeight: '100%',
    minHeight: 0,
  },
  favoritePodcasts: { },
  image: {
    width: '100%',
  },
  imageGridItem: {
    paddingRight: '4em',
  },
  imageTitleGrid: { },
  liveness: { },
  livenessGridItem: {
    paddingRight: '4em',
  },
  previousBroadcasts: { },
  textPlate: {
    width: '100%',
  },
  titleBioGridItem: {
    paddingLeft: '1em',
  },
})

const BroadcasterContent = ({channel}) => {
  const classes = useStyles()

  /*
        <Grid className={classes.livenessGridItem} item xs={12} md={6} lg={4} xl={3}>
          <Liveness className={classes.liveness} />
        </Grid>
   */
  return (
    <div className={classes.broadcasterContent}>
      <Grid className={classes.imageTitleGrid} container>
        <Grid className={classes.imageGridItem} item xs={12} md={6} lg={4} xl={3}>
          <img className={classes.image} src={channel.imageUrl} />
        </Grid>
        <Grid className={classes.titleBioGridItem} item xs={12} md={6} lg={8} xl={9}>
          <BroadcasterTextPlate channel={channel} className={classes.textPlate}/>
        </Grid>
        <Grid className={classes.childrenGridItem} item xs={12} md={6} lg={8} xl={9}>
          <ChannelChildren className={classes.children} childTags={channel.children} />
        </Grid>
        <Grid className={classes.bottomBlockItem} item xs={12}>
          <BottomBlock title="Previous Broadcasts">
            <PreviousBroadcasts className={classes.previousBroadcasts} channel={channel} />
          </BottomBlock>
        </Grid>
        <Grid className={classes.bottomBlockItem} item xs={12}>
          <BottomBlock title="Favorite Podcasts">
            <FavoritePodcasts className={classes.favoritePodcasts} channel={channel} />
          </BottomBlock>
        </Grid>
      </Grid>
    </div>
  )
}

export default BroadcasterContent
