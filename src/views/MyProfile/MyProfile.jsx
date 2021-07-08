import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { selectors } from '../../store'
import { colors } from '../../styling'
import { getMyList } from '../../api/getUserList'
import BasicLayout from '../BasicLayout'
import { actions } from '../../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons'
import useAirTable from '../../api/useAirtable'
import useChannels from '../../api/useChannels'
import { Tracks1 } from '../ChannelScreen/ReplayBroadcastsMockup'
const ChannelCategories = React.lazy(() => import('../ChannelCategories'))
const primaryColor = colors.magenta

const useStyles = makeStyles(theme => ({
  profileWrapper: {
    marginTop: '5%',
    height: '90%',
    width: '95%',
    marginLeft: '2.5%',
    display: 'flex',
    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      marginTop: '0',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      marginLeft: '0',
      height: '100%',
    },
  },
  heroImg: {
    position: 'absolute',
    top: 20,
    height: '25%',
    width: '100%',
    objectFit: 'cover',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
    [theme.breakpoints.down('md')]: {
      height: '15%',
    },
    [theme.breakpoints.down('xs')]: {
      height: '15%',
      top: 60,
    },
  },
  credInfo: {
    width: '30%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  userImgContainer: {
    width: '100%',
    height: '27%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '75%',
    },
  },
  userImg: {
    borderRadius: '50%',
    width: '15rem',
    height: '15rem',
    position: 'absolute',
    top: 10,
    border: '2px solid magenta',
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
      width: '12rem',
      height: '12rem',
    },
    [theme.breakpoints.down('xs')]: {
      top: 0,
      left: 0,
      width: '8rem',
      height: '8rem',
    },
  },
  userBio: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '75px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      marginTop: '25%',
      alignItems: 'stretch',
      paddingLeft: '3%',
      paddingRight: '3%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '35%',
    },
  },
  editProfile: {
    background: colors.blue,
    width: '100%',
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
    width: '100%',
    marginTop: '15%',
    marginLeft: '5%',
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
    overflow: 'scroll',
  },
  placeHolder: {
    opacity: 0.7,
    fontSize: '200%',
    width: '75%',
  },
  goLiveButton: {
    width: '40%',
    height: '15%',
    marginLeft: '18%',
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
    display: 'flex',
    width: '50%',
    alignItems: 'center',
    marginBottom: '5%',
  },
  channels: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  recordings: {
    marginTop: '2%',
    // height: '50rem',
  },
  trophy: {
    marginTop: '2%',
    height: '120px',
  },
}))

const MyProfile = () => {
  const [currentUserCreds, setCurrentUserCreds] = useState()
  const [currentUserGames, setCurrentUserGames] = useState()
  const [userRecordings, setUserRecordings] = useState()
  const [gamesSelected, setGamesSelected] = useState(false)
  const [liveRecordings, setLiveRecordings] = useState(true)
  const [channelSelected, setChannelSelected] = useState(false)
  const [trophieSelected, setTrophieSelected] = useState(false)
  const userList = getMyList()
  const user = useSelector(selectors.getUser)

  const handleGamesClick = () => {
    setGamesSelected(true)
    setLiveRecordings(false)
    setChannelSelected(false)
    setTrophieSelected(false)
  }

  const handleChannelClick = () => {
    setGamesSelected(false)
    setLiveRecordings(false)
    setChannelSelected(true)
    setTrophieSelected(false)
  }

  const handleTrophyClick = () => {
    setGamesSelected(false)
    setLiveRecordings(false)
    setChannelSelected(false)
    setTrophieSelected(true)
  }

  const handleLiveClick = () => {
    setGamesSelected(false)
    setLiveRecordings(true)
    setChannelSelected(false)
    setTrophieSelected(false)
  }

  const { data: userCreds } = useAirTable('appXoertP1WJjd4TQ', 'UserProfile')
  const { data: userGames } = useAirTable('appXoertP1WJjd4TQ', 'UserGames')
  const { data: recordedStreams } = useAirTable(
    'appXoertP1WJjd4TQ',
    'ChannelLiveData'
  )

  const getUserById = () => {
    const currentUserCred = userCreds?.filter(
      item => item.fields.userId === user.id
    )
    const currentUserGames = userGames?.filter(
      item => item.fields.userId === user.id
    )
    // const currentUserRecordings = recordedStreams?.filter(
    //   item => item.fields.userId === 'a339ba70-5026-431d-9d3d-bfe7d19dd534'
    // )
    const currentUserRecordings = recordedStreams?.filter(
      item => item.fields.userId === user.id
    )
    setCurrentUserCreds(currentUserCred?.shift())
    setCurrentUserGames(currentUserGames?.shift())
    setUserRecordings(currentUserRecordings)
  }

  useEffect(() => {
    getUserById()
  }, [userCreds, userGames, recordedStreams])

  const classes = useStyles({ primaryColor })

  const dispatch = useDispatch()
  const golive = () => dispatch(actions.pushHistory('/live'))
  const editProfile = () => dispatch(actions.pushHistory('/editprofile'))
  const myChannels = useChannels().myList
  const gamesArray = currentUserGames?.fields?.channelName?.split(',')
  let count = 1

  return (
    <BasicLayout home>
      <div className={classes.heroImgCont}>
        <img
          className={classes.heroImg}
          src={
            currentUserCreds?.fields?.heroImg
              ? currentUserCreds?.fields?.heroImg
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
                currentUserCreds?.fields?.image
                  ? currentUserCreds?.fields?.image
                  : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues='
              }
              alt="User Profile Picture"
            />
          </div>
          <div className={classes.userBio}>
            <div className={classes.userEditName}>
              <p className={classes.userName}>
                {currentUserCreds?.fields?.name}
              </p>
              <Button onClick={editProfile} className={classes.editProfile}>
                Edit profile
              </Button>
            </div>
            <div className={classes.description}>
              <p>{currentUserCreds?.fields.description}</p>
              <div>
                <p className={classes.socials}>Social Links:</p>
                <p className={classes.socialLinks}>
                  <FontAwesomeIcon icon={faTwitter} />{' '}
                  <a
                    className={classes.socialLinks}
                    href={currentUserCreds?.fields?.TwitterUrl}
                  >
                    {currentUserCreds?.fields?.TwitterUrl}
                  </a>
                </p>
                <p className={classes.socialLinks}>
                  <FontAwesomeIcon icon={faTwitch} />{' '}
                  <a
                    className={classes.socialLinks}
                    href={currentUserCreds?.fields?.TwitchUrl}
                  >
                    {currentUserCreds?.fields?.TwitchUrl}
                  </a>
                </p>
              </div>
              <Button onClick={golive} className={classes.goLiveButton}>
                Go Live
              </Button>
            </div>
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
                gamesSelected ? classes.selectedButton : classes.sectionButton
              }
              onClick={handleGamesClick}
            >
              My Games
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
                trophieSelected ? classes.selectedButton : classes.sectionButton
              }
              onClick={handleTrophyClick}
            >
              Trophies
            </span>
          </div>
          <div className={classes.userContent}>
            {gamesSelected && (
              <div>
                {gamesArray?.map(game => {
                  return <p>{game}</p>
                })}
              </div>
            )}
            {channelSelected && (
              <div className={classes.channels}>
                {userList?.map(item => {
                  return (
                    <div className={classes.channelsWrapper}>
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
              (userRecordings?.length > 1 ? (
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
    </BasicLayout>
  )
}

export default MyProfile
