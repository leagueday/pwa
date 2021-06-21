import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import useFacets from '../../api/useFacets'
import { selectors } from '../../store'
import { colors } from '../../styling'
import BasicLayout from '../BasicLayout'
import { actions } from '../../store'
import Loading from '../Loading'
import BottomBlock from '../BottomBlock'
import IconButton from '@material-ui/core/IconButton'
import { addScrollStyle } from '../util'
import TitleBar from './TitleBar'
import Grid from '@material-ui/core/Grid'
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
  live: {
    fontSize: '95%',
    marginLeft: 'auto',
    position: 'absolute',
    top: 60,
    cursor: 'pointer',
    right: 16,
  },
  root: {
    marginTop: '0%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  primaryStripe: ({ primaryColor }) => ({
    backgroundColor: primaryColor,
    height: '0.25em',
    width: '100%',
  }),
  titleBar: {
    marginBottom: '0.25em',
  },
  name: {
    marginTop: '0%',
    top: '0',
    position: 'relative',
  },
  scroller: addScrollStyle(
    colors.blue,
    theme
  )({
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    width: '100%',
  }),
  fb: {
    display: 'flex',
    alignItems: 'center',
  },
  scrollerChild: {
    minHeight: '100%',
    width: '100%',
  },
  desc: {
    marginRight: '20%',
    marginLeft: '0%',
    marginTop: '10%',
  },
  userprofile: {
    display: 'flex',
    alignItems: 'center',
    top: '20%',
    marginLeft: '20%',
    position: 'absolute',
    buttom: '0',
    justifyContent: 'center',
  },
  userlink: {
    display: 'flex',
    alignItems: 'center',
    top: '0%',
    marginLeft: '30%',
    position: 'absolute',
    buttom: '40%',
    justifyContent: 'center',
  },
  userChannel: {
    display: 'flex',
    alignItems: 'center',
    top: '2%',
    marginLeft: '67%',
    position: 'absolute',
    buttom: '40%',
    justifyContent: 'center',
  },
  goliveButton: {
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    flex: 1.5,
    color: '#ffffff',
    marginTop: '3%',
    top: '25px',
    marginTop: '2%',
    position: 'absolute',
    marginLeft: '80%',
    paddingBottom: '0.25vw',
    text: ({ skinny }) => ({
      flex: 1,
      fontSize: skinny ? '60%' : null,
      fontWeight: theme.typography.weight.bold,
      marginLeft: '0.25em',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    }),
  },
  social: {
    display: 'flex',
    alignItems: 'center',
    top: '20%',
    marginLeft: '40%',
    position: 'absolute',
    buttom: '0',
    justifyContent: 'center',
  },
  mycontext: {
    marginTop: '10%',
  },
  awards: {
    marginBottom: '0%',
  },
  editbuttons: {
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    flex: 1,
    color: '#ffffff',
    marginTop: '-8%',
    marginLeft: '80%',
    position: 'absolute',
    paddingBottom: '0.25vw',
    text: ({ skinny }) => ({
      flex: 1,
      fontSize: skinny ? '60%' : null,
      fontWeight: theme.typography.weight.bold,
      marginLeft: '0.25em',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    }),
  },
  textdescription: {
    display: 'flex',
    top: '0%',
    marginLeft: '15%',
    position: 'absolute',
    buttom: '0',
  },
  descriptionprofile: {
    position: 'absolute',
    top: '40%',
    display: 'flex',
  },
}))

