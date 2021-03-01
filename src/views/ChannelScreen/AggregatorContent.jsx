import React from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import useFacets from '../../api/useFacets'
import BottomBlock from './BottomBlock'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import PreviousBroadcastsMockup from './PreviousBroadcastsMockup'

const useStyles = makeStyles(theme => ({
  aggregatorContent: {
    marginLeft: '1em',
  },
  bottomGrid: {
    marginTop: '1em',
  },
  firstpart: { },
  gridConMain: { },
  gridConTop: { },
  headline: {
    margin: '1em',
  },
  headlineGridItem: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headlineTitle: {
    fontSize: '150%',
    fontWeight: theme.typography.weight.bold,
    userSelect: 'none',
  },
  headlineTitleHighlighted: ({channelColor}) => ({
    color: channelColor,
  }),
  headlineTitleRow: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  headlineTypename: {
    textTransform: 'uppercase',
    userSelect: 'none',
  },
  logoImage: { },
  logoImageContainer: { },
  previousBroadcasts: {
    marginTop: '1.5em',
  },
  // rest: { },
  // tile: {
  // },
  // tileItem: {
  //   paddingRight: '1vw',
  //   ['&:last-child']: {
  //     paddingRight: 0,
  //   },
  // },
}))

const Logo = ({channel, classes}) => {
  return (
    <div className={classes.logoImageContainer}>
      <img className={classes.logoImage} src={channel?.imageUrl} />
    </div>
  )
}

const Headline = ({channel, classes}) => {
  return (
    <div className={classes.headline}>
      <div className={classes.headlineTypename}>
        Podcast Aggregator
      </div>
      <div className={classes.headlineTitleRow}>
        <span className={classes.headlineTitle}>
          <span className={classes.headlineTitleHighlighted}>
            {channel?.title}
          </span>
          &nbsp;Podcasts
        </span>
      </div>
    </div>
  )
}

const LogoAndTitle = ({channel, classes}) => {
  return (
    <Grid container>
      <Grid item sm={12} sm={6} md={4}>
        <Logo channel={channel} classes={classes} />
      </Grid>
      <Grid className={classes.headlineGridItem} item sm={12} sm={6} md={8}>
        <Headline channel={channel} classes={classes} />
      </Grid>
    </Grid>
  )
}

// const FirstPart = ({channel, classes, facetPart, nextColor}) => {
//   return (
//     <div className={classes.firstpart}>
//       <Headline classes={classes} channel={channel} />
//       <Grid container>
//         {
//           facetPart.map(
//             podcast => (
//               <Grid className={classes.tileItem} key={podcast.id} item xs={12} sm={6} md={6} lg={3} xl={2}>
//                 <div className={classes.tile}>
//                   <PodcastTile podcast={podcast} textColor={nextColor()} />
//                 </div>
//               </Grid>
//             )
//           )
//         }
//       </Grid>
//     </div>
//   )
// }
//
// const Rest = ({channel, classes, facetPart, nextColor}) => {
//   return (
//     <div className={classes.rest}>
//       <Grid container>
//         {
//           facetPart.map(
//             podcast => (
//               <Grid className={classes.tileItem} key={podcast.id} item xs={12} sm={6} md={4} lg={2}>
//                 <div className={classes.tile}>
//                   <PodcastTile podcast={podcast} textColor={nextColor()} />
//                 </div>
//               </Grid>
//             )
//           )
//         }
//       </Grid>
//     </div>
//   )
// }

const AggregatorContent = ({channel}) => {
  // const theme = useTheme()
  // const lgUp = useMediaQuery(theme.breakpoints.up('lg'))
  //
  // const firstPartNumCells = lgUp ? 4 : 2

  const classes = useStyles({channelColor: channel.color})

  const facets = useFacets(channel.tag)
  const firstFacet = facets ? facets.values().next()?.value : null
  // console.log(JSON.stringify(firstFacet, null, 2))
  const facet = new Map([
      [
        '',
        Array.isArray(firstFacet) ? firstFacet : []
      ]
    ])

  // const firstPartFacet = facet.slice(0, firstPartNumCells)
  // const restFacet = facet.slice(firstPartNumCells)

  // const nextColor = (
  //   (colorList, offset) => () => {
  //     const result = colorList[offset]
  //     offset = offset + 1 === colorList.length ? 0 : offset + 1
  //     return result
  //   }
  // )([colors.cyan, colors.blue, colors.violet, colors.magenta, colors.orange, colors.yellow], 4)

  /*
         <Grid item xs={12}>
          <Grid className={classes.gridConTop} container>
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Logo classes={classes} channel={channel} />
            </Grid>
            <Grid item xs={12} md={8} lg={9} xl={10}>
              <FirstPart classes={classes} channel={channel} facetPart={firstPartFacet} nextColor={nextColor} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Rest classes={classes} channel={channel} facetPart={restFacet} nextColor={nextColor} />
        </Grid>
   */

  return (
    <div className={classes.aggregatorContent}>
      <Grid className={classes.gridConMain} container>
        <Grid item xs={12}>
          <LogoAndTitle channel={channel} classes={classes} />
        </Grid>
        <Grid className={classes.bottomGrid} item xs={12}>
          <BottomBlock titleStart="League of Legends" titleRest="Podcasts" channelColor={channel.color}>
            <FacetedPodcastTiles data={facet} />
          </BottomBlock>
          <PreviousBroadcastsMockup
            className={classes.previousBroadcasts}
            channel={channel}
            channelColor={channel.color} />
        </Grid>
      </Grid>
    </div>
  )
}

export default AggregatorContent
