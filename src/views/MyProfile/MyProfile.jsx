import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { selectors } from '../../store'
import { MyListContext } from '../../store/stateProviders/listState'
import { UserStateContext } from '../../store/stateProviders/userState'
import { colors } from '../../styling'
import { addScrollStyle } from '../util'
import { actions } from '../../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons'
import useAirTable from '../../api/useAirtable'
import { Tracks1 } from '../ChannelScreen/ReplayBroadcastsMockup'
const primaryColor = colors.magenta

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
    }),
  profileWrapper: {
    background: 'black',
    height: '90vh',
    width: '95%',
    marginLeft: '2.5%',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      marginLeft: '0',
      height: '100%',
    },
  },
  heroImgCont: {
    height: '25%'
  },
  heroImg: {
    minHeight: '200px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
      height: '15%',
    },
    [theme.breakpoints.down('xs')]: {
      height: '15%',
      top: 60,
    },
  },
  credInfo: {
    width: '35%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  userImgContainer: {
    width: '100%',
    minHeight: '150px',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '75%',
    },
  },
  userImg: {
    borderRadius: '50%',
    width: '12rem',
    height: '12rem',
    position: 'absolute',
    top: -80,
    border: '5px solid black',
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
      width: '10rem',
      height: '10rem',
    },
    [theme.breakpoints.down('xs')]: {
      top: -80,
      width: '8rem',
      height: '8rem',
    },
  },
  userBio: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      paddingLeft: '3%',
      paddingRight: '3%',
    },
  },
  editProfile: {
    background: colors.blue,
    width: '150px',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    [theme.breakpoints.down('md')]: {
      width: '25%',
      fontSize: '80%',
    },
  },
  userName: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '150%',
    height: 'auto',
    marginTop: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: '125%',
    },
  },
  userEditName: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  userGamesWrapper: {
    background: 'black',
    width: '100%',
    marginTop: '5%',
    marginLeft: '5%',
    minHeight: '400px',
    [theme.breakpoints.down('md')]: {
      marginTop: '5%',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      marginTop: '5%',
      height: '100%',
      maxHeight: '375px',
    },
  },
  buttonSelector: {
    display: 'flex',
    width: '100%',
    borderBottom: '1px solid #333',
  },
  sectionButton: {
    cursor: 'pointer',
    padding: 10,
    marginRight: '4%',
    display: 'flex',
    alignItems: 'center',
    opacity: '0.7',
    fontWeight: theme.typography.fontWeightBold,
    '&:hover': {
      background: '#222',
      borderBottom: '3px solid orange',
    },
    [theme.breakpoints.down('sm')]: {
      width: '35%',
      padding: 5,
      fontSize: '80%',
    },
  },
  selectedButton: {
    cursor: 'pointer',
    padding: 10,
    marginRight: '4%',
    opacity: '1',
    fontWeight: theme.typography.fontWeightBold,
    background: '#222',
    borderBottom: '3px solid orange',
    [theme.breakpoints.down('sm')]: {
      width: '35%',
      padding: 5,
      fontSize: '80%',
      borderBottom: '1.5px solid orange',
    },
  },
  userContent: {
    disply: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    width: '100%',
    paddingLeft: '5%',
    // overflow: 'scroll',
  },
  placeHolder: {
    opacity: 0.7,
    fontSize: '200%',
    width: '75%',
  },
  goLiveButton: {
    width: '110px',
    height: '30px',
    background: colors.blue,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '0',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '2%',
      width: '30%',
      height: '15%',
    },
  },
  socials: {
    fontWeight: theme.typography.fontWeightBold,
  },
  socialLinks: {
    display: 'flex',
    fontSize: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textDecoration: 'underline',
    color: 'white',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'stretch',
      alignItems: 'center',
      marginLeft: '1%',
    },
  },
  channelImg: {
    borderRadius: '50%',
    width: '20%',
  },
  channelsWrapper: {
    background: colors.darkGray,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '35%',
    padding: '5px 0',
    borderRadius: '70px',
    alignItems: 'center',
    marginBottom: '5%',
    marginRight: '5%',
    '&:hover': {
      background: colors.lightGray
    }
  },
  channels: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  recordings: {
    marginTop: '2%',
    zIndex: '-1',
  },
  trophy: {
    marginTop: '2%',
    height: '120px',
  },
}));

