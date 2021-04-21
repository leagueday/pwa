import React from 'react'
import cx from 'classnames'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'

import {colors} from '../../styling'
import ComingSoon from '../ComingSoon'
import ToggleImageButton from '../ToggleImageButton'

const useStyles = makeStyles(theme => ({
  comingSoon: {
    margin: '0 2vw 2vw 2vw',
  },
  eventImage: {
    height: '6vw',
    width: '6vw',
  },
  eventImageAndText: {
    display: 'flex',
    width: '100%',
  },
  eventTextplate: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '0.5em',
    minWidth: 0,
    [theme.breakpoints.only('xs')]: {
      marginLeft: '2vw',
    },
  },
  liveBroadcast: {
    display: 'flex',
    flexDirection: 'column',
  },
  liveBroadcasts: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  liveness: {
    display: 'flex',
    width: '100%',
  },
  livenessContent: {
    backgroundColor: '#070709',
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    padding: '1em 0 1em 1em',
    [theme.breakpoints.only('xs')]: {
      padding: '2vw 0 2vw 2vw',
    },
  },
  livenessLeftPad: {
    flex: 0.5,
  },
  sectionTitle: ({ channelColor }) => ({
    color: channelColor,
    display: 'flex',
    fontSize: '125%',
    overflowX: 'hidden',
    textTransform: 'uppercase',
    [theme.breakpoints.only('xs')]: {
      fontSize: '85%',
    },
  }),
  sectionVariety: {
    display: 'flex',
    fontSize: '125%',
    overflowX: 'hidden',
    fontWeight: theme.typography.weight.bold,
    [theme.breakpoints.only('xs')]: {
      fontSize: '85%',
    },
  },
  textEllipsisOverflow: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  track: {
    display: 'flex',
  },
  trackText: {
    color: colors.white80,
    flex: 1,
    minWidth: '12vw',
    paddingLeft: '2vw',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))

const mockupData = [
  {
    episodes: [],
    imageUrl: '/img/restyle_demo/lcs_versus.png',
    name: 'League of Legends',
    tags: ['riot', 'lol'],
    variety: 'LCS Summer Split',
  },
]

const filterMockupData = tag =>
  mockupData.filter(({ tags }) => tags.find(thisTag => thisTag === tag))

const transparent = 'rgba(0,0,0,1)'

const buttonShadowColor = Color(colors.brandBlack).darken(0.5).string()

const EventImage = ({ classes, imageUrl }) => (
  <img className={cx(classes.eventImage)} src={imageUrl} />
)

const EventTextplate = ({ channelColor, sectionData }) => {
  const { name, variety } = sectionData

  const classes = useStyles({ channelColor })

  return (
    <div className={classes.eventTextplate}>
      <div className={cx(classes.sectionTitle)}>
        <div className={classes.textEllipsisOverflow}>{name}</div>
      </div>
      <div className={cx(classes.sectionVariety)}>
        <div className={classes.textEllipsisOverflow}>{variety}</div>
      </div>
    </div>
  )
}

const Track = ({ classes }) => {
  const [isPlaying, setIsPlaying] = React.useState(false)

  const onClick = isPlaying
    ? () => setIsPlaying(false)
    : () => setIsPlaying(true)

  return (
    <div className={classes.track}>
      <ToggleImageButton
        className={classes.logoButton}
        size="8vw"
        on={isPlaying}
        onClick={onClick}
        onImage="/img/logo_live_pause.png"
        offImage="/img/logo_live_play.png"
        shadowColor={buttonShadowColor}
      />
      <div className={classes.trackText}>Live</div>
    </div>
  )
}

const LiveBroadcastsMockup = ({ className, channel }) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.liveBroadcasts, className)}>
      <ComingSoon className={classes.comingSoon} />
      {filterMockupData(channel.tag).map(sectionData => (
        <div key={sectionData.name} className={classes.liveBroadcast}>
          <div className={classes.eventImageAndText}>
            <EventImage classes={classes} imageUrl={sectionData.imageUrl} />
            <EventTextplate
              channelColor={channel.color}
              sectionData={sectionData}
            />
          </div>
          <div className={classes.liveness}>
            <div className={classes.livenessLeftPad}>&nbsp;</div>
            <div className={classes.livenessContent}>
              <Track classes={classes} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const mockupGetHasBroadcasts = channel => {
  const data = filterMockupData(channel.tag)
  return data.length > 0
}

export default LiveBroadcastsMockup
