import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import useFacets from '../../api/useFacets'
import {addScrollStyle} from '../util'
import Square from '../Square'
import BottomBlock from './BottomBlock'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import PreviousBroadcastsMockup, {mockupGetHasBroadcasts} from './PreviousBroadcastsMockup'

const useStyles = makeStyles(theme => ({
  aggregatorContent: {
    height: '100%',
    margin: '1em',
  },
  bottomGrid: {
    height: '100%',
    marginTop: '1em',
    maxHeight: '100%',
    minHeight: 0,
    overflow: 'hidden',
  },
  bottomSection: { },
  bottomSectionScroller: ({channelColor}) => addScrollStyle(channelColor)({
    maxHeight: '100%',
    overflow: 'auto',
  }),
  channelColor: ({channelColor}) => ({
    color: channelColor,
  }),
  firstpart: { },
  gridConMain: {
    height: '100%',
    overflow: 'hidden',
  },
  gridConTop: { },
  gridFullCol: {
    height: '100%',
    width: '100%',
  },
  headline: {
    padding: '1em',
    width: '100%',
    overflow: 'hidden',
  },
  headlineGridItem: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
  logoImage: { width: '100%', },
  logoImageContainer: { width: '100%', },
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
    <Square className={classes.logoImageContainer}>
      <img className={classes.logoImage} src={channel?.imageUrl} />
    </Square>
  )
}

const Headline = ({channel, classes, hasBroadcasts}) => {
  return (
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
}

const LogoAndTitle = ({channel, classes, hasBroadcasts}) => {
  return (
    <Grid container>
      <Grid item xs={6} sm={4} lg={3}>
        <Logo channel={channel} classes={classes} />
      </Grid>
      <Grid className={classes.headlineGridItem} item xs={12} sm={8} lg={9}>
        <Headline channel={channel} classes={classes} hasBroadcasts={hasBroadcasts}/>
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

  const hasBroadcasts = mockupGetHasBroadcasts(channel)

  return (
    <div className={classes.aggregatorContent}>
      <Grid className={classes.gridConMain} container>
        <Grid className={classes.gridFullCol} item xs={12}>
          <LogoAndTitle channel={channel} hasBroadcasts={hasBroadcasts} classes={classes} />
          <div className={classes.bottomSectionScroller}>
            <div className={classes.bottomSection}>
              <BottomBlock titleStart={channel.title} titleRest="Podcasts" channelColor={channel.color}>
                <FacetedPodcastTiles data={facet} />
              </BottomBlock>
              { hasBroadcasts && (
                  <BottomBlock titleStart={channel.title} titleRest="Live Event Replays" channelColor={channel.color}>
                    <PreviousBroadcastsMockup
                      className={classes.previousBroadcasts}
                      channel={channel}
                      channelColor={channel.color} />
                  </BottomBlock>
                )
              }
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default AggregatorContent
