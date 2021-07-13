import React, { useReducer, Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Icon, TextField, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import 'react-h5-audio-player/lib/styles.css'
import { ToastContainer, toast } from 'react-toastify'
import useFacets from '../../api/useFacets'
import { selectors, actions } from '../../store'
import useChannels from '../../api/useChannels'
import { colors } from '../../styling'
import BasicLayout from '../BasicLayout'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import Loading from '../Loading'
import { addScrollStyle } from '../util'
import TitleBar from './TitleBar'
import blue from '@material-ui/core/colors/blue'
import { uploadFile } from 'react-s3'
import Fat from '../SideNav/Fat'

import('buffer').then(({ Buffer }) => {
  global.Buffer = Buffer
})
const primaryColor = colors.magenta

const useStyles = makeStyles(theme => ({
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
  podcastTiles: {
    height: '100%',
    minHeight: 0,
  },
  primaryStripe: ({ primaryColor }) => ({
    backgroundColor: primaryColor,
    height: '0.25em',
    width: '100%',
  }),
  titleBar: {
    marginBottom: '0.25em',
  },
  button: {
    margin: 'auto',
    marginLeft: '10%',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  leftBar: {
    float: 'left',
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    textAlign: 'center',
  },
  iconSmall: {
    fontSize: 20,
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  radio: {
    background: 'orange',
    cursor: 'pointer',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  root: {
    // alignSelf: 'center',
    // justifyContent: "center",
    // alignItems: "center",
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  button: {
    color: blue[900],
    margin: 10,
  },
  radiotext: {
    margin: '10px 10px 0px 0px',
  },
}))

const CreateProfile = props => {
  const channels = useChannels().list
  const [state, setFile] = React.useState({
    mainState: 'initial',
    imageUploaded: 0,
    selectedFile: null,
    fileupload: null,
    selectedFileError: '',
    photoError: '',
    image: '',
  })
  const [image, setimage] = React.useState('')
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  const [formInput, setFormInput] = React.useState({
    name: '',
    nameError: '',
    description: '',
    descriptionError: '',
    facebookUrl: '',
    TwitterUrl: '',
    InstagramUrl: '',
    TwitchUrl: '',
    userChannelName: '',
    userChannelImage: '',
  })
  const [selectChannel, setselectChannel] = useState([])
  const [channelTag, setChannelTag] = useState([])
  const [saveChannelImage, setsaveChannelImage] = useState('')
  const [rtmpLink, setrtmpLink] = useState('')
  const [streamKey, setsreamKey] = useState('')
  const [liveStreamId, setliveStreamId] = useState('')
  const [context, setContext] = React.useState([{ value: null }])
  const [saveContext, setsaveContext] = React.useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInput = React.useRef()

  const config = {
    bucketName: 'leagueday-prod-images',
    dirName: 'uploads',
    region: 'us-east-1',
    accessKeyId: 'AKIA2NEES72FJV4VO343',
    secretAccessKey: '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',
  }

  const handleUploadClick = async event => {
    var filesSaved = event.target.files[0]
    setSelectedFile(event.target.files[0])
    let newFileName = filesSaved.name.replace(/\..+$/, '')
    uploadFile(filesSaved, config)
      .then(data => {
        setimage(data['location'])
      })
      .catch(err => console.error(err))

    setFile({
      ...state,
      mainState: 'uploaded',
      selectedFile: URL.createObjectURL(event.target.files[0]),
      imageUploaded: 1,
      photoError: '',
    })

    const reader = new FileReader()
    reader.onloadend = function (e) {
      setFile({
        ...state,
        selectedFile: [reader.result],
        fileupload: [reader.result],
        photoError: '',
      })
    }
    reader.readAsDataURL(event.target.files[0])
  }

  const handleChannelImage = async event => {
    var channelImageSaved = event.target.files[0]
    setFormInput({
      ...formInput,
      userChannelImage: channelImageSaved,
    })
    let newFileName = channelImageSaved.name.replace(/\..+$/, '')
    uploadFile(channelImageSaved, config)
      .then(data => {
        setsaveChannelImage(data['location'])
      })
      .catch(err => console.error(err))
  }

  const validateForm = () => {
    let formIsValid = true
    if (
      formInput.name === '' ||
      formInput.name === undefined ||
      formInput.name === null ||
      !formInput.name
    ) {
      formIsValid = false
      formInput.nameError = 'Please Enter Title'
    }
    if (
      formInput.description === '' ||
      formInput.description === undefined ||
      formInput.description === null ||
      !formInput.description
    ) {
      formIsValid = false
      formInput.descriptionError = 'Please Enter Description'
    }
    // if (!state.selectedFile || state.selectedFile.length==null ) {
    //   formIsValid = false;
    //   state.photoError = "Please Upload picture";
    // }

    return formIsValid
  }

  const dispatch = useDispatch()
  function handleAdd() {
    const values = [...context]
    values.push({ value: null })
    setContext(values)
  }

  function handleChange(i, event) {
    const values = [...context]
    values[i].value = event.target.value
    setContext(values)
    var arr = []
    for (var i = 0; i < context.length; i++) {
      arr.push(context[i].value)
    }
    setsaveContext(arr)
  }

  const onChannelChanged = (e, channelFieldKey, tag) => {
    const { value, checked } = e.target
    let channelSelect = value[channelFieldKey]
    channelSelect = e.target.value
    let datasaved = selectChannel
    let datasavedFortag = channelTag
    if (checked) {
      datasaved.push(value)
      datasavedFortag.push(tag['tag'].toLowerCase())
    } else {
      let index = datasaved.indexOf(value)
      let dataTagIndex = datasavedFortag.indexOf(tag['tag'])
      datasaved.splice(index, 1)
      datasavedFortag.splice(tag['tag'], 1)
    }
    setselectChannel(datasaved)
    setChannelTag(datasavedFortag)
  }

  const classes = useStyles({ primaryColor })
  const user = useSelector(selectors.getUser)
  const userName = user?.user_metadata?.full_name

  const submit = evt => {
    evt.preventDefault()
    muxChannel()
    return sleep(3000).then(() => {
      if (validateForm()) {
        if (
          localStorage.getItem('channelStrkey') &&
          localStorage.getItem('channelStrId')
        ) {
          let data = {
            records: [
              {
                fields: {
                  name: formInput.name,
                  description: formInput.description,
                  image: image,
                  date: new Date(),
                  userId: user.id,
                  email: user.email,
                  //FacebookUrl:formInput.facebookUrl,
                  TwitterUrl: formInput.TwitterUrl,
                  //InstagramUrl:formInput.InstagramUrl,
                  TwitchUrl: formInput.TwitchUrl,
                  MyContext: saveContext.toString(),
                  userChannel: formInput.userChannelName,
                  channelImage: saveChannelImage,
                  rtmpLink: 'rtmps://global-live.mux.com:443/app',
                  streamKey: localStorage.getItem('channelStrkey'),
                  userChannelTag: formInput.userChannelName
                    .toLowerCase()
                    .replace(/\s/g, ''),
                  liveStreamId: localStorage.getItem('channelStrId'),
                  profileCreated: 'yes',
                },
              },
            ],
          }

          const baseId = 'appXoertP1WJjd4TQ'
          fetch('/.netlify/functions/airtable-proxy', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: `${baseId}/UserProfile`, body: data }),
          })
            .then(response => response.json())
            .then(function (response) {
              setFormInput({
                ...formInput,
                name: '',
                description: '',
                descriptionError: '',
                nameError: '',
              })
              setFile({
                ...state,
                selectedFile: '',
                fileupload: '',
                photoError: '',
              })
              localStorage.setItem('name', formInput.name)
            })
            .catch(error => {
              console.log('error while data fetching', error.type)
            })
          savedUserChannel()
          dispatch(actions.pushHistory('/myprofile'))
        }
      }
    })
  }

  const muxChannel = () => {
    fetch('/.netlify/functions/mux-livestream', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `video/v1/live-streams` }),
    })
      .then(response => response.json())
      .then(function (livestreamData) {
        setsreamKey(livestreamData.data['stream_key'])
        localStorage.setItem('channelStrkey', livestreamData.data['stream_key'])
        localStorage.setItem('channelStrId', livestreamData.data['id'])
        setliveStreamId(livestreamData.data['id'])
      })
      .catch(error => {
        toast.error(error.type)
      })
  }

  const savedUserChannel = () => {
    let data = {
      records: [
        {
          fields: {
            channelName: selectChannel.toString(),
            date: new Date(),
            userId: user.id,
            channelTag: channelTag.toString(),
          },
        },
      ],
    }

    const baseId = 'appXoertP1WJjd4TQ'
    fetch('/.netlify/functions/airtable-proxy', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `${baseId}/UserGames`, body: data }),
    })
      .then(response => response.json())
      .then(function (response) {
        setContext('')
        setChannelTag('')
        setselectChannel('')
        localStorage.setItem('userChannel', formInput.userChannelName)
      })
      .catch(error => {
        console.log('error while data fetching', error.type)
      })
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
          <div>
            <Paper className={classes.root}>
              <Typography variant="h5" component="h3">
                {props.formName}
              </Typography>
              <Typography component="p">{props.formDescription}</Typography>

              <form onSubmit={submit}>
                <br></br>
                <TextField
                  label="Name"
                  id="margin-normal"
                  name="name"
                  value={formInput.name}
                  defaultValue={formInput.name}
                  className={classes.textField}
                  helperText="Enter your Name"
                  onChange={e =>
                    setFormInput({
                      ...formInput,
                      name: e.target.value,
                      nameError: '',
                    })
                  }
                />
                <br />
                {formInput.nameError.length > 0 && (
                  <span style={{ color: 'red' }}>{formInput.nameError}</span>
                )}
                <br />
                <TextField
                  label="Description"
                  id="margin-normal"
                  name="description"
                  value={formInput.description}
                  defaultValue={formInput.description}
                  className={classes.textField}
                  helperText="Enter Your Description"
                  onChange={e =>
                    setFormInput({
                      ...formInput,
                      description: e.target.value,
                      descriptionError: '',
                    })
                  }
                />
                <br></br>
                {formInput.descriptionError.length > 0 && (
                  <span style={{ color: 'red' }}>
                    {formInput.descriptionError}
                  </span>
                )}
                <br />
                <br />
                <br />
                <br />
                <br></br>
                <br></br>
                <div className={classes.root}>
                  Upload Profile Image: <br></br>
                  <br></br>
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleUploadClick}
                  />
                  {state.selectedFile && (
                    <img src={state.selectedFile} width="5%" />
                  )}
                  <br></br>
                  <br></br>
                </div>
                <Fragment>
                  <label for="My Context">About Me</label>
                  {'  '} {'  '}
                  <button type="button" onClick={() => handleAdd()}>
                    +
                  </button>
                  {context.map((contexts, idx) => {
                    return (
                      <div key={`${contexts}-${idx}`}>
                        <br></br>
                        <TextField
                          type="text"
                          label="Enter Context description"
                          onChange={e => handleChange(idx, e)}
                        />
                      </div>
                    )
                  })}
                  <br></br>
                  <label for="My Context">
                    <u>Link Your Socials</u>
                  </label>
                  <br></br>
                  <br></br>
                  {/* <TextField
            label="FacebookUrl"
            id="margin-normal"
            name="facebookUrl"
            value={formInput.facebookUrl}
            defaultValue={formInput.facebookUrl}
            className={classes.textField}
            helperText="Enter Your facebook url"
            onChange={(e) =>
              setFormInput({
                ...formInput,
                facebookUrl: e.target.value,
              })
            }
          /> */}
                  {/* <br></br>
          <br></br> */}
                  <TextField
                    label="TwitterUrl"
                    id="margin-normal"
                    name="TwitterUrl"
                    value={formInput.TwitterUrl}
                    defaultValue={formInput.TwitterUrl}
                    className={classes.textField}
                    helperText="Enter Your Twitter url"
                    onChange={e =>
                      setFormInput({
                        ...formInput,
                        TwitterUrl: e.target.value,
                      })
                    }
                  />
                  {/* <br></br>
          <br></br> */}
                  {/* <TextField
            label="InstagramUrl"
            id="margin-normal"
            name="TwitterUrl"
            value={formInput.InstagramUrl}
            defaultValue={formInput.InstagramUrl}
            className={classes.textField}
            helperText="Enter Your Instagram url"
            onChange={(e) =>
              setFormInput({
                ...formInput,
                InstagramUrl: e.target.value,
              })
            }
          /> */}
                  <br></br>
                  <br></br>
                  <TextField
                    label="TwitchUrl"
                    id="margin-normal"
                    name="TwitterUrl"
                    value={formInput.TwitchUrl}
                    defaultValue={formInput.TwitchUrl}
                    className={classes.textField}
                    helperText="Enter Your Twitch url"
                    onChange={e =>
                      setFormInput({
                        ...formInput,
                        TwitchUrl: e.target.value,
                      })
                    }
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    label="ChannelName"
                    id="margin-normal"
                    name="channelName"
                    value={formInput.userChannelName}
                    defaultValue={formInput.userChannelName}
                    className={classes.textField}
                    helperText="Enter Your channel Name"
                    onChange={e =>
                      setFormInput({
                        ...formInput,
                        userChannelName: e.target.value,
                      })
                    }
                  />
                  <br></br>
                  <br></br>
                  <div className={classes.root}>
                    Upload Channel Image: <br></br>
                    <br></br>
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleChannelImage}
                    />
                    {formInput.userChannelImage && (
                      <img
                        src={URL.createObjectURL(formInput.userChannelImage)}
                        width="5%"
                      />
                    )}
                    <br></br>
                    <br></br>
                  </div>
                  <br></br>
                  <br></br>
                </Fragment>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Submit
                </Button>
              </form>
            </Paper>
          </div>
        </div>
      ) : (
        (window.location.href = '/')
      )}
    </BasicLayout>
  )
}

export default CreateProfile
