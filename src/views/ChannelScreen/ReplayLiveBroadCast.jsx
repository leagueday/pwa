import React from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import useChannels from '../../api/useChannels'
import { actions } from '../../store'
import { colors } from '../../styling'
import { IcoPause, IcoPlay, IcoPlus } from '../icons'
import ComingSoon from '../ComingSoon'
import ReactHlsPlayer from 'react-hls-player';

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

const EventImage = ({ classes, imageUrl, onClick }) => {
  return (
    <React.Fragment>
  {imageUrl&&imageUrl?.map((image,i)=>(
   <img
   className={cx(classes.eventImage, classes.clickable)}
   onClick={onClick}
   src={image.fields&&image.fields.thumbnailUrl}
 />
  ))}
    </React.Fragment>
  )
}


const EventTextplate = ({ channelColor, onClick, sectionData }) => {
  const classes = useStyles({ channelColor })
  return (
    <React.Fragment>
      {sectionData.length&&sectionData?.map((channel,i)=>(
        <div className={classes.eventTextplate}>
      
        <div
          className={cx(classes.sectionTitle, classes.clickable)}
          onClick={onClick}
        >
          <div className={classes.textEllipsisOverflow}>{channel.fields&&channel.fields.channelTag=='lol'?"2021 LCS Summer Split":channel.fields && channel.fields.title}</div>
        </div>
        <div
          className={cx(classes.sectionVariety, classes.clickable)}
          onClick={onClick}
        >
          <div className={classes.textEllipsisOverflow}>{channel.fields && channel.fields.title}</div>
        </div>
      </div>
      ))}
    </React.Fragment>
   
  )
}

const Track = ({ episodeData, backgroundColor, counter, channelColor,liveUrl,channelData }) => {
  const [isPlaying,setIsPlaying]=React.useState(false);
  const [canPlay,setcanPlay]=React.useState(false);
  const {
    title,
    description,
    createdTime,
    fakeDateLabel,
    fakeDurationLabel,
  } = episodeData
  const classes = useStyles({ backgroundColor, canPlay, channelColor })

  const PlayOrPauseIcon = isPlaying ? IcoPause : IcoPlay
  const onClick = isPlaying
  ? () => setIsPlaying(false)
  : () => setIsPlaying(true)
  const playVideo=()=> {
    playerRef.current.play();
    setPlayerOn(true)
  }
  let playBackUrl;
  var url=liveUrl
  let playbackStream=`https://stream.mux.com`
  if(url){
 playBackUrl=`${playbackStream}/${url.playback_ids?url.playback_ids[0].id:""}.m3u8`

  }
  return (
    <React.Fragment>
      {channelData['tag']!='lol'?(
          <div className={classes.episodeRow}>
          <div className={classes.episodeControls}>
            <PlayOrPauseIcon
              onClick={onClick}
              classes={{ inner: classes.episodePOP, outer: classes.episodePOPCell }}
            />
            {isPlaying &&(
                <ReactHlsPlayer
                src={`${playbackStream}/${url.playback_ids?url.playback_ids[0].id:""}.m3u8`}
                autoPlay={false}
                onClick={playVideo}
                controls={true}
                width="30%"
                height="auto"
                />
            )}
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
              <div className={classes.episodeTitle}>{episodeData.fields.title?episodeData.fields.title:""}</div>
            </div>
            <div className={classes.episodeDateAndDuration}>
              <div className={classes.episodeDateAndDurationLeftPad}>&nbsp;</div>
              <div className={classes.episodeDate}>{episodeData.fields?episodeData.fields.liveDate.split('T')[0]:""}</div>
              <div className={classes.episodeDuration}>{fakeDurationLabel}</div>
            </div>
          </div>
        </div>
      ):
      ''}

    </React.Fragment>
  )
}

