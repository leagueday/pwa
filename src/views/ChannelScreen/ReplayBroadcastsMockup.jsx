import React from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'
import ReactPlayer from "react-player";

import { makeStyles } from '@material-ui/core/styles'
import useChannels from '../../api/useChannels'
import { actions } from '../../store'
import { colors } from '../../styling'
import { IcoPause, IcoPlay, IcoPlus } from '../icons'
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
  eventImageFormobileView:{
    height: '15vw',
    width: '15vw',
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
    name: 'LEAGUE CHAMPIONSHIP SERIES',
    tags: ['riot', 'lol','lolnight'],
    variety: '2021 Summer Split',
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
     event: 'leaguenight',
     imageUrl: '/img/restyle_demo/LeagueNight2.png',
     name: 'LeagueNight',
     tags: ['riot', 'lol','lolnight'],
     variety: 'with Kelsey Moser',
   },
]

const filterMockupData = tag =>
  mockupData.filter(({ tags }) => tags.find(thisTag => thisTag === tag))

const transparent = 'rgba(0,0,0,1)'
const episodeBackgroundColors = ['#070709', transparent, '#0E0E11', transparent]

const EventImage = ({ classes, imageUrl, onClick }) => (
  <img
    className={cx(window.innerWidth>945?classes.eventImage:classes.eventImageFormobileView, classes.clickable)}
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

const Track = ({ episodeData, backgroundColor, counter, channelColor,liveUrl,leaugeNightData,channel}) => {
  const [isPlaying,setIsPlaying]=React.useState(false);
  const [canPlay,setcanPlay]=React.useState(false);
  const {
    fakeDateLabel,
    fakeDurationLabel,
  } = episodeData
  const classes = useStyles({ backgroundColor, canPlay, channelColor })

  const PlayOrPauseIcon = isPlaying ? IcoPause : IcoPlay
  // let playback
  // liveUrl.map(item=>{
  //   playback=item.duration
  // })
  
  let audio = new Audio(liveUrl)
  
  const onClick = isPlaying 
  ? () => audio.pause()
  : () => audio.play()
  
  const playVideo=()=> {
    playerRef.current.play();
    setPlayerOn(true)
  }
  let playBackUrl;
  var url=liveUrl
//   let playbackStream=`https://stream.mux.com`
//   if(url){
//  playBackUrl=`${playbackStream}/${url.playback_ids?url.playback_ids[0].id:""}.m3u8`

//   } 
 
    
  return (
    <React.Fragment>
     { episodeData.length&&episodeData?.map((episode,index)=>(
    <div className={classes.episodeRow}>
      <div className={classes.episodeControls}>
        <PlayOrPauseIcon
          classes={{ inner: classes.episodePOP, outer: classes.episodePOPCell }}
          onClick={onClick}
        />
          {/* {isPlaying &&(
                <ReactHlsPlayer
                src={`${playbackStream}/${url.playback_ids?url.playback_ids[0].id:""}.m3u8`}
                autoPlay={false}
                onClick={playVideo}
                controls={true}
                width="30%"
                height="auto"
                />
            )} */}
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
           <div className={classes.episodeTitle}>{episode.fields.title?episode.fields.title:""}</div>
         </div>
         <div className={classes.episodeDateAndDuration}>
           <div className={classes.episodeDateAndDurationLeftPad}>&nbsp;</div>
           <div className={classes.episodeDate}>{episode.fields.liveDate?episode.fields.liveDate.split('T')[0]:""}</div>
           <div className={classes.episodeDuration}>{fakeDurationLabel}</div>
         
     </div>
    </div>
    </div>
     ))}
    </React.Fragment>
  )
}

const Tracks = ({ sectionData, channelColor ,assetid,leaugeNightData,channel}) => {
  const [liveUrl,setLiveUrl]=React.useState([])
  React.useEffect(()=>{
    gettingMuxassetsId();
  },[assetid])
  const gettingMuxassetsId=()=>{
   if(assetid){
  var params=assetid
  //  for(var i=0;i<params.length;i++){
 
  //   fetch('/.netlify/functions/mux-proxy-assests', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  //     },
  //     body:JSON.stringify({url: `video/v1/assets/${params[i]}`})
  //   }).then(response => response.json())
  //     .then(function(assesetId){ 
  //       setLiveUrl([assesetId.data])
  //     }         
  //   ).catch((error)=>{
  //      toast.error(error.type)
  //   }) 
  // }
}
  }
  const classes = useStyles({ channelColor })
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
                leaugeNightData={leaugeNightData}
                channel={channel}
              />
            )
          }))(0)}
      </div>
    </div>
  )
}

