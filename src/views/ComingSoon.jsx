import React from 'react'
import cx from 'classnames'
import Color from 'color'
import { makeStyles } from '@material-ui/core'
import ToggleImageButton from './ToggleImageButton'
import { colors } from '../styling'
import ReactHlsPlayer from 'react-hls-player';
import { useSelector,useDispatch } from 'react-redux'
import { actions, selectors, constants as storeConstants} from '../store'
import useChannels from '../api/useChannels'
const useStyles = makeStyles(theme => ({
  comingSoon: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
  },

  comingSoonRow: {
    alignItems: 'center',
    borderRadius: '1em',
    display: 'flex',
    height: '2em',
    minWidth: 0,
    padding: '0.35em 0.35em',
    [theme.breakpoints.up('sm')]: {
      backgroundColor: colors.brandBlack,
      color: colors.white80,
    },
    [theme.breakpoints.only('xs')]: {
      backgroundColor: colors.lightGray,
      color: colors.darkGray,
    },
  },
  logo: {
    display: 'block',
    maxHeight: '100%',
    width: 'auto',
  },
  logoContainer: {
    height: '100%',
  },
  eventImageAndText: {
    display: 'flex',
    width: '100%',
  },
  text: {
    fontFamily: theme.typography.family.primary,
    fontSize: '100%',
    fontWeight: theme.typography.weight.bold,
    margin: '0 0.25em',
    textTransform: 'uppercase',
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
  liveBroadcasts: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
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
  eventImage: {
    height: '6vw',
    width: '6vw',
  },
  liveness: {
    display: 'flex',
    width: '600%',
  },
  livenessLeftPad: {
    flex:-6
  },
  liveBroadcast:{
    display: 'flex',
    flexDirection: 'row',
  },
  livenessContent: {
    backgroundColor: '#070709',
    display: 'flex',
    flex:4 ,
    padding: '1em 0 1em 1em',
    [theme.breakpoints.only('xs')]: {
      padding: '2vw 0 2vw 2vw',
    },
  },
  trackText: {
    color: colors.white80,
    flex: 1,
    top:"-99%",
    position:"relative",
    minWidth: '12vw',
    paddingLeft: '2.0vw',
    paddingTop:"0.5vw",
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))


const mockupData = [
  {
    episodes: [],
    imageUrl: localStorage.getItem('image'),
    name: localStorage.getItem('title'),
    tags: ['riot', 'lol'],
    variety: localStorage.getItem('description'),
  },
]
const buttonShadowColor = Color(colors.brandBlack).darken(0.5).string()
const filterMockupData = tag =>
  mockupData.filter(({ tags }) => tags.find(thisTag => thisTag === tag))
const EventImage = ({ classes, imageUrl }) => {
  console.log('imageurl',imageUrl)
  return (
  
  <img className={cx(classes.eventImage)} src={imageUrl} />
  )
}

const EventTextplate = ({ channelColor, sectionData }) => {
  const classes = useStyles({ channelColor })

  return (
    <div className={classes.eventTextplate}>
      <div className={cx(classes.sectionTitle)}>
        <div className={classes.textEllipsisOverflow}>{sectionData['title']} </div>
      </div>
      <div className={cx(classes.sectionVariety)}>
        <div className={classes.textEllipsisOverflow}>{sectionData['description']}</div>
      </div>
    </div>
  )
}


const Track = ({ classes ,playbackurl}) => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [plyerOn,setPlayerOn]=React.useState(false);
  const dispatch = useDispatch()
const playerRef = React.useRef();
  const onClick = isPlaying
    ? () => setIsPlaying(false)
    : () => setIsPlaying(true)
    // const playVideo=()=> {
    //   playerRef.current.play();
    //   setPlayerOn(true)
    //   console.log("palyref",playerRef)
    // }
const onPopClick = isPlaying
? ev => {
  dispatch(actions.pauseAudio())
        ev.stopPropagation()
        setIsPlaying(false)
  }
: ev => {
   dispatch(actions.playAudio())
          dispatch(
            actions.selectAudio(
              '',
              '',
              '',
              playbackurl?playbackurl:"",
              '',
              '',
              ''
            )
          )
          setIsPlaying(true)
          dispatch(actions.playAudio())
          ev.stopPropagation()
        }
  return (
    <div className={classes.track}>
      <ToggleImageButton
        className={classes.logoButton}
        size="8vw"
        on={isPlaying}
        onClick={onPopClick}
        onImage="/img/logo_live_pause.png"
        offImage="/img/logo_live_play.png"
        shadowColor={buttonShadowColor}
      />
      <div className={classes.trackText}>
      Stream</div>
        {/* {isPlaying &&(
            <ReactHlsPlayer
            playerRef={playerRef}
            src={playbackurl}
            autoPlay={true}
            onClick={playVideo}
            controls={true}
            width="20%"
            height="auto"
            />
        )} */}
    </div>
  )
}

const ComingSoon = ({ className,channel,channelColor }) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [fetchLiveData,setFetchLiveData]=React.useState([])
  const [liveStatus,setliveStatus]=React.useState(1);
  const [channeLivestatus,setChannelLivestatus]=React.useState(0);
  const [url,setUrl]=React.useState('')
  React.useEffect(()=>{
    liveData();
    return sleep(3000).then(() => {
    muxliveData();
    })
  },[liveStatus])
  const liveData=()=>{
    const baseId = 'appXoertP1WJjd4TQ'
    fetch('/.netlify/functions/commingsoon-proxy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     // body: JSON.stringify({url: `video/v1/live-streams/${livestreamingId}`})
      body: JSON.stringify({url: `${baseId}/ChannelLiveData`})
    }).then(response => response.json())
      .then(
        function(response){
          if(response.records.length){
           // console.log('seturl',JSON.stringify(response.records))
          setFetchLiveData([response.records[response.records.length-1]])
          localStorage.setItem('livePlayurl',response.records[response.records.length-1].fields.playbackUrl )
          seturl(response.records[response.records.length-1].fields.playbackUrl)
          }
          else{
            console.log('setlivestatus',liveStatus)
          }
        }
      ).catch((error)=>{
        console.log("error while data fetching",error.type)
      })
  }
   const muxliveData=()=>{
    const baseId = 'appXoertP1WJjd4TQ'
    //console.log('abc--'+localStorage.getItem('livePlayurl'));
    console.log('muxlivedata',localStorage.getItem('livePlayurl'))
    if(localStorage.getItem('livePlayurl') == 'null' || localStorage.getItem('livePlayurl') == '' || localStorage.getItem('livePlayurl') == null)
    {
        setliveStatus(0)
        console.log('muxlivedatainside',localStorage.getItem('livePlayurl'),liveStatus)
    }
    else
    {        
        var str = localStorage.getItem('livePlayurl');
        var serchStr = str.indexOf("undefined");
        if(serchStr == '-1')
        {
            fetch('/.netlify/functions/mux-getlivedata', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
           // body: JSON.stringify({url: `video/v1/live-streams/${livestreamingId}`})
            body: JSON.stringify({url: `${localStorage.getItem('livePlayurl')}`})
          }).then(response => response.json())
            .then(
              function(response){
                //console.log('abc',typeof response.error)
                if(typeof response.error.messages[0]!=='undefined'){
                  setliveStatus(0)

                }
              }
            ).catch((error)=>{
              console.log("error while data fetching",error.type)
            })
        }
        else
        {
            setliveStatus(0)
        }
        
    }      
      
    }
     let  urlIsthere;
    let channelTitle;
    if(fetchLiveData){
     fetchLiveData && fetchLiveData.map(item=> {
       urlIsthere=item.fields.playbackUrl,
       channelTitle=item.fields.channelTag
      
     })
   }
  const classes = useStyles()
  let checkChannel;
  if(channelTitle){
    if(channel['tag']==channelTitle){
      checkChannel=1;
    }
    else{
      checkChannel=0;
      //setChannelLivestatus(0)
    }
   }
  return (
    <div className={cx(classes.comingSoon,className)}>
      {liveStatus==0 || checkChannel==0?(
      <div className={classes.comingSoonRow}>
        <div className={classes.logoContainer}>
          <img
            className={classes.logo}
            src="/img/logo_square_transparent.png"
          />
        </div>
        <div className={classes.text}>Coming Soon</div>
      </div>
      ):(
        <>
      {fetchLiveData.length? fetchLiveData?.map((sectionData,index)=>{
        return (
        <div key={sectionData.fields.title?sectionData.fields.title:null} className={classes.liveBroadcast}>
      <div className={classes.eventImageAndText}>
            <EventImage classes={classes} imageUrl={sectionData.fields.thumbnailUrl?sectionData.fields.thumbnailUrl:""}  />
            <EventTextplate
              channelColor={channelColor}
              sectionData={sectionData.fields}
            />
          </div>
          <div className={classes.liveness}>
            <div className={classes.livenessLeftPad}>&nbsp;</div>
            <div className={classes.livenessContent}>
              <Track classes={classes} playbackurl={sectionData.fields.playbackUrl}/>
            </div>
          </div>
    </div>
        )}):""}
        </>
      )}
    
      </div>
    
    
  )
}
export const mockupGetHasBroadcasts = channel => {
  const data = filterMockupData(channel.tag)
  return data.length > 0
}
export default ComingSoon
