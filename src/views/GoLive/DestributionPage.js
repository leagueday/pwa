import React, { useEffect, lazy, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactHlsPlayer from 'react-hls-player';
import Airtable from 'airtable'
import 'react-h5-audio-player/lib/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import useChannels from '../../api/useChannels';
import useChannelCategories from '../../api/useChannelCategories';
import useFacets from '../../api/useFacets'
import { actions, selectors, constants as storeConstants } from '../../store'
import { colors } from '../../styling'
import BasicLayout from '../BasicLayout'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import Loading from '../Loading'
import { addScrollStyle } from '../util'
import TitleBar from './TitleBar'
import GoLiveData from './GoLiveData';
import { makeIconButton } from '../IconButton'
import { IcoPause, IcoPlay } from '../icons'
const ChannelCategories = lazy(() => import('../ChannelCategories'))
const primaryColor = colors.magenta
const PauseButton = makeIconButton(IcoPause)
const PlayButton = makeIconButton(IcoPlay)
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
  listng_user_info: {
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
  space: {
    marginLeft: "20px"
  },
  text: {
    color: "white",
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  radio: {
    background: "orange",
    cursor: "pointer"
  },
  playback: {
    marginBottom: "20px"
  },
  popButton: ({ accentColor }) => ({
    backgroundColor: colors.darkGray,
    width: '2em',
    [theme.breakpoints.only('xs')]: {
      height: '6vw',
      marginLeft: '1vw',
      width: '6vw',
    },
    '& *': {
      color: colors.white,
    },
    '&:hover *': {
      color: accentColor,
    },
  }),
}))

