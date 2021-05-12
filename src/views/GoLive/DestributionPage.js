import React,{useEffect, useState,useRef} from 'react'
import { useSelector } from 'react-redux'
import Hls from 'hls.js';
import ReactHlsPlayer from 'react-hls-player';
import 'react-h5-audio-player/lib/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import useChannels from '../../api/useChannels';
import useChannelCategories from '../../api/useChannels';
import useFacets from '../../api/useFacets'
import { actions, selectors } from '../../store'
import { useDispatch } from "react-redux";
import { colors } from '../../styling'
import BasicLayout from '../BasicLayout'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import Loading from '../Loading'
import { addScrollStyle } from '../util'
import TitleBar from './TitleBar'
import GoLiveData from './GoLiveData';
const ChannelCategories = React.lazy(() => import('../ChannelCategories'))
const primaryColor = colors.magenta
  
const useStyles = makeStyles(theme => ({
channelCategories: {},
  channelCategories: {
    marginTop: '0.5em',
  },
  homeContent: ({ primaryColor }) =>
    addScrollStyle(
      primaryColor,
      theme
    )({
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      height: '100%',
      overflow: 'auto',
      padding: '0.5em 0.5em 0 0.5em',
      width: '100%',
    }),
  listng_user_info:{
  display: "inline-block",
    float: "left",
    width: "72%",
    marginLeft: "60px",
  },
  button: {
    margin: theme.spacing(1)
  },
  primaryStripe: ({ primaryColor }) => ({
    backgroundColor: primaryColor,
    height: '0.25em',
    width: '100%',
  }),
  titleBar: {
    marginBottom: '0.25em',
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  space:{
    marginLeft:"20px"
  },
  text:{
    color:"white",
    backgroundColor:'white',
    cursor:'pointer'
  },
  radio:{
    background: "orange",
    cursor:"pointer"
  },
  playback:{
    marginBottom:"20px"
  }
}))

const DestributionPage = () => {
  const audioRef = useRef(null);
  const src = "https://stream.mux.com/{PLAYBACK_ID}.m3u8"
  const streamKey = 'eba8e3df-a087-fee7-00f5-099c8558f1c9';
  const url="https://api.mux.com/video/v1/live-streams/LIVE_STREAM_ID"
  const LIVE_STREAM_ID="hNBi4PEaC4MTI01XM6GfP3gNCGKkp6xy3B00TsOsRJpro"
  const facetedPodcasts = useFacets('Home')
  const classes = useStyles({ primaryColor })
  const [channelList,setChannelList]=useState({
    rtmpLink:"",
    streamKey:"",
    liveStreamId:"",
    channelTitle:''
  })
  const [playback,setplayback]=useState("")
  const [streamkey,setStreamkey]=useState("")
  const [create,setCreate]=useState(false);
  const [directLink,setdirectLink]=useState(false)
  const [button,setbutton]=useState(false);
  const channels = useChannels().list
  const user = useSelector(selectors.getUser)
  const userName = user?.user_metadata?.full_name
  const onChannelChanged=(e,key)=>{
    console.log("targer vakjkljljlj",e.target.value,channels[key])
    let ChannelInfo=channels[key]
     if(!ChannelInfo.rtmpLink || !ChannelInfo.streamKey|| !ChannelInfo.liveStreamId){
         toast.error("We can't go live for this channel as the stream key was not provided. Please update key and try again.")
         setdirectLink(false);
         setCreate(false)
     }
     else{
      setChannelList({
        ...channelList,
        channelTitle:e.target.value,
        rtmpLink:ChannelInfo.rtmpLink,
        liveStreamId:ChannelInfo.liveStreamId,
        streamKey:ChannelInfo.streamKey
      })
      setCreate(true)
      setbutton(true)
      toast.success("Please click on the create direct link button to being streaming")
     }
     console.log("channelList",JSON.stringify(channelList))

    //   localStorage.setItem("selectedChannel",e.target.value)
  }
  const creatingDirectLink=()=>{
    let access_token="2bGfOofUHoMPq5PtL6yb/peOp80MyN2VGsgLb5nIaREZhQ51iAtDdd4yR0pIp0bXYWWki2lcHVS"
    let livestreamingId=channelList['liveStreamId']
    axios.get(`https://api.mux.com/video/v1/live-streams/${livestreamingId}`, {
      auth: {
        username: 'e6dc9a66-fb63-414b-b187-6a39aaa6583f',
        password: access_token
      }
      })
        .then(response =>{
          setStreamkey({
            streamkey:response.data.data.stream_key
          })
          setplayback({
            playback:response.data.data.playback_ids[0].id
          })
          setdirectLink(true)
          setCreate(true)
          setbutton(false)
          console.log("response datta",playback)
        })
        .catch(function (error) {
        toast.error(error.messages[0])
  
  })
}
let playId=playback['playback'];
console.log("playbackid",playback)
let playbackUrl=`https://stream.mux.com/${playId}.m3u8`
const playerRef = React.useRef();

function playVideo() {
  playerRef.current.play();
  setdirectLink(false)
  console.log("palyref",playerRef)
}

function pauseVideo() {
  playerRef.current.pause();
}

function toggleControls() {
  playerRef.current.controls = !playerRef.current.controls;
}
  return (
    <BasicLayout home>
         <ToastContainer />
       {user ?(

      <div className={classes.homeContent}>
      <TitleBar
          className={classes.titleBar}
          primaryColor={primaryColor}
          text={userName ? `Welcome back, ${userName}!` : 'Home'}
        />
        <div className={classes.primaryStripe} />
        <div className={classes.listng_user_info}>
             <div className="table_inner">
          <div className="table-responsive">
                <table className="table">
                <thead>
                  <tr>
                  <th>Choose one League Day channel to stream to</th>
                  </tr>
                </thead>
        <tbody>
        { channels.map((channel ,index) => {    
               return(
            <tr key={index}>
            <td>
            <input 
            type="radio" 
            className={classes.radio}
            onChange={(e)=>onChannelChanged(e,index)}
            value={channel.title}
            name="channel" 
           />{channel.title}</td>
             </tr>
               )})}
        </tbody>
         </table>
         </div>   
         {create &&(
              <ul>
                <header>
                <h3> Please use and set these keys in OBS to start streaming and then press on Create direct Link button to go live</h3>
                </header>
              <li >
              Streaming Key:  {channelList['streamKey']}
                 </li>
                 <li>
                 RTMP Link: <a className={classes.space} href={playbackUrl} target="_blank">
                {channelList['rtmpLink']}
                </a>
                 </li>
             </ul>
           )}
             {button&&(
              <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={creatingDirectLink}
              className={classes.button}
            >
            Create direct Link<Icon className={classes.rightIcon}></Icon>
            </Button>
             )}  
          
           {directLink &&(
             <>
              Your playBack url is: <a className={classes.playback} href={playbackUrl} target="_blank">
                {playbackUrl}
                   </a>
                   <br></br>
                   <br></br>
          Play Audio : <ReactHlsPlayer
           playerRef={playerRef}
            src={playbackUrl}
            autoPlay={false}
            onClick={playVideo}
           controls={true}
           width="20%"
            height="auto"
             />

                   <br/>
                   <br/>
                   </>
           )} 
        </div>
        </div>
      </div>
       ):(window.location.href='/')}
    </BasicLayout>
  )
  
}

export default DestributionPage
