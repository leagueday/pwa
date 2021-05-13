import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import useFacets from '../../api/useFacets'
import { actions, selectors } from '../../store'
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
  button: {
    margin: theme.spacing(1),
    marginLeft:"30%"
  },
  img:{
    maxWidth:"50%",
    height:"auto"
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  listng_user_info:{
  display: "inline-block",
    float: "left",
    width: "72%",
    marginLeft: "60px",
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

const PreviewPage = () => {
  const facetedPodcasts = useFacets('Home')
  const classes = useStyles({ primaryColor })

  const user = useSelector(selectors.getUser)
  const userName = user?.user_metadata?.full_name
  let image=localStorage.getItem('image')
  const dispatch=useDispatch()
  const channeldestribution=()=>{
      console.log("channnallist")
      dispatch(actions.pushHistory('/channelist'))
  }
  return (
    <BasicLayout home>
        {user ?(
      <div className={classes.homeContent}>
      <TitleBar
          className={classes.titleBar}
          primaryColor={primaryColor}
          text={userName ? `Welcome back, ${userName}!` : 'Home'}
        />
        <div className={classes.primaryStripe} />
        <div className={classes.listng_user_info}>
             <ul>
                <li>
                <p>Thumbnail:</p>
                <img className={classes.img} src={image?image:""}/>
             <h5>{ }</h5>
                </li>
                <li>
              <p>Title</p>
             <h5>{localStorage.getItem('title') }</h5>
                </li>
                <li>
              <p>Description</p>
             <h5>{localStorage.getItem('description') }</h5>
                </li>
            </ul>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={channeldestribution}
            className={classes.button}
          >
            Publish
          </Button>                            
        </div>
      </div>
        ):(window.location.href='/')}
    </BasicLayout>
  )
}

export default PreviewPage
