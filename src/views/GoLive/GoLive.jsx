import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFacets from '../../api/useFacets'
import { actions, selectors } from '../../store'
import { useDispatch } from "react-redux";
import { colors } from '../../styling'
import BasicLayout from '../BasicLayout'
import FacetedPodcastTiles from '../FacetedPodcastTiles'
import Loading from '../Loading'
import { addScrollStyle } from '../util'
import TitleBar from './TitleBar'
import GoLiveData from './GoLiveData';
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
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  },
  heading:{
   marginTop:"2%"
  },
  primaryStripe: ({ primaryColor }) => ({
    backgroundColor: primaryColor,
    height: '0.25em',
    width: '100%',
  }),
  titleBar: {
    marginBottom: '0.25em',
  },
}))

const GoLive = () => {
  const facetedPodcasts = useFacets('Home')
  const classes = useStyles({ primaryColor })
  const [select,setSelect]=useState("");
  const [selectError,setSelectError]=useState("")
  const user = useSelector(selectors.getUser)
  const userName = user?.user_metadata?.full_name
  
  const dispatch = useDispatch()
  function chooseselection(e){
    console.log("value choose",e.target.value)
     setSelect({
       select:e.target.value
     })
  }
  const gotoliveScreen = () =>{
    if(select.length==""|| !select){
      toast.error("Please select OBS")
    }
    else{
      dispatch(actions.pushHistory('/gotolive'))
    }
  }
  return (
    <BasicLayout home>
      <ToastContainer />
      {user ?(
      <div className={classes.homeContent}>
      <TitleBar
          className={classes.titleBar}
          primaryColor={primaryColor}
          text="Go Live"
        />
        <div className={classes.primaryStripe} />
        <div className={classes.podcastTiles}>
        <div onChange={chooseselection}>
        <input className={classes.heading} type="radio" value="USE OBS" name="obs"/> USE OBS 123<br/>
        {/* <input type="radio" value="Record or leagueDay" />Record or leagueDay */}
      </div>
     
      <Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={gotoliveScreen}
      className={classes.button}
          >
            Next
          </Button>
        </div>
      </div>
          ):(window.location.href='/')}
    </BasicLayout>
  )
}

export default GoLive
