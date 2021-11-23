import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { base } from '../..';
import { Button, TextField } from "@material-ui/core";
import Select from 'react-select';
import { makeStyles } from '@mui/styles'
import 'react-h5-audio-player/lib/styles.css';
import { getMyList } from '../../api/getChannelList';
import { selectors } from '../../store'
import { colors } from '../../styling'
import BasicLayout from '../BasicLayout'
import { addScrollStyle } from '../util'
import { uploadFile } from 'react-s3';
import('buffer').then(({ Buffer }) => { global.Buffer = Buffer; })

const primaryColor = colors.magenta

const useStyles = makeStyles(theme => ({
  container: () => addScrollStyle(primaryColor, theme)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    overflow: 'auto',
  }),
  formCont: {
    padding: '0 15%',
    height: '80%',
  },
  form: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input: {
    minWidth: '500px',
    margin: '0 auto',
    marginButton: '5%',
    [theme.breakpoints.down('sm')]: {
      minWidth: '250px'
    },
  },
  channel: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  select: {
    width: '60%',
    minWidth: '400px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '0px',
      width: '100%'
    },
  },
  submitBtn: {
    background: colors.blue,
    width: '200px',
    marginTop: '3%',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      fontSize: '80%',
    },
  },
  liveNote: {
    width: '50%', minWidth: '500px', textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      minWidth: '200px',
    },
  }
}))

const customStyles = {
  dropdownIndicator: () => ({
    color: 'white',
    fontsize: '1rem',
  }),
  option: () => ({
    color: 'black',
  }),
  control: () => ({
    border: '2px solid white',
    borderRadius: '5px',
    display: 'flex',
  }),
  placeholder: () => ({
    color: 'white',
  }),
  singleValue: () => ({
    color: 'white',
  }),
  input: () => ({
    color: 'white'
  })
}

const config = {
  bucketName: "leagueday-prod-images",
  dirName: "uploads",
  region: 'us-east-1',
  accessKeyId: "AKIA2NEES72FJV4VO343",
  secretAccessKey: "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",
};

const baseId = 'appXoertP1WJjd4TQ'

const GoLiveData = () => {
  const filteredListRecords = getMyList()
  const userProfile = useSelector(selectors.getUserData)
  const [thumbnail, setThumbnail] = useState();
  const [selectedChannel, setSelectedChannel] = useState();
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false)
  const [streamKey, setStreamKey] = useState('')
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageUpload = e => {
    const file = e.target.files[0]
    setLoading(true)
    uploadFile(file, config)
      .then(res => {
        console.log(res.location)
        setThumbnail(res.location)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  const createStreamKey = async (e) => {
    e.preventDefault();

    await axios.post('https://leagueday-api.herokuapp.com/proxies/mux-livestream', {
      url: "video/v1/live-streams",
      passthrough: selectedChannel
    }).then((livestreamData) => {
      const data = JSON.parse(livestreamData.data.data)
      setCreated(true)
      setStreamKey(data.data.stream_key)
      handleSubmit(data.data.playback_ids[0].id, data.data.id, data.data.stream_key)
    }).catch(err => console.log('error from GoLiveData.js ', err))
  }

  const handleSubmit = (play_id, livestreamid, stream) => {
    let data = {
      fields: {
        title: formValues.title,
        description: formValues.description,
        thumbnail: thumbnail,
        channelTag: selectedChannel,
        playbackUrl: `https://stream.mux.com/${play_id}.m3u8`,
        userId: userProfile.fields.userId,
        liveStreamId: livestreamid,
        streamKey: stream,
        upvotes: 0,
        userEmail: userProfile.fields.email,
        type: 'livestream',
        creatorImg: userProfile.fields.image,
        username: userProfile.fields.username,
      }
    }

    base('ChannelLiveData').create([data], function (err, records) {
      if (records) {
        console.log("new channelLiveData entry ", records)
        setCreated(true)
      }
      if (err) {
        console.error(err)
        return
      }
    })
  }

  const classes = useStyles({ primaryColor })

  return (
    <BasicLayout home>
      <div className={classes.container}>
        <h3>Enter Live Stream Information</h3>
        <div className={classes.formCont}>
          <form onSubmit={createStreamKey} className={classes.form}>
            <TextField
              label="Title of your Live Stream"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              className={classes.input}
              required
            />
            <TextField
              label="Description of your Live Stream"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              className={classes.input}
              required
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <h4 style={{ marginTop: '5%' }}>Upload Thumbnail</h4>
              <input
                aria-label="Select a thumbnail to upload"
                type="file"
                name="image"
                onChange={handleImageUpload}
                required={true}
              />
              {
                thumbnail &&
                <img src={thumbnail} alt="" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              }
            </div>
            <div>
              <h4 style={{ marginTop: '5%' }} className={classes.channel}>Choose a LeagueDay channel to livestream to</h4>
              <Select
                options={filteredListRecords}
                className={classes.select}
                styles={customStyles}
                onChange={val => setSelectedChannel(val.value)}
              />
            </div>
            {
              !created &&
              <button type="submit" className={classes.submitBtn} disabled={loading}>Create Stream Key</button>
            }
          </form>
        </div>
        {
          created &&
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <h3 className={classes.liveNote}>Please paste the stream key and RTMP link below into OBS to start streaming. Once you start streaming, your live stream will show up in the selected channel.</h3>
            <p> <b>Stream Key:</b>  {streamKey}</p>
            <p> <b>RTMP link:</b>  rtmps://global-live.mux.com:443/app</p>
          </div>
        }
      </div>
    </BasicLayout>
  )
}

export default GoLiveData
