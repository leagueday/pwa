import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import { IcoPause, IcoPlay, IcoPlus } from '../icons'
import Liveness from './Liveness'

const useStyles = makeStyles(theme => ({
  episodeControls: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  episodeDate: {
    color: colors.white80,
    fontFamily: theme.typography.family.secondary,
    padding: '0 0.5em',
    width: '6vw',
  },
  episodeDuration: {
    color: colors.white80,
    fontFamily: theme.typography.family.secondary,
    padding: '0 0.5em',
    width: '6vw',
  },
  episodeNumber: {
    color: colors.white30,
    padding: '0 1em',
    fontFamily: theme.typography.family.secondary,
  },
  episodePlus: ({channelColor}) => ({
    color: theme.palette.text.primary,
    cursor: 'pointer',
    '&:hover': {
      color: channelColor,
    },
  }),
  episodePOP: ({canPlay, channelColor}) => ({
    color: canPlay ? theme.palette.text.primary : colors.lightGray,
    cursor: canPlay ? 'pointer' : 'default',
    '&:hover': {
      color: canPlay ? channelColor : colors.lightGray,
    },
  }),
  episodePOPCell: {
    height: '60%',
  },
  episodeRow: ({backgroundColor}) => ({
    backgroundColor,
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
  }),
  episodeTitle: {
    color: colors.white80,
    flex: 1,
    width: '12vw',
  },
  liveBroadcasts: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  liveness: {
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
  },
  sectionImage: {
    height: '6vw',
    width: '6vw',
  },
  sectionLeftRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  sectionNameLive: {
    color: colors.lime,
    fontWeight: theme.typography.weight.bold,
  },
  sectionRightCol: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1em',
    marginTop: '3em',
  },
  sectionText: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '0.5em',
  },
  sectionTitle: ({channelColor}) => ({
    color: channelColor,
    fontSize: '125%',
    textTransform: 'uppercase',
  }),
  sectionVariety: {
    fontSize: '125%',
    fontWeight: theme.typography.weight.bold,
  },
}))

const mockupData = [
  {
    episodes: [ ],
    imageUrl: '/img/restyle_demo/lcs_versus.png',
    name: 'League of Legends',
    tags: ['riot', 'lol'],
    variety: 'Event Name',
  },
]

const filterMockupData = tag => mockupData.filter(
  ({tags}) => tags.find(thisTag => thisTag === tag)
)

const transparent = 'rgba(0,0,0,1)'
const episodeBackgroundColors = ['#070709', transparent, '#0E0E11', transparent]

const Episode = ({episodeData, backgroundColor, counter, channelColor}) => {
  const {
    title,
    isPlaying,
    canPlay,
    fakeDateLabel,
    fakeDurationLabel
  } = episodeData

  const classes = useStyles({backgroundColor, canPlay, channelColor})

  const PlayOrPauseIcon = isPlaying ? IcoPause : IcoPlay

  return (
    <div className={classes.episodeRow}>
      <div className={classes.episodeControls}>
        <PlayOrPauseIcon classes={{inner: classes.episodePOP, outer: classes.episodePOPCell}}/>
        <IcoPlus classes={{inner: classes.episodePlus, outer: classes.episodePOPCell}}/>
      </div>
      <div className={classes.episodeNumber}>
        {counter < 10 ? `0${counter}` : counter}
      </div>
      <div className={classes.episodeTitle}>
        {title}
      </div>
      <div className={classes.episodeDate}>
        {fakeDateLabel}
      </div>
      <div className={classes.episodeDuration}>
        {fakeDurationLabel}
      </div>
    </div>
  )
}

const SectionLeft = ({sectionData, channelColor}) => {
  const {
    imageUrl,
    name,
    variety,
  } = sectionData

  const classes = useStyles({channelColor})

  return (
    <div className={classes.sectionLeftRow}>
      <img className={classes.sectionImage} src={imageUrl} />
      <div className={classes.sectionText}>
        <div className={classes.sectionTitle}>
          {name}&nbsp;<span className={classes.sectionNameLive}>Live</span>
        </div>
        <div className={classes.sectionVariety}>
          {variety}
        </div>
      </div>
    </div>
  )
}

const SectionRight = ({sectionData, channelColor}) => {
  const {episodes} = sectionData

  const classes = useStyles({channelColor})

  return (
    <div className={classes.sectionRightCol}>
      {
        (
          counter =>
            episodes.map(episode => {
              const bgC = episodeBackgroundColors[counter % episodeBackgroundColors.length]
              counter = counter + 1
              return (
                <Episode key={counter}
                         episodeData={episode}
                         backgroundColor={bgC}
                         counter={counter}
                         channelColor={channelColor}
                />
              )
            })
        )(0)
      }
    </div>
  )
}

const LiveBroadcastsMockup = ({className, channel}) => {
  const classes = useStyles()

  // <SectionRight sectionData={sectionData} channelColor={channel.color} />
  return (
    <div className={cx(classes.liveBroadcasts, className)}>
      {
        filterMockupData(channel.tag).map(
          sectionData => (
            <div key={sectionData.name} className={classes.section}>
              <SectionLeft sectionData={sectionData} channelColor={channel.color} />
              <Liveness className={classes.liveness} />
            </div>
          )
        )
      }
    </div>
  )
}

export const mockupGetHasBroadcasts = channel => {
  const data = filterMockupData(channel.tag)
  return data.length > 0
}

export default LiveBroadcastsMockup
