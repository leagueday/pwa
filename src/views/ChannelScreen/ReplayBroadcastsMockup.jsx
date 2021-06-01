import React from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import { actions } from '../../store'
import { colors } from '../../styling'
import { IcoPause, IcoPlay, IcoPlus } from '../icons'
import ComingSoon from '../ComingSoon'
import ReplayLiveBroadCast from './ReplayLiveBroadCast'

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  comingSoon: {
    margin: '0 2vw 2vw 2vw',
  },
  episodeControls: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  episodeDate: {
    color: colors.white80,
    flex: 1,
    fontFamily: theme.typography.family.secondary,
    padding: '0 0.5em',
    [theme.breakpoints.only('xs')]: {
      padding: '0 2vw',
    },
  },
  episodeDateAndDuration: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    width: '100%',
  },
  episodeDateAndDurationLeftPad: {
    flex: 1,
  },
  episodeDuration: {
    color: colors.white80,
    flex: 1,
    fontFamily: theme.typography.family.secondary,
    padding: '0 0.5em',
    [theme.breakpoints.only('xs')]: {
      padding: '0 2vw',
    },
  },
  episodeNumberAndTitle: {
    display: 'flex',
    flexDirection: 'row',
  },
  episodeNumber: {
    color: colors.white30,
    padding: '0 1em',
    fontFamily: theme.typography.family.secondary,
    [theme.breakpoints.only('xs')]: {
      padding: '0 2vw',
    },
  },
  episodePlus: ({ canPlay, channelColor }) => ({
    color: theme.palette.text.primary,
    cursor: 'pointer',
    '&:hover': {
      color: channelColor,
    },
    [theme.breakpoints.only('xs')]: {
      height: '5vw',
      width: '5vw',
    },
  }),
  episodePOP: ({ canPlay, channelColor }) => ({
    color: canPlay ? theme.palette.text.primary : colors.lightGray,
    cursor: canPlay ? 'pointer' : 'default',
    '&:hover': {
      color: canPlay ? channelColor : colors.lightGray,
    },
    [theme.breakpoints.only('xs')]: {
      height: '5vw',
      width: '5vw',
      marginRight: '2vw',
    },
  }),
  episodePOPCell: {
    height: '60%',
  },
  episodeRow: ({ backgroundColor }) => ({
    backgroundColor,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '1em',
    userSelect: 'none',
    [theme.breakpoints.only('xs')]: {
      fontSize: '80%',
      paddingLeft: '2vw',
    },
  }),
  episodeTitle: {
    color: colors.white80,
    flex: 1,
    minWidth: '12vw',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  episodeTitleAndData: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
    },
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
  replayBroadcast: {
    // ok
    display: 'flex',
    flexDirection: 'column',
  },
  replayBroadcasts: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
  tracks: {
    display: 'flex',
    width: '100%',
  },
  tracksContent: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    padding: '1em 0',
    [theme.breakpoints.only('xs')]: {
      padding: '2vw 0',
    },
  },
  tracksLeftPad: {
    flex: 0.5,
  },
}))

// Ikea Furniture Cardboard Stereo
const mockupData = [
  {
    episodes: [
      {
        title: 'Title of Episode X',
        isPlaying: false,
        canPlay: true,
        fakeDateLabel: '3/2/21',
        fakeDurationLabel: '41:50',
      },
      {
        title: 'Title of Episode Y',
        isPlaying: true,
        canPlay: true,
        fakeDateLabel: '2/28/21',
        fakeDurationLabel: '43:22',
      },
      {
        title: 'Title of Episode Z',
        isPlaying: false,
        canPlay: false,
        fakeDateLabel: '1/22/21',
        fakeDurationLabel: '35:38',
      },
    ],
    event: 'lcs',
    imageUrl: '/img/restyle_demo/lcs.png',
    name: 'League of Legends',
    tags: ['riot', 'lol'],
    variety: 'League Championship Series',
  },
  {
    episodes: [
      {
        title: 'Title of Episode X',
        isPlaying: false,
        canPlay: true,
        fakeDateLabel: '3/2/21',
        fakeDurationLabel: '41:50',
      },
      {
        title: 'Title of Episode Y',
        isPlaying: true,
        canPlay: true,
        fakeDateLabel: '2/28/21',
        fakeDurationLabel: '43:22',
      },
      {
        title: 'Title of Episode Z',
        isPlaying: false,
        canPlay: false,
        fakeDateLabel: '1/22/21',
        fakeDurationLabel: '35:38',
      },
    ],
    event: 'lcs-lock',
    imageUrl: '/img/restyle_demo/lcs_lockin.png',
    name: 'League of Legends',
    tags: ['riot', 'lol'],
    variety: 'LCS Lock In',
  },
]