const Tracks = ({ sectionData, channelColor,assetsId,channelData }) => {
  const classes = useStyles({ channelColor })
  const [liveUrl,setLiveUrl]=React.useState([])
  React.useEffect(()=>{
    //gettingMuxassetsId();
  },[assetsId])
  
  /* const gettingMuxassetsId=()=>{
    console.log("getting")
    if(assetsId)
    {
        var params=assetsId
         for(var i=0;i<params.length;i++){

          fetch('/.netlify/functions/mux-proxy-assests', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
          'Content-Type': 'application/json'
            },
            body:JSON.stringify({url: `video/v1/assets/${params[i]}`})
          }).then(response => response.json())
            .then(function(assesetId){ 
              setLiveUrl(assesetId.data)
            }         
          ).catch((error)=>{
             toast.error(error.type)
          }) 
        }
     }
  } */
  
  return (
    <div className={classes.tracks}>
      <div className={classes.tracksLeftPad}>&nbsp;</div>
      <div className={classes.tracksContent}>
        {(counter =>
          sectionData.map(episode => {
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
                liveUrl={liveUrl}
                channelData={channelData}
              />
            )
          }))(0)}
      </div>
    </div>
  )
}

const ReplayLiveBroadCast = ({ className, channel }) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const classes = useStyles()
  const channels = useChannels().list
  const [fetchLiveData,setFetchLiveData]=React.useState([])
  const [showLiveData,setShowLLiveData]=React.useState([])
  const [rescentAsscetid,setrescentAsscetId]=React.useState([])
  React.useEffect(()=>{
    liveData();
    return sleep(3000).then(() => {
    gettingMuxassets(channel['liveStreamId']);
    })
  },[])
  
  const liveData=()=>{
    const baseId = 'appXoertP1WJjd4TQ'
      let urladd=`maxRecords=3&filterByFormula={channelTag}=${JSON.stringify(channel['tag'])}&sort%5B0%5D%5Bfield%5D=liveDate&sort%5B0%5D%5Bdirection%5D=desc`
      fetch('/.netlify/functions/commingsoon-proxy', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
       // body: JSON.stringify({url: `video/v1/live-streams/${livestreamingId}`})
        body: JSON.stringify({url: `${baseId}/ChannelLiveData?${urladd}`})
      }).then(response => response.json())
        .then(
          function(response){
            if(response.records.length){
              setFetchLiveData([response.records[0]])
              setShowLLiveData(response.records);
            }
            else{
           
            }
          }
        ).catch((error)=>{
          console.log("error while data fetching",error.type)
        })
  }
  
  const gettingMuxassets=(livestreamid)=>{
    //call mux api to get playback url
    fetch('/.netlify/functions/mux-proxy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url: `video/v1/live-streams/${livestreamid}`})
    }).then(response => response.json())
      .then(function(assesetId){ 
          setrescentAsscetId(assesetId.data.recent_asset_ids)
      }         
    ).catch((error)=>{
       toast.error(error.type)
    }) 
  }  
  
  const dispatch = useDispatch()
  const makeGotoEvent = event => () =>
    dispatch(actions.pushHistory(`/event/${event}`))

  return (
    <div className={cx(classes.replayBroadcasts, className,channel)}>
      {/* <ComingSoon className={classes.comingSoon} /> */}
      {/* {fetchLiveData.map((sectionData,index)=>{
        return ( */}
        
        <div key={fetchLiveData} className={classes.liveBroadcast}>
      <div className={classes.eventImageAndText}>
            <EventImage classes={classes} imageUrl={fetchLiveData}  />
            <EventTextplate
               channelColor={channel.color}
              sectionData={fetchLiveData}
            />
          </div>
          <div className={classes.liveness}>
            <div className={classes.livenessLeftPad}>&nbsp;</div>
            <div className={classes.livenessContent}>
              {/* { showLiveData.map((item,index)=>{ */}
                  <Tracks sectionData={showLiveData} channelColor={channel.color} assetsId={rescentAsscetid} channelData={channel} />
              {/* })} */}
            </div>
          </div>
    </div>
        {/* )
        })} */}

    </div>
  )
}

export const mockupGetHasBroadcasts = channel => {
  const data = filterMockupData(channel.tag)
  return data.length > 0
}

export default ReplayLiveBroadCast
