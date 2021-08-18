import React,{ useReducer } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import 'react-h5-audio-player/lib/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import useFacets from '../../api/useFacets'
import { selectors,actions } from '../../store'
import { colors } from '../../styling'
import BasicLayout from '../BasicLayout'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import Loading from '../Loading'
import { addScrollStyle } from '../util'
import TitleBar from './TitleBar'
import { uploadFile } from 'react-s3';
import('buffer').then(({Buffer}) => {global.Buffer = Buffer;})
const ChannelCategories = React.lazy(() => import('../ChannelCategories'))

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
    margin :"auto",
     marginLeft:"10%",
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    textAlign:"center"
  },
  iconSmall: {
    fontSize: 20
  },
  root: {
    padding: theme.spacing(3, 2)
  },
  input: {
    display: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  }
}))

const GoLiveData = (props) => {
  const [state,setFile] = React.useState({
    mainState: "initial",
    imageUploaded: 0,
    selectedFile: null,
    selectedFileError:"",
    photoError:"",
    image:""
  });
  
  const [image,setimage]=React.useState();
  const [disable,setdisable]=React.useState(true);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const facetedPodcasts = useFacets('Home')
  const [formInput, setFormInput] = React.useState(
    {
      title: "",
      description: "",
      thumbnail:'',
      titleError:"",
      descriptionError:"",
    }
  );
  
  const config = {
    bucketName:"leagueday-prod-images",
    dirName:"uploads",
    region:'us-east-1',
    accessKeyId:"AKIA2NEES72FJV4VO343",
    secretAccessKey:"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",
  };
  
 const handleUploadClick = event => {
    var file = event.target.files[0];
    setFile({
      ...state,
      mainState: "uploaded",
      selectedFile: URL.createObjectURL(file),
      imageUploaded: 1,
      photoError:""
    });
    const reader = new FileReader();
    reader.onloadend = function(e) {
      setFile({
        ...state,
        selectedFile: [reader.result],
        photoError:""
    })
    }
    reader.readAsDataURL(file)
    return sleep(2).then(() => {
      uploadFile(file, config)
                .then(data => {
                  setimage(data['location'])
                  setdisable(false)                  
              })
                .catch(err => {
                  setdisable(false)
                  console.error(err)})
      })
  };
  //console.log("onloaded",image)
  // const handleInput = evt => {
  //   const name = evt.target.name;
  //   const newValue = evt.target.value;
  //   setFormInput({ [name]: newValue });
  // };
  const validateForm=()=>{
    let formIsValid = true;
    if (formInput.title == "" || formInput.title == null ||!formInput.title ) {
      formIsValid = false;
      formInput.titleError = "Please Enter Title";
    }
    if (formInput.description == "" || formInput.description == null || !formInput.description) {
      formIsValid = false;
      formInput.descriptionError = "Please Enter Description";
    }
    if (!state.selectedFile || state.selectedFile.length==null ) {
      formIsValid = false;
      state.photoError = "Please Add Thumbnail";
    }
    return formIsValid;
  }

  const dispatch = useDispatch()
  const submit = (evt) => {
    evt.preventDefault()
    //console.log("message fired",evt)
    return sleep(100).then(() => {
    if(validateForm()){
    //console.log("title & descridption addedd")
    localStorage.setItem("title",formInput['title'])
    localStorage.setItem("description",formInput['description'])
    localStorage.setItem('channelImage',image)
    localStorage.setItem('file',image)
    dispatch(actions.pushHistory('/preview'))
    }
      })
}
  const classes = useStyles({ primaryColor })
  const user = useSelector(selectors.getUser)
  const userName = user?.user_metadata?.full_name

  return (
    <BasicLayout home>
      <ToastContainer/>
      {user ?(
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

        <form  onSubmit={submit} >
          <TextField
            label="Title (Max 27 Characters)"
            id="margin-normal"
            name="title"
            value={formInput.title}
            defaultValue={formInput.title}
            className={classes.textField}
            helperText="Enter your Title"
            inputProps={{ maxLength: 27 }}
            onChange={(e) =>
              setFormInput({
                ...formInput,
                title: e.target.value,
                titleError: "",
              })
            }
          />
          <br/>
             {formInput.titleError.length > 0 && (
              <span style={{ color: "red" }}>
              {formInput.titleError}
              </span>
            )}
            <br/>
            <br/>
          <TextField
            label="Description (Max 27 Characters)"
            id="margin-normal"
            name="description"
            value={formInput.description}
            defaultValue={formInput.description}
            className={classes.textField}
            helperText="Enter Your Description"
            inputProps={{ maxLength: 27 }}
            onChange={(e) =>
              setFormInput({
                ...formInput,
                description: e.target.value,
                descriptionError: "",
              })
            }
          />
          <br/>
            {formInput.descriptionError.length > 0 && (
              <span style={{ color: "red" }}>
              {formInput.descriptionError}
              </span>
            )}
          <br/>
          <br/>
          Add Thumbnail:  <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleUploadClick}
            />
              <br/>
            {state.photoError.length > 0 && (
              <span style={{ color: "red" }}>
              {state.photoError}
              </span>
            )}
            <br></br>
            <br></br>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={disable}
          >
            Save & Preview
          </Button>
        </form>
      </Paper>
      </div>
    </div>
         ):(window.location.href='/')}
    </BasicLayout>
  )
}

export default GoLiveData