const DestributionPage = () => {
  const audioRef = useRef(null);
  const facetedPodcasts = useFacets('Home')
  const classes = useStyles({ primaryColor })
  const [channelList, setChannelList] = useState({
    rtmpLink: "",
    streamKey: "",
    liveStreamId: "",
    channelTitle: '',
    channelTag: ""
  })
  const [playback, setplayback] = useState("")
  const [streamkey, setStreamkey] = useState("")
  const [create, setCreate] = useState(false);
  const [directLink, setdirectLink] = useState(false)
  const [button, setbutton] = useState(false);
  const [userProfile, setUserProfile] = useState([])
  const [userChannel, setuserChannel] = useState([])
  const [playbackChannel, setplaybackChannel] = useState('')
  const channels = useChannels().list
  const user = useSelector(selectors.getUser)
  const userName = user?.user_metadata?.full_name

  useEffect(() => {
    const baseId = 'appXoertP1WJjd4TQ'
    const userId = user['id']
    let fetchSearch = `?filterByFormula=({userId}=${JSON.stringify(userId)})`

    fetch('/.netlify/functions/airtable-getprofile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: `${baseId}/UserProfile${fetchSearch}` })
    }).then(response => response.json())
      .then(
        function (response) {
          if (response.records[0].fields) {
            setuserChannel([response.records[0]])
            setUserProfile(response.records[0].fields.restrictedChannelTags.split(','))
          }
        }
      ).catch((error) => {
        console.log('error while data fetching', error)
      })
  }, [])

  let playbackStream = `https://stream.mux.com`
  let userChannelPush = {};
  if (userChannel) {
    userChannel.map(item => {
      userChannelPush.title = item.fields.userChannel,
        userChannelPush.rtmpLink = item.fields.rtmpLink,
        userChannelPush.streamKey = item.fields.streamKey,
        userChannelPush.liveStreamId = item.fields.liveStreamId
    })
  }

  let channelsData = channels.concat(userChannelPush)
  const onChannelChanged = (e, key) => {

    let ChannelInfo = channelsData[key]
    if (!ChannelInfo.rtmpLink || !ChannelInfo.streamKey || !ChannelInfo.liveStreamId) {
      toast.error("We can't Go Live for this channel as stream key is not provided. Please update key and try again.")
      setdirectLink(false);
      setCreate(false)
    }
    else {
      setChannelList({
        ...channelList,
        channelTitle: e.target.value,
        rtmpLink: ChannelInfo.rtmpLink,
        liveStreamId: ChannelInfo.liveStreamId,
        streamKey: ChannelInfo.streamKey,
        channelTag: ChannelInfo.tag
      })
      setCreate(true)
      setbutton(true)
      toast.success("Please click Create Direct Link below to stream to selected channel")
    }

  }

  const creatingDirectLink = () => {
    let livestreamingId = channelList['liveStreamId']

    //call mux api to get playback url
    fetch('/.netlify/functions/mux-proxy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: `video/v1/live-streams/${livestreamingId}` })
    }).then(response => response.json())
      .then(function (streamData) {
        //console.log(streamData.data);
        setplaybackChannel(streamData.data.playback_ids[0].id)
        setStreamkey({
          streamkey: streamData.data.stream_key
        })
        setplayback({
          playback: streamData.data.playback_ids[0].id
        })
        setdirectLink(true)
        setCreate(true)
        setbutton(false)
        localStorage.setItem('playback', streamData.data.playback_ids[0].id)
        submitFormData(streamData.data.playback_ids[0].id)
      }
      ).catch((error) => {
        toast.error(error.type)
      })

  }

  let playId = playback.playback;
  let playbackUrl = `${playbackStream}/${playId}.m3u8`
  let playbachannelUrl = playbackChannel
  const playerRef = useRef();

  function submitFormData(play_id) {
    let data = {
      "records": [
        {
          "fields": {
            title: localStorage.getItem('title'),
            description: localStorage.getItem('description'),
            thumbnailUrl: localStorage.getItem('channelImage'),
            liveDate: new Date(),
            channelTag: channelList.channelTag,
            playbackUrl: `${playbackStream}/${play_id}.m3u8`,
            userId: user.id,
            userEmail: user.email
          }
        }
      ]
    }

    const baseId = 'appXoertP1WJjd4TQ'
    fetch('/.netlify/functions/airtable-proxy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: `${baseId}/ChannelLiveData`, body: data })
    }).then(response => response.json())
      .then(
        function (response) {
          console.log("response from api",response)
        }
      ).catch((error) => {
        console.log("error while data fetching", error.type)
      })
  }

  function playVideo() {
    playerRef.current.play();
    setdirectLink(false)
  }

  function pauseVideo() {
    playerRef.current.pause();
  }

  function toggleControls() {
    playerRef.current.controls = !playerRef.current.controls;
  }
  channelsData && channelsData.map((channel, index) => {
    userProfile && userProfile.map((item) => {
      if (channel.title === item) {
        channelsData.splice(index, 1);
      }
    })
  })
  const dispatch = useDispatch()
  const audioMode = useSelector(selectors.getAudioMode)
  const isSelectedAudio = playbackUrl && playbackUrl
  const isPlaying =
    isSelectedAudio && audioMode === storeConstants.AUDIO_MODE_PLAY
  const PopButton = isPlaying ? PauseButton : PlayButton
  const onPopClick = isPlaying
    ? ev => {
      dispatch(actions.pauseAudio())
      ev.stopPropagation()
    }
    : ev => {
      //console.log('iskhkjds',isSelectedAudio)
      dispatch(actions.playAudio())
      dispatch(
        actions.selectAudio(
          '',
          '',
          '',
          isSelectedAudio ? isSelectedAudio : "",
          '',
          '',
          ''
        )
      )

      dispatch(actions.playAudio())
      ev.stopPropagation()
    }

  return (
    <BasicLayout home>
      <ToastContainer />
      {user ? (

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
                      <th>Choose a LeagueDay channel to stream to</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelsData && channelsData.map((channel, index) => {
                      return (
                        <tr key={index}>
                          <td rowSpan={3}>
                            <input
                              type="radio"
                              className={classes.radio}
                              onChange={(e) => onChannelChanged(e, index)}
                              value={channel.title}
                              name="channel"
                            />{channel.title}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              {create && (
                <ul>
                  <header>
                    <h3>Please link the keys below to OBS and then click Create Direct Link in order to go live on selected channel</h3>
                  </header>
                  <li >
                    Stream Key:  {channelList['streamKey']}
                  </li>
                  <li>
                    RTMP Link: <a className={classes.space} href={playbackUrl} target="_blank">
                      {channelList['rtmpLink']}
                    </a>
                  </li>
                </ul>
              )}
              {button && (
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

              {directLink && (
                <>
                  Your playBack url is: <a className={classes.playback} href={playbackUrl} target="_blank">
                    {playbackUrl}
                  </a>
                  <br></br>
                  <br></br>
                  Play Audio:
                  <PopButton
                    className={classes.popButton}
                    iconClassName={classes.popButtonIcon}
                    size="1.5em"
                    onClick={onPopClick}
                    shadowColor={colors.darkGray}
                  />

                  <br />
                  <br />
                </>
              )}
            </div>
          </div>
        </div>
      ) : (window.location.href = '/')}
    </BasicLayout>
  )

}

export default DestributionPage
