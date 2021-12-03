import React, { useState, useEffect, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, Paper, Typography } from '@material-ui/core';
import { base } from '../..';
import { UserStateContext } from '../../store/stateProviders/userState';
import { makeStyles } from '@mui/styles';
import 'react-h5-audio-player/lib/styles.css';
import { selectors, actions } from '../../store';
import { colors } from '../../styling';
import BasicLayout from '../BasicLayout';
import { addScrollStyle } from '../util';
import { uploadFile } from 'react-s3';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import('buffer').then(({ Buffer }) => {
  global.Buffer = Buffer;
});

const primaryColor = colors.magenta;
('use strict');
const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down('sm')]: {
      height: '150px',
    },
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
    width: '15rem',
    height: '15rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '225%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '180%',
      width: '35%',
      height: '3rem',
    },
  },
  userImg: {
    position: 'absolute',
    top: -50,
    borderRadius: '50%',
    width: '15rem',
    height: '15rem',
    zIndex: 0,
    objectFit: 'cover',
    border: '5px solid black',
    filter: 'brightness(75%)',
    [theme.breakpoints.down('md')]: {
      width: '12rem',
      height: '12rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '8rem',
      height: '8rem',
    },
  },
  profileEdit: {
    color: 'white',
    zIndex: 5,
    position: 'absolute',
    bottom: '60%',
    right: '50%',
    transform: 'translateX(50%)',
    border: '2px solid white',
    borderRadius: '50%',
    padding: 5,
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      bottom: '72%',
    },
    [theme.breakpoints.down('xs')]: {
      bottom: '55%',
    },
  },
  images: {
    background: 'black',
    height: '50%',
    [theme.breakpoints.down('sm')]: {
      height: '200px',
    },
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
}));

const EditProfile = (props) => {
  const dispatch = useDispatch();
  const [image, setimage] = useState();
  const [heroImg, setHeroImg] = useState();
  const { getData } = useContext(UserStateContext);
  const profileInfo = useSelector(selectors.getUserData);
  const [loading, setLoading] = useState(false);

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
  });

  useEffect(() => {
    setimage(profileInfo?.fields?.image);
    setHeroImg(profileInfo?.fields?.heroImg);
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
    });
  }, [profileInfo]);

  const [formInput, setFormInput] = useState({
    name: profileInfo.fields.username ? profileInfo.fields.username : '',
    nameError: '',
    description: profileInfo.fields.description
      ? profileInfo.fields.description
      : '',
    descriptionError: '',
    facebookUrl: '',
    TwitterUrl: profileInfo.fields.TwitterUrl
      ? profileInfo.fields.TwitterUrl
      : '',
    TwitchUrl: profileInfo.fields.TwitchUrl ? profileInfo.fields.TwitchUrl : '',
  });

  const [formChanged, setFormChanged] = useState(false);
  const user = useSelector(selectors.getUser);

  const config = {
    bucketName: 'leagueday-prod-images',
    dirName: 'uploads',
    region: 'us-east-1',
    accessKeyId: 'AKIA2NEES72FJV4VO343',
    secretAccessKey: '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',
  };

  const handleUploadClick = (event) => {
    setFormChanged(true);
    const file = event.target.files[0];
    uploadFile(file, config)
      .then((data) => {
        setimage(data['location']);
        console.log('datafile', JSON.stringify(data));
      })
      .catch((err) => console.error(err));

    setFile({
      ...state,
      mainState: 'uploaded',
      image: URL.createObjectURL(file),
      imageUploaded: 1,
      photoError: '',
    });

    const reader = new FileReader();
    reader.onloadend = function (e) {
      setFile({
        ...state,
        selectedFile: [reader.result],
        fileupload: [reader.result],
        photoError: '',
      });
    };
    reader.readAsDataURL(file);
    setimage(file);
  };

  const handleHeroImg = (e) => {
    setFormChanged(true);
    const file = e.target.files[0];
    uploadFile(file, config)
      .then((data) => {
        setHeroImg(data['location']);
        console.log('datafile', JSON.stringify(data));
      })
      .catch((err) => console.error(err));
    setFile({
      ...state,
      mainState: 'uploaded',
      selectedHero: URL.createObjectURL(file),
      imageUploaded: 1,
      photoError: '',
    });

    const reader = new FileReader();
    reader.onloadend = function (e) {
      setFile({
        ...state,
        selectedHero: [reader.result],
        heroUpload: [reader.result],
        photoError: '',
      });
    };
    reader.readAsDataURL(file);
    setHeroImg(file);
    console.log('hero ', image);
  };
  const classes = useStyles({ primaryColor });

  const submit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    base('UserProfile').update(
      [
        {
          id: profileInfo.id,
          fields: {
            username: formInput.name,
            description: formInput.description,
            image: image,
            heroImg: heroImg,
            date: new Date(),
            userId: user.id,
            email: user.email,
            TwitterUrl: formInput.TwitterUrl,
            TwitchUrl: formInput.TwitchUrl,
            UserList: !!profileInfo.fields.UserList
              ? profileInfo.fields.UserList
              : [],
            UserCreatorsList: !!profileInfo.fields.UserCreatorsList
              ? profileInfo.fields.UserCreatorsList
              : [],
            admin: profileInfo.fields.admin,
            UserAudiocasts: profileInfo.fields.UserAudiocasts,
            profileCreated: 'yes',
            likedAudio: !!profileInfo.fields.likedAudio
              ? profileInfo.fields.likedAudio
              : [],
            ChannelLiveData: !!profileInfo.fields.ChannelLiveData
              ? profileInfo.fields.ChannelLiveData
              : [],
          },
        },
      ],
      function (err, records) {
        console.log('edit profile ', records);
        if (err) {
          console.error(err);
          return;
        }
        setLoading(false);
        dispatch(actions.pushHistory(`/profile/${user.id}`));
        getData();
      }
    );
  };

  const hiddenHeroInput = useRef(null);
  const hiddenProfileInput = useRef(null);

  const handleHeroClick = (e) => {
    hiddenHeroInput.current.click();
  };

  const handleProfileClick = (e) => {
    hiddenProfileInput.current.click();
  };

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
                onChange={(e) => {
                  setFormChanged(true);
                  setFormInput({
                    ...formInput,
                    name: e.target.value,
                    nameError: '',
                  });
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
                onChange={(e) => {
                  setFormChanged(true);
                  setFormInput({
                    ...formInput,
                    description: e.target.value,
                    descriptionError: '',
                  });
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
                label="Twitter Handle"
                id="margin-normal"
                name="TwitterUrl"
                value={formInput.TwitterUrl}
                defaultValue={formInput.TwitterUrl}
                className={classes.textField}
                helperText="Enter Your Twitter Handle"
                onChange={(e) => {
                  setFormChanged(true);
                  setFormInput({
                    ...formInput,
                    TwitterUrl: e.target.value,
                  });
                }}
              />
              <br></br>
              <br></br>
              <TextField
                label="Twitch Handle"
                id="margin-normal"
                name="TwitterUrl"
                value={formInput.TwitchUrl}
                defaultValue={formInput.TwitchUrl}
                className={classes.textField}
                helperText="Enter Your Twitch Handle"
                onChange={(e) => {
                  setFormChanged(true);
                  setFormInput({
                    ...formInput,
                    TwitchUrl: e.target.value,
                  });
                }}
              />
              <br></br>
              <br></br>
              <button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={submit}
                disabled={!formChanged}
              >
                {loading ? 'Loading...' : 'Update Profile'}
              </button>
            </form>
          </Paper>
        </div>
      </div>
    </BasicLayout>
  );
};

export default EditProfile;