const filterMockupData = tag =>
  mockupData.filter(({ tags }) => tags.find(thisTag => thisTag === tag))

const transparent = 'rgba(0,0,0,1)'
const episodeBackgroundColors = ['#070709', transparent, '#0E0E11', transparent]

const EventImage = ({ classes, imageUrl, onClick }) => (
  <img
    className={cx(classes.eventImage, classes.clickable)}
    onClick={onClick}
    src={imageUrl}
  />
)

const EventTextplate = ({ channelColor, onClick, sectionData }) => {
  const { name, variety } = sectionData

  const classes = useStyles({ channelColor })

  return (
    <div className={classes.eventTextplate}>
      <div
        className={cx(classes.sectionTitle, classes.clickable)}
        onClick={onClick}
      >
        <div className={classes.textEllipsisOverflow}>{name}</div>
      </div>
      <div
        className={cx(classes.sectionVariety, classes.clickable)}
        onClick={onClick}
      >
        <div className={classes.textEllipsisOverflow}>{variety}</div>
      </div>
    </div>
  )
}

const Track = ({ episodeData, backgroundColor, counter, channelColor }) => {
  const {
    title,
    isPlaying,
    canPlay,
    fakeDateLabel,
    fakeDurationLabel,
  } = episodeData

  const classes = useStyles({ backgroundColor, canPlay, channelColor })

  const PlayOrPauseIcon = isPlaying ? IcoPause : IcoPlay

  return (
    <div className={classes.episodeRow}>
      <div className={classes.episodeControls}>
        <PlayOrPauseIcon
          classes={{ inner: classes.episodePOP, outer: classes.episodePOPCell }}
        />
        <IcoPlus
          classes={{
            inner: classes.episodePlus,
            outer: classes.episodePOPCell,
          }}
        />
      </div>
      <div className={classes.episodeTitleAndData}>
        <div className={classes.episodeNumberAndTitle}>
          <div className={classes.episodeNumber}>
            {counter < 10 ? `0${counter}` : counter}
          </div>
          <div className={classes.episodeTitle}>{title}</div>
        </div>
        <div className={classes.episodeDateAndDuration}>
          <div className={classes.episodeDateAndDurationLeftPad}>&nbsp;</div>
          <div className={classes.episodeDate}>{fakeDateLabel}</div>
          <div className={classes.episodeDuration}>{fakeDurationLabel}</div>
        </div>
      </div>
    </div>
  )
}

const Tracks = ({ sectionData, channelColor }) => {
  const { episodes } = sectionData

  const classes = useStyles({ channelColor })

  return (
    <div className={classes.tracks}>
      <div className={classes.tracksLeftPad}>&nbsp;</div>
      <div className={classes.tracksContent}>
        {(counter =>
          episodes.map(episode => {
            const bgC =
              episodeBackgroundColors[counter % episodeBackgroundColors.length]
            counter = counter + 1
            return (
              <Track
                key={counter}
                episodeData={episode}
                backgroundColor={bgC}
                counter={counter}
                channelColor={channelColor}
              />
            )
          }))(0)}
      </div>
    </div>
  )
}

const ReplayBroadcastsMockup = ({ className, channel }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const makeGotoEvent = event => () =>
    dispatch(actions.pushHistory(`/event/${event}`))

  return (
    <div className={cx(classes.replayBroadcasts, className)}>
      
          <ReplayLiveBroadCast   
            className={classes.replayBroadcasts}
            channel={channel}
            channelColor={channel.color}/>

      {filterMockupData(channel.tag).map(sectionData => (
        <div
          key={sectionData.name + sectionData.event}
          className={classes.replayBroadcast}
        >
          <div className={classes.eventImageAndText}>
            <EventImage
              classes={classes}
              imageUrl={sectionData.imageUrl}
              onClick={makeGotoEvent(sectionData.event)}
            />
            <EventTextplate
              channelColor={channel.color}
              onClick={makeGotoEvent(sectionData.event)}
              sectionData={sectionData}
            />
          </div>
          <Tracks sectionData={sectionData} channelColor={channel.color} />
        </div>
      ))}
    </div>
  )
}

export const mockupGetHasBroadcasts = channel => {
  const data = filterMockupData(channel.tag)
  return data.length > 0
}

export default ReplayBroadcastsMockup
