import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'react-h5-audio-player/lib/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import { getMyList } from '../../api/getChannelList';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Icon } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import useChannels from '../../api/useChannels';
import { actions, selectors, constants as storeConstants } from '../../store'
import { colors } from '../../styling'
import BasicLayout from '../BasicLayout'
import { addScrollStyle } from '../util'
import TitleBar from './TitleBar'
import { makeIconButton } from '../IconButton'
import { IcoPause, IcoPlay } from '../icons'

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
  const classes = useStyles({ primaryColor })
  const [playback, setplayback] = useState("")
  const [streamkey, setStreamkey] = useState("")
  const [create, setCreate] = useState(false);
  const [directLink, setdirectLink] = useState(false)
  const [button, setbutton] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState()
  const user = useSelector(selectors.getUser)
  const userProfile = useSelector(selectors.getUserData)
  const userName = user?.user_metadata?.full_name
  const baseId = 'appXoertP1WJjd4TQ'
  const filteredListRecords = getMyList();
  let playbackStream = `https://stream.mux.com`

  const creatingDirectLink = async () => {
    const passthrough = channelList.channelTag

    await fetch('/.netlify/functions/mux-livestream', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `video/v1/live-streams`, passthrough: passthrough }),
    })
      .then(response => response.json())
      .then(function (livestreamData) {
        console.log("doing it the right way ", livestreamData)
        setStreamkey(livestreamData.data.stream_key)
        setplayback(livestreamData.data.playback_ids[0].id)
        setdirectLink(true)
        setCreate(true)
        setbutton(false)
        submitFormData(livestreamData.data.playback_ids[0].id, livestreamData.data.id, livestreamData.data.stream_key)
      })
      .catch(error => {
        console.log("error ", error)
      })
  }

  let playId = playback.playback;
  let playbackUrl = `${playbackStream}/${playId}.m3u8`

  function submitFormData(play_id, livestreamid, stream) {
    let data = {
      "records": [
        {
          "fields": {
            title: localStorage.getItem('title'),
            description: localStorage.getItem('description'),
            thumbnail: localStorage.getItem('channelImage'),
            uploadDate: new Date(),
            channelTag: selectedChannel,
            playbackUrl: `${playbackStream}/${play_id}.m3u8`,
            userId: user.id,
            liveStreamId: livestreamid,
            streamKey: stream,
            upvotes: 0,
            userEmail: user.email,
            type: 'livestream',
            creatorImg: userProfile.fields.image,
            username: userProfile.fields.name
          }
        }
      ]
    }

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
          console.log("new channelLiveData entry ", response)
        }
      ).catch((error) => {
        console.log("error while data fetching", error.type)
      })
  }

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
              <h3>Choose a LeagueDay channel to livestream to</h3>
              <Select
              options={filteredListRecords}
              className={classes.select}
              styles={customStyles}
              onChange={val => setSelectedChannel(val.value)}
            />
            </div>
            {create && (
              <ul>
                <header>
                  <h3>Please link the keys below to OBS and then click Create Direct Link in order to go live on selected channel</h3>
                </header>
                <li >
                  Stream Key: {streamkey}
                </li>
                <li>
                  RTMP Link: <a className={classes.space} href={playbackUrl} target="_blank">
                    rtmps://global-live.mux.com:443/app
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
                {/* Your playBack url is: <a className={classes.playback} href={playbackUrl} target="_blank">
                    {playbackUrl}
                  </a> */}
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
    </BasicLayout>
  )
}

export default DestributionPage
