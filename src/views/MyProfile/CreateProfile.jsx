import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Icon, TextField, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import 'react-h5-audio-player/lib/styles.css'
import { ToastContainer, toast } from 'react-toastify'
import { selectors, actions } from '../../store'
import { colors } from '../../styling'
import BasicLayout from '../BasicLayout'
import { addScrollStyle } from '../util'
import TitleBar from './TitleBar'
import blue from '@material-ui/core/colors/blue'
import { uploadFile } from 'react-s3'
import Select from 'react-select'
import('buffer').then(({ Buffer }) => {
  global.Buffer = Buffer
})
const primaryColor = colors.magenta

const options = [
  {
    value: 'Pro Caster ',
    label: ' Pro Caster',
  },
  {
    value: 'Amateur Caster ',
    label: ' Amateur Caster',
  },
  {
    value: 'Pro Streamer ',
    label: ' Pro Streamer',
  },
  {
    value: 'Amateur Streamer ',
    label: ' Amateur Streamer',
  },
  {
    value: 'Pro Podcaster ',
    label: ' Pro Podcaster',
  },
  {
    value: 'Amateur Podcaster ',
    label: ' Amateur Podcaster',
  },
]

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
    color: 'white',
    margin: 10,
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
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
  radiotext: {
    margin: '10px 10px 0px 0px',
  },
}))

const CreateProfile = props => {
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
  })
  const [loading, setLoading] = useState(false)
  const [experienceOptions, setExperienceOptions] = useState(options)
  const [selectedCredentials, setSelectedCredentials] = useState([])
  const [context, setContext] = React.useState([{ value: null }])
  const [saveContext, setsaveContext] = React.useState([])
  const [selectedFile, setSelectedFile] = useState(null)

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

  const classes = useStyles({ primaryColor })
  const user = useSelector(selectors.getUser)
  const userName = user?.user_metadata?.full_name

  const submit = evt => {
    console.log('called submit  ')
    evt.preventDefault()
    muxChannel()
    setLoading(true)
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
                  TwitterUrl: formInput.TwitterUrl,
                  TwitchUrl: formInput.TwitchUrl,
                  MyContext: saveContext.toString(),
                  rtmpLink: 'rtmps://global-live.mux.com:443/app',
                  streamKey: localStorage.getItem('channelStrkey'),
                  liveStreamId: localStorage.getItem('channelStrId'),
                  profileCreated: 'yes',
                  credentials: selectedCredentials?.join(),
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
          dispatch(actions.pushHistory('/myprofile'))
        }
      }
      setLoading(false)
    })
  }

  const muxChannel = () => {
    fetch('/.netlify/functions/mux-livestream', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `video/v1/live-streams`, passthrough: "lol" }),
    })
      .then(response => response.json())
      .then(function (livestreamData) {
        localStorage.setItem('channelStrkey', livestreamData.data['stream_key'])
        localStorage.setItem('channelStrId', livestreamData.data['id'])
      })
      .catch(error => {
        toast.error(error.type)
      })
  }

  const handleSelect = e => {
    setSelectedCredentials(
      Array.isArray(e) ? e.map(topping => topping.label) : []
    )
  }

  useEffect(() => {
    if (selectedCredentials?.length === 0) {
      setExperienceOptions(options)
    }
    if (
      selectedCredentials[selectedCredentials.length - 1]?.includes(
        'Pro Caster'
      )
    ) {
      setExperienceOptions(
        experienceOptions?.filter(opt => !opt.label.includes('Amateur Caster'))
      )
    }
    if (
      selectedCredentials[selectedCredentials.length - 1]?.includes(
        'Amateur Caster'
      )
    ) {
      setExperienceOptions(
        experienceOptions?.filter(opt => !opt.label.includes('Pro Caster'))
      )
    }
    if (
      selectedCredentials[selectedCredentials.length - 1]?.includes(
        'Pro Streamer'
      )
    ) {
      setExperienceOptions(
        experienceOptions?.filter(
          opt => !opt.label.includes('Amateur Streamer')
        )
      )
    }
    if (
      selectedCredentials[selectedCredentials.length - 1]?.includes(
        'Amateur Streamer'
      )
    ) {
      setExperienceOptions(
        experienceOptions?.filter(opt => !opt.label.includes('Pro Streamer'))
      )
    }
    if (
      selectedCredentials[selectedCredentials.length - 1]?.includes(
        'Pro Podcaster'
      )
    ) {
      setExperienceOptions(
        experienceOptions?.filter(
          opt => !opt.label.includes('Amateur Podcaster')
        )
      )
    }
    if (
      selectedCredentials[selectedCredentials.length - 1]?.includes(
        'Amateur Podcaster'
      )
    ) {
      setExperienceOptions(
        experienceOptions?.filter(opt => !opt.label.includes('Pro Podcaster'))
      )
    }
  }, [selectedCredentials])

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
                <h3>Select Your Focus Area(s) and Experience:</h3>
                <Select
                  options={experienceOptions}
                  styles={customStyles}
                  onChange={handleSelect}
                  isMulti
                />
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
                </Fragment>
                {loading && <h4>Loading...</h4>}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={loading}
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
