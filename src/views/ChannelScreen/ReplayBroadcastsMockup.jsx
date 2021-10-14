import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AudioCard from './AudioCard'
import cx from 'classnames'
import LikeButton from '../LikeButton'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../styling'
import { actions, selectors, constants as storeConstants } from '../../store'
import { IcoPause, IcoPlay, IcoPlus } from '../icons'
import { UserStateContext } from '../../store/stateProviders/userState'

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  replays: {
    fontWeight: theme.typography.fontWeightBold,
  },
  replaySpan: {
    color: colors.orange,
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
    position: 'absolute',
    right: '15%',
    color: colors.white80,
    flex: 1,
    fontFamily: theme.typography.family.secondary,
    padding: '0 0.5em',
    display: 'inherit',
    [theme.breakpoints.down('md')]: {
      display: 'none',
      padding: '0 2vw',
    },
  },
  episodeDateAndDuration: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    width: '100%',
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
    cursor: 'pointer',
    color: theme.palette.text.primary,
    '&:hover': {
      color: channelColor,
    },
    height: '10%',
    marginRight: '2vw',
    [theme.breakpoints.only('xs')]: {
      height: '4vw',
      width: '4vw',
      marginRight: '1vw',
    },
  }),
  episodePOPCell: {
    height: '60%',
  },
  episodeRow: ({ backgroundColor }) => ({
    position: 'relative',
    backgroundColor: '#111',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '1em',
    userSelect: 'none',
    height: '3rem',
    marginBottom: '.5%',
    width: '100%',
    color: colors.white,
    [theme.breakpoints.only('xs')]: {
      height: '33%',
      fontSize: '80%',
      paddingLeft: '2vw',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '5%',
    },
  }),
  episodeTitle: {
    color: colors.white80,
    minWidth: '12vw',
    maxWidth: '100%',
  },
  episodeTitleAndData: {
    display: 'flex',
    width: '100%',
    height: '100%',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
    },
  },
  eventImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  eventImageFormobileView: {
    height: '15vw',
    width: '15vw',
  },
  eventImageAndText: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      background: '#111',
      '&:hover': {
        background: '#222',
      },
    },
    width: '15rem',
    height: '18rem',
    border: '.5px solid white',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
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
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '35px',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      marginLeft: '15px',
      height: '25rem',
    },
  },
  creatorImg: {
    zIndex: 10,
    cursor: 'pointer',
    position: 'absolute',
    borderRadius: '50%',
    width: '5rem',
    height: '5rem',
    objectFit: 'cover',
    right: -15,
    top: -15,
    border: '2px solid white',
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '4rem',
      height: '4rem',
    },
  },
  viewAll: {
    cursor: 'pointer',
    color: colors.white,
    textDecoration: 'underline',
    fontWeight: theme.typography.fontWeightMedium,
  },
  sectionTitle: ({ channelColor }) => ({
    display: 'flex',
    fontSize: '125%',
    overflowX: 'hidden',
    fontWeight: theme.typography.weight.bold,
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
    margin: 0,
    padding: 0,
    textAlign: 'center',
    fontSize: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '80%',
    },
  },
  tracks: {
    display: 'flex',
    width: '100%',
  },
  tracksContent: {
    margin: '.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    width: '75%',
    padding: '1em 0',
    [theme.breakpoints.only('xs')]: {
      padding: '2vw 0',
      width: '98%',
    },
    [theme.breakpoints.only('sm')]: {
      width: '100%',
    },
  },
  thumbsup: {
    cursor: 'pointer',
    color: colors.blue,
  },
  likeBtn: {
    background: 'transparent',
    outline: 'none',
    border: 'none',
  },
  like: {
    width: '6%',
    display: 'flex',
    alignItems: 'center',
  },
  trackContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}))

const mockupData = [
  {
    event: 'lcs',
    imageUrl: '/img/restyle_demo/lcs.png',
    name: 'LEAGUE CHAMPIONSHIP SERIES',
    tags: ['riot', 'lol', 'lolnight'],
    variety: '2021 Summer Split',
  },
  {
    event: 'leaguenight',
    imageUrl: '/img/restyle_demo/LeagueNight2.png',
    name: 'LeagueNight',
    tags: ['riot', 'lol', 'lolnight'],
    variety: 'with Kelsey Moser',
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
        <div className={classes.textEllipsisOverflow}>
          <span style={{ color: colors.magenta }}>LCS</span> Replays
        </div>
      </div>
      <div onClick={onClick} className={classes.viewAll}>
        View All Replays
      </div>
    </div>
  )
}

