import React, { useState, useEffect, useContext } from 'react'
import { selectors, actions } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { TextField } from '@material-ui/core'
import { getMyList } from '../../api/getUserList'
import { makeStyles } from '@material-ui/core'
import BasicLayout from '../BasicLayout'
import Select from 'react-select'
import Airtable from 'airtable'
import { colors } from '../../styling'
import { addScrollStyle } from '../util'
import { Button } from '@material-ui/core'
import { UserStateContext } from '../../store/stateProviders/userState'
import { uploadFile } from 'react-s3'
const primaryColor = colors.magenta

import('buffer').then(({ Buffer }) => {
  global.Buffer = Buffer
})

const useStyles = makeStyles(theme => ({
  content: () =>
    addScrollStyle(
      primaryColor,
      theme
    )({
      alignItems: 'stretch',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
      background: 'black',
      [theme.breakpoints.down('md')]: {
        minHeight: '1920px',
      },
    }),
  wrapper: {
    marginBottom: '10%',
    width: '100%',
    height: '100%',
    background: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // overflow: 'scroll',
    [theme.breakpoints.down('md')]: {
      marginTop: '10%',
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
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
    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%',
      minHeight: '700px',
    },
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
  },
  recs: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  recordRecs: {
    overflow: 'none',
    width: '35%',
    margin: '1%',
    height: 'auto',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid white',
    padding: '10px',
    minHeight: '300px',
    [theme.breakpoints.up('lg')]: {
      minWidth: '420px',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  recHeader: {
    borderBottom: '2px solid white',
    textAlign: 'center',
    color: colors.green,
  },
  contentRecs: {
    overflow: 'none',
    width: '35%',
    margin: '1%',
    height: 'auto',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid white',
    padding: '10px',
    minHeight: '300px',
    [theme.breakpoints.up('lg')]: {
      minWidth: '420px',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
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
  const [loading, setLoading] = useState(false)
  const [channels, setChannels] = useState([])
  const filteredListRecords = getMyList()
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
    console.log('file ',file)
    setLoading(true)
    uploadFile(e.target.files[0], config)
      .then(res => {
        console.log(res.location)
        setAudiocast(res.location)
        setLoading(false)
      })
      .catch(err => console.log(err))
    console.log(audiocast)
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
            creatorImg: userData?.fields?.image,
            upvotes: 0,
            type: 'audiocast',
            username: userData?.fields?.name
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
      }
    )
    dispatch(actions.pushHistory(`/profile/${user?.id}`))
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
    input: () => ({
      color: 'white'
    })
  }

  return (
    <BasicLayout>
      <div className={classes.content}>
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
              options={filteredListRecords}
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
            {loading && <h2>Loading...</h2>}

            <Button
              className={classes.submitBtn}
              onClick={handleSubmit}
              disabled={loading}
            >
              Submit Audiocast
            </Button>
          </div>
          <div className={classes.recs}>
            <div className={classes.recordRecs}>
              <h2 className={classes.recHeader}>Recording Recommendations</h2>
              <p>
                PC & Mac:{' '}
                <a
                  href="https://obsproject.com/download"
                  target="_blank"
                  style={{ color: 'blue' }}
                >
                  OBS
                </a>{' '}
                or{' '}
                <a
                  href="https://www.audacityteam.org/download/"
                  target="_blank"
                  style={{ color: 'blue' }}
                >
                  Audacity
                </a>{' '}
              </p>
              <p>iOS Mobile: Voice Memos app</p>
              <p>
                Android Mobile:{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.media.bestrecorder.audiorecorder&hl=en_US&gl=US"
                  target="_blank"
                  style={{ color: 'blue' }}
                >
                  Voice Recorder
                </a>{' '}
              </p>
            </div>
            <div className={classes.contentRecs}>
              <h2 className={classes.recHeader}>
                Create with Us! Here's some category recommendations:
              </h2>
              <ol>
                <p>
                  {' '}
                  <span style={{ fontWeight: 900 }}>1.</span> Meta casts: talk
                  meta of your favorite video games
                </p>
                <p>
                  {' '}
                  <span style={{ fontWeight: 900 }}>2.</span> Esports recaps:
                  run recaps of esports events
                </p>
                <p>
                  {' '}
                  <span style={{ fontWeight: 900 }}>3.</span> Play-by-Play
                  coverage: do play-by-play casts of esports matches
                </p>
                <p>
                  {' '}
                  <span style={{ fontWeight: 900 }}>4.</span> Gaming banter:
                  general video gaming convos & banter with friends
                </p>
                <p>
                  {' '}
                  <span style={{ fontWeight: 900 }}>5.</span> Business of
                  gaming/esports: interviews or solos on the biz side
                </p>
                <p>
                  {' '}
                  <span style={{ fontWeight: 900 }}>6.</span> Journalism/news
                  cast: what's going on in the gaming --
                  esports/publishers/releases/reviews
                </p>
                <p>
                  {' '}
                  <span style={{ fontWeight: 900 }}>7.</span> Strategy &
                  coaching: help the world get as good at your favorite games as
                  you are
                </p>
                <p>
                  {' '}
                  <span style={{ fontWeight: 900 }}>8.</span> Gaming music:
                  reduxes of famous gaming tracks
                </p>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}

export default UploadAudiocast