const MyProfile = () => {
  const [userProfile, setUserProfile] = React.useState([])
  const [userChannel, setUserChannel] = React.useState([])
  const user = useSelector(selectors.getUser)
  React.useEffect(()=>{
    getProfileData();
    getuserChannelData();
  },[])
  
  const getProfileData=()=>{
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
        if (response.records[0].fields) {
          setUserProfile([response.records[0].fields])
        }
      })
      .catch(error => {
        console.log('error while data fetching', error)
      })
  }
  
  const getuserChannelData=()=>{
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
        if (response.records[0].fields) {
          setUserChannel(response.records[0].fields.channelName.split(','))
        }
      })
      .catch(error => {
        console.log('error while data fetching', error)
      })
  }
  
  const facetedPodcasts = useFacets('Home')
  const classes = useStyles({ primaryColor })
  const dispatch = useDispatch()
  const userName = user?.user_metadata?.full_name
  const golive=() => dispatch(actions.pushHistory('/live'));
  const editProfile=()=>dispatch(actions.pushHistory('/editprofile'))
  //console.log('channelname',userChannel)
  return (
    <BasicLayout home>
      {user && (
        <div className={classes.homeContent}>
          <div className="clearfix">
            <div className="row">
              {userProfile &&
                userProfile.map(data => (
                  <div className="col-md-4 animated fadeIn" key={data.id}>
                    <div className="card">
                      <div className="card-body">
                        <div className="avatar">
                          <img
                            src={data.image ? data.image : ''}
                            className="card-img-top"
                            width="15%"
                            alt=""
                          />
                        </div>
                        <div className={classes.textdescription}>
                          <h5 className="card-text">{data.name}</h5>
                          <div className={classes.descriptionprofile}>
                            <p
                              className="cart-text"
                              style={{
                                marginLeft: '0%',
                                width: '21vmin',
                                height: '21vmin',
                                marginTop: '20px',
                                wordWrap: 'break-word',
                                fontSize: '2.0vmin',
                                whiteSpace: 'normal',
                              }}
                            >
                              About:
                              {data.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.userlink}>
                      <div className="card-body">
                        <h5 className="card-title">
                          <label>
                            <u>My Links</u>
                          </label>
                        </h5>
                        <div style={{ marginTop: '-2%' }}>
                          <p className="card-text">
                            <span>Twitter :{data.TwitterUrl}</span>
                          </p>
                          <p className="card-text">
                            <span>Twitch :{data.TwitchUrl}</span>
                          </p>
                          {/* <p className="card-text">
                 <span>FaceBook :{data.FacebookUrl}</span>
                 </p>
                 <p className="card-text">
                 <span>Instagram: {data.InstagramUrl}</span>
                 </p> */}
                        </div>
                      </div>
                    </div>

                    <div className={classes.userChannel}>
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>
                              <div style={{ marginRight: '0%' }}>
                                <u>My Games</u>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {userChannel &&
                            userChannel.map((channel, index, tag) => {
                              return (
                                <tr key={index}>
                                  <td>- {channel}</td>
                                </tr>
                              )
                            })}
                        </tbody>
                      </table>
                    </div>
                    {/* <div className={classes.awards}>
                <div className="card-body">
                 <h5 className="card-title">
                   <br></br><br></br>
                 <label><u>My Awards</u></label>
                 </h5>
                 <p className="card-text">
                 <span>My awards data in progress</span>
                 </p>
               </div>
             </div> */}
                    {/* <div className={classes.mycontext}>
                <div className="card-body">
                 <h5 className="card-title">
                 <label><u>My Contexts</u></label>
                 </h5>
                 <p className="card-text">
                 <span>{data.MyContext}</span>
                 </p>
               </div>
             </div> */}
                  </div>
                ))}
            </div>
            <div className={classes.scroller}>
              <div className={classes.scrollerChild}>
                <React.Suspense fallback={<Loading />}>
                  <Button
                    className={classes.goliveButton}
                    color="primary"
                    onClick={golive}
                    size="small"
                    variant="contained"
                  >
                    GO LIVE
                  </Button>
                </React.Suspense>
              </div>
            </div>
            <div className={classes.scroller}>
              <div className={classes.scrollerChild}>
                <React.Suspense fallback={<Loading />}>
                  <Button
                    className={classes.editbuttons}
                    color="primary"
                    onClick={editProfile}
                    size="small"
                    variant="contained"
                  >
                    Edit
                  </Button>
                </React.Suspense>
              </div>
            </div>
            {userProfile &&
              userProfile.map(data => (
                <Grid className={''} container>
                  <br></br>
                  <br></br>
                  <Grid className={''} item xs={12}>
                    {/* <BottomBlock
                titleStart={data.name}
                titleRest="Podcasts"
                >
              </BottomBlock> */}
                  </Grid>
                  <Grid className={''}>
                    <BottomBlock titleStart={data.name} titleRest="Live">
                      <div className="avatar">
                        <img
                          src={data.image ? data.image : ''}
                          className="card-img-top"
                          width="15%"
                          alt=""
                        />
                      </div>
                    </BottomBlock>
                    <Grid className={''}>
                      <BottomBlock titleStart={data.name} titleRest="Recorded">
                        <div className="avatar">
                          <img
                            src={data.channelImage ? data.channelImage : ''}
                            className="card-img-top"
                            width="15%"
                            alt=""
                          />
                        </div>
                      </BottomBlock>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </div>
        </div>
      )}
    </BasicLayout>
  )
}

export default MyProfile