export const Tracks = ({
  sectionData,
  channelColor,
  assetid,
  leaugeNightData,
  channel,
  chanelEvent,
}) => {
  const [liveUrl, setLiveUrl] = useState([])
  const classes = useStyles({ channelColor })

  return (
    <div className={classes.tracks}>
      <div className={classes.tracksContent}>
        {sectionData && (
          <div className={classes.replays}>
            <span className={classes.replaySpan}>
              {chanelEvent.toUpperCase()}
            </span>{' '}
            Replay Preview
          </div>
        )}
        {(counter =>
          sectionData.map((episode, key) => {
            const bgC =
              episodeBackgroundColors[counter % episodeBackgroundColors.length]
            counter = counter + 1
            return (
              <Tracks1
                key={counter}
                indexData={key}
                episodeData={episode}
                backgroundColor={bgC}
                counter={counter}
                channelColor={channelColor}
                liveUrl={liveUrl}
                leaugeNightData={leaugeNightData}
                channel={channel}
              />
            )
          }))(0)}
      </div>
    </div>
  )
}

export const Tracks1 = ({
  episodeData,
  backgroundColor,
  counter,
  indexdata,
  channelColor,
}) => {
  const classes = useStyles({ backgroundColor, channelColor })
  const dispatch = useDispatch()
  const audioUrl = useSelector(selectors.getAudioUrl)
  const { currentUserId } = useContext(UserStateContext)

  const isSelectedAudio =
    audioUrl && audioUrl === episodeData?.fields?.playbackUrl

  const audioMode = useSelector(selectors.getAudioMode)

  const isPlayings =
    isSelectedAudio && audioMode === storeConstants.AUDIO_MODE_PLAY

  const PlayOrPauseIcon = isPlayings ? IcoPause : IcoPlay

  const onPopClick = isPlayings
    ? ev => {
        dispatch(actions.pauseAudio())
        ev.stopPropagation()
      }
    : ev => {
        if (isSelectedAudio) dispatch(actions.playAudio())
        else {
          dispatch(
            actions.selectAudio(
              '',
              '',
              '',
              episodeData?.fields?.playbackUrl,
              '',
              '',
              episodeData?.fields?.title
            )
          )
          dispatch(actions.playAudio())
        }
        ev.stopPropagation()
      }

  return (
    <div className={classes.trackContainer}>
      <LikeButton
        userId={currentUserId}
        audio={episodeData}
        channelTag={episodeData?.fields?.channelTag}
      />
      <div className={classes.episodeRow}>
        <div className={classes.episodeControls}>
          <PlayOrPauseIcon
            classes={{
              inner: classes.episodePOP,
              outer: classes.episodePOPCell,
            }}
            onClick={onPopClick}
          />
        </div>

        <div className={classes.episodeTitleAndData}>
          <div className={classes.episodeNumberAndTitle}>
            <div className={classes.episodeNumber}>
              {counter < 10 ? `0${counter}` : counter}
            </div>
            <div className={classes.episodeTitle}>
              {episodeData?.fields?.title ? episodeData?.fields?.title : ''}
            </div>
          </div>
          <div className={classes.episodeDateAndDuration}>
            <div className={classes.episodeDateAndDurationLeftPad}>&nbsp;</div>
            <div className={classes.episodeDate}>
              {episodeData?.fields?.uploadDate
                ? episodeData?.fields?.uploadDate.split('T')[0]
                : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ReplayBroadcastsMockup = ({ className, channel, leagueNight }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const makeGotoEvent = event => () => {
    dispatch(actions.pushHistory(`/event/${event}`))
  }

  return (
    <div className={cx(classes.replayBroadcasts, className)}>
      <div id="shadow-container"></div>
      {!leagueNight &&
        filterMockupData(channel.tag).map(sectionData => {
          return (
            <>
              {sectionData.event == 'lcs' && (
                <div
                  key={sectionData.name + sectionData.event}
                  className={classes.replayBroadcast}
                >
                  <div
                    className={classes.eventImageAndText}
                    onClick={makeGotoEvent(sectionData.event)}
                  >
                    <img
                      className={classes.creatorImg}
                      src="https://leagueday-prod-images.s3.amazonaws.com/uploads/LCS%20team.png"
                      alt="LCS replays"
                      onClick={() =>
                        dispatch(
                          actions.pushHistory(
                            '/profile/cbfba6e1-54eb-43aa-80a9-cb1bd4c04948'
                          )
                        )
                      }
                    />
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
                </div>
              )}
            </>
          )
        })}
      {leagueNight &&
        filterMockupData(channel.tag).map(sectionData => (
          <>
            {sectionData.event == 'leaguenight' && (
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
              </div>
            )}
          </>
        ))}
    </div>
  )
}

export const mockupGetHasBroadcasts = channel => {
  const data = filterMockupData(channel.tag)
  return data.length > 0
}

export default ReplayBroadcastsMockup
