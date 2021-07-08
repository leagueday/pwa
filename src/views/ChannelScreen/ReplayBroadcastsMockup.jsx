import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../styling'
import { actions, selectors, constants as storeConstants } from '../../store'
import { IcoPause, IcoPlay, IcoPlus } from '../icons'

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
    color: colors.white,
    [theme.breakpoints.only('xs')]: {
      height: '33%',
      fontSize: '80%',
      paddingLeft: '2vw',
    },
  }),
  episodeTitle: {
    color: colors.white80,
    minWidth: '12vw',
    maxWidth: '70%'
  },
  episodeTitleAndData: {
    display: 'flex',
    // flexDirection: 'row',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
    },
  },
  eventImage: {
    height: '6vw',
    width: '6vw',
  },
  eventImageFormobileView: {
    height: '15vw',
    width: '15vw',
  },
  eventImageAndText: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      background: '#111',
      '&:hover': {
        background: '#222',
      },
      width: '40%',
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
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
  },
  viewAll: {
    cursor: 'pointer',
    color: colors.white,
    textDecoration: 'underline',
    fontWeight: theme.typography.fontWeightMedium,
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
    className={cx(
      window.innerWidth > 945
        ? classes.eventImage
        : classes.eventImageFormobileView,
      classes.clickable
    )}
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
      <div onClick={onClick} className={classes.viewAll}>View All Replays</div>
    </div>
  )
}

const Track = ({
  episodeData,
  backgroundColor,
  counter,
  indexData,
  itemaudioUrl,
  channelColor,
  liveUrl,
  channe,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [canPlay, setcanPlay] = useState(false)

  const dispatch = useDispatch()

  const classes = useStyles({ backgroundColor, canPlay, channelColor })

  const audioUrl = useSelector(selectors.getAudioUrl)

  const isSelectedAudio =
    audioUrl && audioUrl === episodeData.fields.playbackUrl

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
              episodeData.fields.playbackUrl,
              indexData,
              '',
              ''
            )
          )
          dispatch(actions.playAudio())
        }
        ev.stopPropagation()
      }

  return (
    <>
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
              {episodeData.fields.title ? episodeData.fields.title : ''}
            </div>
          </div>
          <div className={classes.episodeDateAndDuration}>
            <div className={classes.episodeDateAndDurationLeftPad}>&nbsp;</div>
            <div className={classes.episodeDate}>
              {episodeData.fields.liveDate
                ? episodeData.fields.liveDate.split('T')[0]
                : ''}
            </div>
          </div>
        </div>
      </div>
    </>
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
              <Track
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

  const { fakeDateLabel, fakeDurationLabel } = episodeData

  const audioUrl = useSelector(selectors.getAudioUrl)

  const isSelectedAudio =
    audioUrl && audioUrl === episodeData.fields.playbackUrl

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
              episodeData.fields.playbackUrl,
              '',
              '',
              episodeData.fields.title
            )
          )
          dispatch(actions.playAudio())
        }
        ev.stopPropagation()
      }

  return (
    <>
      <div className={classes.episodeRow}>
        <div className={classes.episodeControls}>
          <PlayOrPauseIcon
            classes={{
              inner: classes.episodePOP,
              outer: classes.episodePOPCell,
            }}
            onClick={onPopClick}
          />
          {/* <IcoPlus
            classes={{
              inner: classes.episodePlus,
              outer: classes.episodePOPCell,
            }}
          /> */}
        </div>

        <div className={classes.episodeTitleAndData}>
          <div className={classes.episodeNumberAndTitle}>
            <div className={classes.episodeNumber}>
              {counter < 10 ? `0${counter}` : counter}
            </div>
            <div className={classes.episodeTitle}>
              {episodeData.fields.title ? episodeData.fields.title : ''}
            </div>
          </div>
          <div className={classes.episodeDateAndDuration}>
            <div className={classes.episodeDateAndDurationLeftPad}>&nbsp;</div>
            <div className={classes.episodeDate}>
              {episodeData.fields.liveDate
                ? episodeData.fields.liveDate.split('T')[0]
                : ''}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const TracksData = ({
  leaugeNightData,
  channelColor,
  channel,
  sectionName,
}) => {
  const [liveUrl, setLiveUrl] = useState([])
  const classes = useStyles({ channelColor })
  return (
    <div className={classes.tracks}>
      <div className={classes.tracksContent}>
        {leaugeNightData && (
          <div className={classes.replays}>
            <span className={classes.replaySpan}>
              {sectionName.toUpperCase()}
            </span>{' '}
            Replay Preview
          </div>
        )}

        {(counter =>
          leaugeNightData.map((episode, indexdata) => {
            const bgC =
              episodeBackgroundColors[counter % episodeBackgroundColors.length]
            counter = counter + 1
            return (
              <Tracks1
                key={counter}
                indexdata={indexdata}
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

const ReplayBroadcastsMockup = ({ className, channel }) => {
  const classes = useStyles()
  const [RecordedData, setRecordedData] = useState([])
  const [rescentAsscetid, setrescentAsscetId] = useState([])
  const [leagueNightRecorded, setleagueNightRecorded] = useState([])

  useEffect(() => {
    showRecordedData()
    leagueNightshowRecordedData()
  }, [])

  const showRecordedData = () => {
    const baseId = 'appXoertP1WJjd4TQ'

    let urladd = `maxRecords=3&filterByFormula={channelTag}=${JSON.stringify(
      channel['tag']
    )}&sort%5B0%5D%5Bfield%5D=liveDate&sort%5B0%5D%5Bdirection%5D=desc`

    fetch('/.netlify/functions/commingsoon-proxy', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `${baseId}/ChannelLiveData?${urladd}` }),
    })
      .then(response => response.json())
      .then(function (response) {
        if (response.records.length) {
          setRecordedData(response.records)
          seturl(response.records[0].fields.playbackUrl)
        } else {
        }
      })
      .catch(error => {
        console.log('error while data fetching', error.type)
      })
  }

  const leagueNightshowRecordedData = () => {
    const baseId = 'appXoertP1WJjd4TQ'
    let urladd = `maxRecords=3&filterByFormula={channelTag}='lolnight'&sort%5B0%5D%5Bfield%5D=liveDate&sort%5B0%5D%5Bdirection%5D=desc`

    fetch('/.netlify/functions/commingsoon-proxy', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `${baseId}/ChannelLiveData?${urladd}` }),
    })
      .then(response => response.json())
      .then(function (response) {
        if (response.records.length) {
          setleagueNightRecorded(response.records)
        }
      })
      .catch(error => {
        console.log('error while data fetching', error.type)
      })
  }

  const dispatch = useDispatch()
  const makeGotoEvent = event => () => {
    dispatch(actions.pushHistory(`/event/${event}`))
  }

  return (
    <div className={cx(classes.replayBroadcasts, className)}>
      {filterMockupData(channel.tag).map(sectionData => {
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
                <Tracks
                  chanelEvent={sectionData.event}
                  sectionData={RecordedData}
                  channelColor={channel.color}
                  assetid={rescentAsscetid}
                />
              </div>
            )}
          </>
        )
      })}

      {filterMockupData(channel.tag).map(sectionData => {
        return (
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
                <TracksData
                  sectionName={sectionData.event}
                  leaugeNightData={leagueNightRecorded}
                  channelColor={channel.color}
                />
              </div>
            )}
          </>
        )
      })}
    </div>
  )
}

export const mockupGetHasBroadcasts = channel => {
  const data = filterMockupData(channel.tag)
  return data.length > 0
}

export default ReplayBroadcastsMockup