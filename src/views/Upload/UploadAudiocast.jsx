import React, { useState, useEffect, useContext } from 'react'
import { selectors, actions } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import BasicLayout from '../BasicLayout'
import { options } from './options'
import Select from 'react-select'
import Airtable from 'airtable'
import { colors } from '../../styling'
import { Button } from '@material-ui/core'
import { UserStateContext } from '../../store/stateProviders/userState'
import { uploadFile } from 'react-s3'

import('buffer').then(({ Buffer }) => {
  global.Buffer = Buffer
})

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  select: {
    width: '50%',
  },
  inputs: {
    height: '100%',
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    width: '50%',
    marginBottom: '5%',
  },
  submitBtn: {
    marginTop: '6%',
    width: '180px',
    height: '40px',
    background: colors.blue,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    [theme.breakpoints.down('sm')]: {
      width: '35%',
      height: '10%',
    },
  },
  recordRecs: {
    width: '30%',
    margin: '1%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  recHeader: {
    borderBottom: '2px solid white',
    textAlign: 'center',
  },
}))

const config = {
  bucketName: 'leagueday-prod-images',
  dirName: 'uploads',
  region: 'us-east-1',
  accessKeyId: 'AKIA2NEES72FJV4VO343',
  secretAccessKey: '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',
}
const baseId = 'appXoertP1WJjd4TQ'
const apiKey = 'keymd23kpZ12EriVi'
const base = new Airtable({ apiKey }).base(baseId)

const UploadAudiocast = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { userData, setUserId } = useContext(UserStateContext)
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
  })
  const [selectedChannel, setSelectedChannel] = useState()
  const [audiocast, setAudiocast] = useState()
  const [thumbnail, setThumbnail] = useState()
  const user = useSelector(selectors.getUser)
  useEffect(() => {
    setUserId(user.id)
  }, [user])

  const currentUserId = userData?.id

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleAudioUpload = e => {
    const file = e.target.files[0]
    console.log(file)
    uploadFile(file, config)
      .then(res => {
        console.log(res.location)
        setAudiocast(res.location)
      })
      .catch(err => console.log(err))
      console.log(audiocast)
  }

  const handleImageUpload = e => {
    const file = e.target.files[0]
    uploadFile(file, config).then(res => {
      console.log(res.location)
      setThumbnail(res.location)
    })
  }

  const handleSubmit = () => {
    base('UserAudiocasts').create(
      [
        {
          fields: {
            title: formValues.title,
            user: [currentUserId],
            thumbnail: thumbnail,
            playbackUrl: audiocast,
            channelTag: selectedChannel,
            description: formValues.description,
            creatorImg: userData?.fields?.image
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err)
          return
        }
        records.forEach(function (record) {
          console.log('created new myList entry  ', record)
          getCreatorData()
        })
        dispatch(actions.pushHistory(`/profile/${user?.id}`))
      }
    )
  }

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
  }

  console.log('channel tag  ', selectedChannel)

  return (
    <BasicLayout>
      <div className={classes.wrapper}>
        <div className={classes.inputs}>
          <h1>Upload Audiocast</h1>

          <TextField
            label="Title of your audiocast"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            className={classes.text}
          />
          <TextField
            label="Description of your audiocast"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            className={classes.text}
          />
          <h4>Select Channel to upload Audiocast</h4>
          <Select
            options={options}
            className={classes.select}
            styles={customStyles}
            onChange={val => setSelectedChannel(val.value)}
          />
          <h4>Upload Audiocast Thumbnail</h4>
          <input
            aria-label="Select a thumbnail to upload"
            type="file"
            name="image"
            onChange={handleImageUpload}
          />

          <h4>Upload .mp3 file</h4>
          <input
            aria-label="Select an .mp3 file to upload"
            accept="audio/MPEG"
            type="file"
            onChange={handleAudioUpload}
          />

          <Button className={classes.submitBtn} onClick={handleSubmit}>
            Submit Audiocast
          </Button>
        </div>
        <div className={classes.recordRecs}>
          <h2 className={classes.recHeader}>Recording Reccomendations</h2>
            <p>PC & Mac OS: OBS (<a href="https://obsproject.com/download" target="_blank" style={{ color: 'blue' }}>Download here</a>)</p>
            <p>iOS Mobile: Voice Memos app</p>
            <p>Android Mobile: Voice Recorder (<a href="https://play.google.com/store/apps/details?id=com.media.bestrecorder.audiorecorder&hl=en_US&gl=US" target="_blank" style={{ color: 'blue' }}>Download here</a>) </p>
        </div>
      </div>
    </BasicLayout>
  )
}

export default UploadAudiocast
