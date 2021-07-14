import React, { useState, useEffect, useRef, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Icon, TextField, Paper, Typography } from '@material-ui/core'
import { UserStateContext } from '../../store/stateProviders/userState'
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
import CameraAltIcon from '@material-ui/icons/CameraAlt'

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
      overflowY: 'auto',
      overflowX: 'hidden',
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
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: 300,
    },
  },
  root: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    padding: theme.spacing(3, 2),
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
    color: 'white',
    margin: 10,
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
  },
  radiotext: {
    margin: '10px 10px 0px 0px',
  },
  heroImgCont: {
    position: 'relative',
    height: '50%',
    width: '100%',
  },
  heroImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(75%)',
  },
  heroEdit: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    borderRadius: '50%',
    fontSize: '300%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '280%',
    },
  },
  herBtn: {
    borderRadius: '50%',
    backgroundColor: 'white',
    '&:hover': {
      filter: 'brightness(100)',
    },
  },
  imageUpload: {
    display: 'none',
  },
  profileImgCont: {
    position: 'relative',
    marginLeft: '5%',
    width: '20%',
    height: '50%',
    fontSize: '225%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '180%',
      width: '35%',
    },
  },
  userImg: {
    position: 'absolute',
    top: -50,
    borderRadius: '50%',
    width: '100%',
    zIndex: 0,
    objectFit: 'cover',
    border: '5px solid black',
  },
  profileEdit: {
    color: 'white',
    zIndex: 5,
    position: 'absolute',
    bottom: '15%',
    right: '4%',
    border: '2px solid white',
    borderRadius: '50%',
    padding: 5,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      bottom: '40%',
      right: '3%',
    },
  },
  images: {
    height: '50%',
  },
  userCreds: {
    marginLeft: '10%',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      textAlign: 'center',
    },
  },
  form: {
    margin: 0,
  },
}))

const EditProfile = props => {
  const dispatch = useDispatch()
  const [profileInfo, setProfileInfo] = useState()
  const [image, setimage] = useState()
  const [heroImg, setHeroImg] = useState()
  const { refreshData } = useContext(UserStateContext)
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
  const [formChanged, setFormChanged] = useState(false)
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
    setFormChanged(true)
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
    setFormChanged(true)
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

  const classes = useStyles({ primaryColor })

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
                UserList: !!profileInfo.fields.UserList
                  ? profileInfo.fields.UserList
                  : [],

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
      }
      dispatch(actions.pushHistory('/myprofile'))
      refreshData()
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

  const hiddenHeroInput = useRef(null)
  const hiddenProfileInput = useRef(null)

  const handleHeroClick = e => {
    hiddenHeroInput.current.click()
  }

  const handleProfileClick = e => {
    hiddenProfileInput.current.click()
  }

  return (
    <BasicLayout home>
      <div className={classes.homeContent}>
        <div className={classes.images}>
          <div className={classes.heroImgCont}>
            {state.selectedHero ? (
              <img
                className={classes.heroImg}
                src={state.selectedHero}
                alt="Hero img"
              />
            ) : (
              <img
                className={classes.heroImg}
                src={
                  profileInfo?.fields?.heroImg
                    ? profileInfo?.fields?.heroImg
                    : 'https://fasttechnologies.com/wp-content/uploads/2017/01/placeholder-banner.png'
                }
                alt="Hero img"
              />
            )}
            <div className={classes.heroEdit}>
              <div className={classes.heroBtn} onClick={handleHeroClick}>
                <CameraAltIcon
                  fontSize="inherit"
                  style={{
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '50%',
                    padding: 5,
                    zIndex: 5,
                  }}
                />
              </div>
              <input
                ref={hiddenHeroInput}
                className={classes.imageUpload}
                accept="image/*"
                id="contained-button-file"
                multiple
                name="heroImg"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleHeroImg}
              />
            </div>
          </div>
          <div className={classes.profileImgCont}>
            {state.selectedFile ? (
              <img
                className={classes.userImg}
                src={state.selectedFile}
                alt="Hero img"
              />
            ) : (
              <img
                className={classes.userImg}
                src={
                  profileInfo?.fields?.image
                    ? profileInfo?.fields?.image
                    : 'https://fasttechnologies.com/wp-content/uploads/2017/01/placeholder-banner.png'
                }
                alt="Hero img"
              />
            )}
            <CameraAltIcon
              fontSize="inherit"
              className={classes.profileEdit}
              onClick={handleProfileClick}
            />
            <input
              ref={hiddenProfileInput}
              className={classes.imageUpload}
              accept="image/*"
              id="contained-button-file"
              multiple
              name="heroImg"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleUploadClick}
            />
          </div>
        </div>
        <div className={classes.userCreds}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              {props.formName}
            </Typography>
            <Typography component="p">{props.formDescription}</Typography>
            <form className={classes.form}>
              <h3>Credentials</h3>
              <TextField
                label="Name"
                id="margin-normal"
                name="name"
                value={formInput.name}
                defaultValue={formInput.name}
                className={classes.textField}
                helperText="Enter your Name"
                onChange={e => {
                  setFormChanged(true)
                  setFormInput({
                    ...formInput,
                    name: e.target.value,
                    nameError: '',
                  })
                }}
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
                onChange={e => {
                  setFormChanged(true)
                  setFormInput({
                    ...formInput,
                    description: e.target.value,
                    descriptionError: '',
                  })
                }}
              />
              <br></br>
              <br></br>
              <h3>Socials</h3>
              <br></br>
              {formInput.descriptionError.length > 0 && (
                <span style={{ color: 'red' }}>
                  {formInput.descriptionError}
                </span>
              )}
              <TextField
                label="TwitterUrl"
                id="margin-normal"
                name="TwitterUrl"
                value={formInput.TwitterUrl}
                defaultValue={formInput.TwitterUrl}
                className={classes.textField}
                helperText="Enter Your Twitter url"
                onChange={e => {
                  setFormChanged(true)
                  setFormInput({
                    ...formInput,
                    TwitterUrl: e.target.value,
                  })
                }}
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
                onChange={e => {
                  setFormChanged(true)
                  setFormInput({
                    ...formInput,
                    TwitchUrl: e.target.value,
                  })
                }}
              />
              <br></br>
              <br></br>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={submit}
                disabled={!formChanged}
              >
                Update Profile
              </Button>
            </form>
          </Paper>
        </div>
      </div>
    </BasicLayout>
  )
}

export default EditProfile