const Tracks1 = ({ episodeData, backgroundColor, counter, channelColor,liveUrl,leaugeNightData,channel}) => {
//const Tracks1 = ({ episodeData, backgroundColor, counter, channelColor}) => {
  const [isPlaying,setIsPlaying]=React.useState(false);
  const [canPlay,setcanPlay]=React.useState(false);
  const {
    fakeDateLabel,
    fakeDurationLabel,
  } = episodeData
  const classes = useStyles({ backgroundColor, canPlay, channelColor })
  
  let audio = new Audio(liveUrl)
  
  const onClick = isPlaying 
  ? () => audio.pause()
  : () => audio.play()
  
  const PlayOrPauseIcon = isPlaying ? IcoPause : IcoPlay    
  return (
    <React.Fragment>
     { episodeData.length&&episodeData?.map((episode,index)=>(
    <div className={classes.episodeRow}>
      <div className={classes.episodeControls}>
        <PlayOrPauseIcon
          classes={{ inner: classes.episodePOP, outer: classes.episodePOPCell }}
          onClick={onClick}
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
           <div className={classes.episodeTitle}>{episode.fields.title?episode.fields.title:""}</div>
         </div>
         <div className={classes.episodeDateAndDuration}>
           <div className={classes.episodeDateAndDurationLeftPad}>&nbsp;</div>
           <div className={classes.episodeDate}>{episode.fields.liveDate?episode.fields.liveDate.split('T')[0]:""}</div>
           <div className={classes.episodeDuration}>{fakeDurationLabel}</div>
         
     </div>
    </div>
    </div>
     ))}
    </React.Fragment>
  )
}

const TracksData = ({ leaugeNightData, channelColor ,channel}) => {
  const [liveUrl,setLiveUrl]=React.useState([])
  const classes = useStyles({ channelColor })
  return (
    <div className={classes.tracks}>
      <div className={classes.tracksLeftPad}>&nbsp;</div>
      <div className={classes.tracksContent}>
        {(counter =>
          leaugeNightData.map(episode => {
            const bgC =
              episodeBackgroundColors[counter % episodeBackgroundColors.length]
            counter = counter + 1
            return (
              <Tracks1
                key={counter}
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
  const channels = useChannels().list
  const [RecordedData,setRecordedData]=React.useState([])
  const [rescentAsscetid,setrescentAsscetId]=React.useState([])
  const [leagueNightRecorded,setleagueNightRecorded]=React.useState([]);
  React.useEffect(()=>{
    showRecordedData();
    gettingMuxassets()
  },[])
  const showRecordedData=()=>{
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
          // console.log('recordeddata',JSON.stringify(response.records))
          setRecordedData([response.records])
          seturl(response.records[0].fields.playbackUrl)
          }
          else{
         
          }
        }
      ).catch((error)=>{
        console.log("error while data fetching",error.type)
      })
  }
  const gettingMuxassets=()=>{
    let livestreamingId=channels &&channels.map(item=>item.liveStreamId)
    fetch('/.netlify/functions/mux-proxy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url: `video/v1/live-streams/${livestreamingId[1]}`})
    }).then(response => response.json())
      .then(function(assesetId){ 
        leagueNightshowRecordedData();
        // let arrAsset=[]
 
        // if(assesetId.data.recent_asset_ids.length>3){
        //   arrAsset.push(assesetId.data.recent_asset_ids.slice(Math.max(assesetId.data.recent_asset_ids.length - 3, 0)))
        // }
        // else{
        //   arrAsset.push(assesetId.data.recent_asset_ids)
        // }
        setrescentAsscetId(assesetId.data.recent_asset_ids)
      }         
    ).catch((error)=>{
       toast.error(error.type)
    }) 
  }
  const leagueNightshowRecordedData=()=>{
    const baseId = 'appXoertP1WJjd4TQ'
    let urladd=`maxRecords=3&filterByFormula={channelTag}='lolnight'&sort%5B0%5D%5Bfield%5D=liveDate&sort%5B0%5D%5Bdirection%5D=desc`
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
          setleagueNightRecorded([response.records])
          }
          else{
         
          }
        }
      ).catch((error)=>{
        console.log("error while data fetching",error.type)
      })
  }
  const dispatch = useDispatch()
  const makeGotoEvent = event => () =>{
  console.log('event',event)
    dispatch(actions.pushHistory(`/event/${event}`))
  }
  return (
    <div className={cx(classes.replayBroadcasts, className)}>
      {filterMockupData(channel.tag).map(sectionData => {
        return (
          <React.Fragment>
        {sectionData.event=='lcs'&&(
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
           <Tracks sectionData={RecordedData} channelColor={channel.color} assetid={rescentAsscetid}  />
         </div>
        )}   
        </React.Fragment>
      )
      })} 
      {filterMockupData(channel.tag).map(sectionData => {
        return (
          <React.Fragment>
        {sectionData.event=='leaguenight'&&(
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
           <TracksData leaugeNightData={leagueNightRecorded}  channelColor={channel.color} />
         </div>
        )}   
        </React.Fragment>
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