const MyProfile = () => {
  const { globalList, creatorList } = useContext(MyListContext)
  const { userData, loading, refreshData, getData } = useContext(
    UserStateContext
  )
  const [userRecordings, setUserRecordings] = useState([])
  const [liveRecordings, setLiveRecordings] = useState(true)
  const [channelSelected, setChannelSelected] = useState(false)
  const [trophieSelected, setTrophieSelected] = useState(false)
  const [creatorsSelected, setCreatorsSelected] = useState(false);
  const user = useSelector(selectors.getUser)

  const handleCreatorClick = () => {
    setCreatorsSelected(true)
    setLiveRecordings(false)
    setChannelSelected(false)
    setTrophieSelected(false)
  }

  const handleChannelClick = () => {
    setCreatorsSelected(false)
    setLiveRecordings(false)
    setChannelSelected(true)
    setTrophieSelected(false)
  }

  const handleTrophyClick = () => {
    setCreatorsSelected(false)
    setLiveRecordings(false)
    setChannelSelected(false)
    setTrophieSelected(true)
  }

  const handleLiveClick = () => {
    setCreatorsSelected(false)
    setLiveRecordings(true)
    setChannelSelected(false)
    setTrophieSelected(false)
  }

  const { data: recordedStreams } = useAirTable(
    'appXoertP1WJjd4TQ',
    'ChannelLiveData'
  )

  const getUserById = () => {
    const currentUserRecordings = recordedStreams?.filter(
      item => item.fields.userId === user?.id
    )
    setUserRecordings(currentUserRecordings)
  }

  useEffect(() => {
    getUserById()
  }, [recordedStreams])

  const classes = useStyles()
  const dispatch = useDispatch()
  const golive = () => dispatch(actions.pushHistory('/live'))
  const editProfile = () => dispatch(actions.pushHistory('/editprofile'))
  // const gamesArray = currentUserGames?.fields?.channelName?.split(',')
  let count = 1

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className={classes.content}>
      <div className={classes.heroImgCont}>
        <img
          className={classes.heroImg}
          src={
            userData?.fields?.heroImg
              ? userData?.fields?.heroImg
              : 'https://fasttechnologies.com/wp-content/uploads/2017/01/placeholder-banner.png'
          }
          alt="Hero img"
        />
      </div>
      <div className={classes.profileWrapper}>
        <div className={classes.credInfo}>
          <div className={classes.userImgContainer}>
            <img
              className={classes.userImg}
              src={
                userData?.fields?.image
                  ? userData?.fields?.image
                  : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues='
              }
              alt="User Profile Picture"
            />
          </div>
          <div className={classes.userBio}>
            <div className={classes.userEditName}>
              <p className={classes.userName}>{userData?.fields?.name}</p>
              <Button onClick={editProfile} className={classes.editProfile}>
                Edit profile
              </Button>
            </div>
            <div className={classes.description}>
              <p>{userData?.fields?.description}</p>
              <div>
                <p className={classes.socials}>Social Links:</p>
                <p className={classes.socialLinks}>
                  <FontAwesomeIcon icon={faTwitter} />{' '}
                  <a
                    className={classes.socialLinks}
                    href={userData?.fields?.TwitterUrl}
                  >
                    {userData?.fields?.TwitterUrl}
                  </a>
                </p>
                <p className={classes.socialLinks}>
                  <FontAwesomeIcon icon={faTwitch} />{' '}
                  <a
                    className={classes.socialLinks}
                    href={userData?.fields?.TwitchUrl}
                  >
                    {userData?.fields?.TwitchUrl}
                  </a>
                </p>
              </div>
            </div>
              <Button onClick={golive} className={classes.goLiveButton}>
                Go Live
              </Button>
          </div>
        </div>
        <div className={classes.userGamesWrapper}>
          <div className={classes.buttonSelector}>
            <span
              className={
                liveRecordings ? classes.selectedButton : classes.sectionButton
              }
              onClick={handleLiveClick}
            >
              Recorded Streams
            </span>
            <span
              className={
                channelSelected ? classes.selectedButton : classes.sectionButton
              }
              onClick={handleChannelClick}
            >
              My Channels
            </span>
            <span
              className={
                creatorsSelected ? classes.selectedButton : classes.sectionButton
              }
              onClick={handleCreatorClick}
            >
              My Creators
            </span>
            <span
              className={
                trophieSelected ? classes.selectedButton : classes.sectionButton
              }
              onClick={handleTrophyClick}
            >
              Trophies
            </span>
          </div>
          <div className={classes.userContent}>
            {channelSelected && (
              <div className={classes.channels}>
                {globalList?.map((item, index) => {
                  return (
                    <div className={classes.channelsWrapper} onClick={() => dispatch(actions.pushHistory(`/channel/${item.fields.channelTag}`))} key={index}>
                      <img
                        className={classes.channelImg}
                        src={item.fields.channelImg}
                        alt="channel image"
                      />
                      <p className={classes.channelName}>
                        {item.fields.channelName}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
            {creatorsSelected && (
              <div className={classes.channels}>
                {creatorList?.map((item, index) => {
                  return (
                    <div className={classes.channelsWrapper} onClick={() => dispatch(actions.pushHistory(`/profile/${item.fields.creatorId}`))} key={index}>
                      <img
                        className={classes.channelImg}
                        src={item.fields.creatorImg}
                        alt="creator image"
                      />
                      <p className={classes.channelName}>
                        {item.fields.creatorName}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
            {liveRecordings && (
              <div className={classes.recordings}>
                {userRecordings?.length < 1 ? (
                  <p className={classes.placeHolder}>No Recorded Streams yet</p>
                ) : (
                  userRecordings?.map((rec, index) => {
                    count += 1
                    return (
                      <>
                        <Tracks1
                          key={index}
                          episodeData={rec}
                          counter={count - 1}
                          channelColor={colors.darkGray}
                          indexdata={index}
                        />
                      </>
                    )
                  })
                )}
              </div>
            )}
            {trophieSelected &&
              (userRecordings?.length > 0 ? (
                <>
                  <img
                    className={classes.trophy}
                    src="/img/noobTrophy1.png"
                    alt=""
                  />
                  <p>Noob Award (first stream created)</p>
                </>
              ) : (
                <div>
                  <p className={classes.placeHolder}>
                    Stream to earn trophies!
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
