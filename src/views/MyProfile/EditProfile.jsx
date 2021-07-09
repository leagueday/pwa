import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Icon, TextField, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import 'react-h5-audio-player/lib/styles.css'
import { ToastContainer, toast } from 'react-toastify'
import { selectors, actions } from '../../store'
import useChannels from '../../api/useChannels'
import { colors } from '../../styling'
import BasicLayout from '../BasicLayout'
import Loading from '../Loading'
import { addScrollStyle } from '../util'
import TitleBar from './TitleBar'
import useAirTable from '../../api/useAirtable'
import blue from '@material-ui/core/colors/blue'
import { uploadFile } from 'react-s3'
import('buffer').then(({ Buffer }) => {
  global.Buffer = Buffer
})

const primaryColor = colors.magenta
;('use strict')
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

const EditProfile = props => {
  const dispatch = useDispatch()
  const channels = useChannels().list
  const [currentUserGames, setCurrentUserGames] = useState([])
  const [profileInfo, setProfileInfo] = useState()
  const { data: userCreds } = useAirTable('appXoertP1WJjd4TQ', 'UserProfile')
  const { data: userGames } = useAirTable('appXoertP1WJjd4TQ', 'UserGames')
  const [image, setimage] = useState()
  const [heroImg, setHeroImg] = useState()

  const getUserById = () => {
    const currentUserGames = userGames?.filter(
      item => item.fields.userId === user.id
    )
    setCurrentUserGames(
      currentUserGames?.shift()?.fields?.channelName?.split(',')
    )
    
  }

  useEffect(() => {
    getUserById()
  }, [userCreds, userGames])

  const [state, setFile] = useState({
    mainState: 'initial',
    imageUploaded: 0,
    selectedFile: null,
    fileupload: null,
    profilePic: null,
    heroImg: heroImg,
    selectedFileError: '',
    photoError: '',
    image: image,
  })

  useEffect(() => {
    setimage(profileInfo?.fields?.image)
    setHeroImg(profileInfo?.fields?.heroImg)
    setFile({
      mainState: 'initial',
      imageUploaded: 0,
      selectedFile: null,
      fileupload: null,
      profilePic: null,
      heroImg: heroImg,
      selectedFileError: '',
      photoError: '',
      image: image,
    })
  }, [profileInfo])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  const [formInput, setFormInput] = useState({
    name: '',
    nameError: '',
    description: '',
    descriptionError: '',
    facebookUrl: '',
    TwitterUrl: '',
    InstagramUrl: '',
    TwitchUrl: '',
    userChannelImage: '',
  })

  const [userChannelnput, setuserChannelInput] = useState({
    userChannelName: '',
    userChannelImageSaved: '',
    streamKey: '',
    liveStreamId: '',
  })

  const [selectChannel, setselectChannel] = useState([])
  const [context, setContext] = useState([{ value: null }])
  const [saveChannelImage, setsaveChannelImage] = useState('')
  const [contextvalue, setcontextvalue] = useState([])
  const [userId, setuserId] = useState('')

  const [channelId, setChannelId] = useState('recO33VCPMOJ6yWju')
  const [channelTag, setChannelTag] = useState([])
  const user = useSelector(selectors.getUser)
  useEffect(() => {
    getuserChannelData()
    getProfileData()
  }, [])

  const getProfileData = async () => {
    const baseId = 'appXoertP1WJjd4TQ'
    const userId = user['id']
    let fetchSearch = `?filterByFormula=({userId}=${JSON.stringify(userId)})`

    fetch('/.netlify/functions/airtable-getprofile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `${baseId}/UserProfile${fetchSearch}` }),
    })
      .then(response => response.json())
      .then(function (response) {
        setProfileInfo(response.records[0])
        console.log('user info  ', profileInfo)
        if (response.records[0].fields) {
          setFormInput({
            ...formInput,
            name: response.records[0].fields.name,
            description: response.records[0].fields.description,
            facebookUrl: response.records[0].fields.FacebookUrl,
            TwitterUrl: response.records[0].fields.TwitterUrl,
            InstagramUrl: response.records[0].fields.InstagramUrl,
            TwitchUrl: response.records[0].fields.TwitchUrl,
          })
          setuserChannelInput({
            ...userChannelnput,
            userChannelName: response.records[0].fields.userChannel,
            userChannelImageSaved: response.records[0].fields.channelImage,
            streamKey: response.records[0].fields.streamKey,
            liveStreamId: response.records[0].fields.liveStreamId,
          })
          setuserId(response.records[0].id)
          let contextUpdate = [...context]
          contextUpdate['value'] = response.records[0].fields.MyContext.split(
            ','
          )
          setcontextvalue(response.records[0].fields.MyContext.split(','))
          setContext(contextUpdate)
        }
      })
      .catch(error => {
        console.log('error while data fetching', error)
      })
  }

  const getuserChannelData = async () => {
    const baseId = 'appXoertP1WJjd4TQ'
    const userId = user['id']
    let fetchSearch = `?filterByFormula=({userId}=${JSON.stringify(userId)})`
    fetch('/.netlify/functions/airtable-getprofile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `${baseId}/UserGames?${fetchSearch}` }),
    })
      .then(response => response.json())
      .then(function (response) {
        setselectChannel(response.records[0].fields.channelName.split(','))
        console.log('channel id function ', response.records[0])
        setChannelId(response.records[0].id)
      })
      .catch(error => {
        console.log('error while data fetching', error)
      })
  }

  const config = {
    bucketName: 'leagueday-prod-images',
    dirName: 'uploads',
    region: 'us-east-1',
    accessKeyId: 'AKIA2NEES72FJV4VO343',
    secretAccessKey: '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',
  }

  const handleUploadClick = event => {
    const file = event.target.files[0]
    uploadFile(file, config)
      .then(data => {
        setimage(data['location'])
        console.log('datafile', JSON.stringify(data))
      })
      .catch(err => console.error(err))

    setFile({
      ...state,
      mainState: 'uploaded',
      image: URL.createObjectURL(file),
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
    reader.readAsDataURL(file)
    setimage(file)
  }

  const handleHeroImg = e => {
    const file = e.target.files[0]
    uploadFile(file, config)
      .then(data => {
        setHeroImg(data['location'])
        console.log('datafile', JSON.stringify(data))
      })
      .catch(err => console.error(err))
    setFile({
      ...state,
      mainState: 'uploaded',
      selectedHero: URL.createObjectURL(file),
      imageUploaded: 1,
      photoError: '',
    })

    const reader = new FileReader()
    reader.onloadend = function (e) {
      setFile({
        ...state,
        selectedHero: [reader.result],
        heroUpload: [reader.result],
        photoError: '',
      })
    }
    reader.readAsDataURL(file)
    setHeroImg(file)
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
        console.log('datafile', JSON.stringify(data))
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

    return formIsValid
  }

  const onChannelChanged = (e, channelFieldKey, tag) => {
    const { value, checked } = e.target
    console.log('jjasfn  ', value, checked)
    let channelSelect = value[channelFieldKey]
    channelSelect = e.target.value
    let datasaved = selectChannel
    let datasavedFortag = channelTag
    if (checked) {
      datasaved.push(value)
    } else if (!checked) {
      datasaved.pop(value)
    } else {
      let index = datasaved.indexOf(value)
      let dataTagIndex = datasavedFortag.indexOf(tag['tag'].toLowerCase())
      datasaved.splice(index, 1)
      datasavedFortag.splice(tag['tag'], 1)
    }
    datasaved = [...new Set(datasaved)]
    setselectChannel(datasaved)
    setChannelTag(datasavedFortag)
  }

  const classes = useStyles({ primaryColor })
  const userName = user?.user_metadata?.full_name

  const submit = evt => {
    evt.preventDefault()
    return sleep(3).then(() => {
      if (validateForm()) {
        let data = {
          records: [
            {
              id: userId,
              fields: {
                name: formInput.name,
                description: formInput.description,
                image: image,
                heroImg: heroImg,
                date: new Date(),
                userId: user.id,
                email: user.email,
                TwitterUrl: formInput.TwitterUrl,
                TwitchUrl: formInput.TwitchUrl,
                MyContext: contextvalue.toString(),
                userChannel: userChannelnput.userChannelName,
                userChannelTag: userChannelnput?.userChannelName
                  ?.toLowerCase()
                  .replace(/\s/g, ''),
                channelImage: saveChannelImage
                  ? saveChannelImage
                  : userChannelnput.userChannelImageSaved,
                rtmpLink: 'rtmps://global-live.mux.com:443/app',
                liveStreamId: userChannelnput.liveStreamId,
                streamKey: userChannelnput.streamKey,
                UserList: !!profileInfo.fields.UserList ? profileInfo.fields.UserList : [],
                profileCreated: 'yes',
              },
            },
          ],
        }
        const baseId = 'appXoertP1WJjd4TQ'
        fetch('/.netlify/functions/airtable-update', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: `${baseId}/UserProfile`, body: data }),
        })
          .then(response => response.json())
          .then(function (response) {
            setimage('')
          })
          .catch(error => {
            console.log('error while data fetching', error.type)
          })
        savedUserChannel()
        dispatch(actions.pushHistory('/myprofile'))
      }
    })
  }

  const savedUserChannel = () => {
    let data = {
      records: [
        {
          id: channelId,
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
    fetch('/.netlify/functions/airtable-update', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `${baseId}/UserGames`, body: data }),
    })
      .then(response => response.json())
      .then(function (response) {})
      .catch(error => {
        console.log('error while data fetching', error.type)
      })
  }

  var dataContext = []
  context['value'] &&
    context['value'].map((item, i, arr) => {
      if (item) {
        dataContext.push(arr[i])
      }
    })

  const handleChanges = (i, e, arr) => {
    let addArr = [...contextvalue]
    addArr[i] = e.target.value
    setcontextvalue(addArr)
  }

  var fieldsArray = []
  dataContext.map((item, index, arr) => {
    fieldsArray.push(
      <div>
        <label>
          <div className="label"></div>
          <TextField
            type="text"
            id="margin-normal"
            defaultValue={item}
            name={item}
            autocomplete="off"
            className={classes.textField}
            helperText="Enter Context description"
            onChange={e => handleChanges(index, e, arr)}
          />
        </label>
      </div>
    )
  })

  return (
    <BasicLayout home>
      <ToastContainer />
      {user ? (
        <div className={classes.homeContent}>
          <React.Suspense fallback={<Loading />}>
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
                  <div className="table_inner">
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th className={classes.leftBar}>
                              <u>Choose preferred games</u>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {channels.map((channel, index) => {
                            let data
                            selectChannel?.map((item, index) => {
                              if (channel.title == item) {
                                data = item
                              }
                              // console.log('checkbox debugging ',channel)
                            })
                            return (
                              <tr key={index}>
                                <td rowSpan={3}>
                                  <input
                                    type="checkbox"
                                    className={classes.radiotext}
                                    onChange={e =>
                                      onChannelChanged(e, index, channel)
                                    }
                                    defaultChecked={data}
                                    value={channel.title}
                                    name="channel"
                                  />
                                  {channel.title}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
                      name="profilePic"
                      multiple
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleUploadClick}
                    />
                    {state.selectedFile ? (
                      <img
                        src={state.selectedFile ? state.selectedFile : ''}
                        width="5%"
                      />
                    ) : (
                      <img
                        src={image ? image : state.selectedFile}
                        width="10%"
                      />
                    )}
                    <br></br>
                    <br></br>
                  </div>
                  <div className={classes.root}>
                    Upload Profile Hero Image: <br></br>
                    <br></br>
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      name="heroImg"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleHeroImg}
                    />
                    {state.selectedHero ? (
                      <img
                        src={state.selectedHero ? state.selectedHero : ''}
                        width="5%"
                      />
                    ) : (
                      <img
                        src={heroImg ? heroImg : state.selectedHero}
                        width="10%"
                      />
                    )}
                    <br></br>
                    <br></br>
                  </div>
                  <Fragment>
                    <br></br>
                    <label for="My Context">
                      <u>Link Your Socials</u>
                    </label>
                    <br></br>
                    <br></br>
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
                      value={userChannelnput.userChannelName}
                      defaultValue={userChannelnput.userChannelName}
                      className={classes.textField}
                      helperText="Enter Your channel Name"
                      onChange={e =>
                        setuserChannelInput({
                          ...userChannelnput,
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
                      {formInput.userChannelImage ? (
                        <img
                          src={URL.createObjectURL(formInput.userChannelImage)}
                          width="5%"
                        />
                      ) : (
                        <img
                          src={
                            userChannelnput.userChannelImageSaved
                              ? userChannelnput.userChannelImageSaved
                              : ''
                          }
                          width="5%"
                        />
                      )}
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
                    Update Profile
                  </Button>
                </form>
              </Paper>
            </div>
          </React.Suspense>
        </div>
      ) : (
        (window.location.href = '/')
      )}
    </BasicLayout>
  )
}

export default EditProfile
