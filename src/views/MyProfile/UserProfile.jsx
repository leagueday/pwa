import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Modal } from '@material-ui/core'
import { FriendsStateContext } from '../../store/stateProviders/toggleFriend'
import { selectors } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Airtable from 'airtable'
import { UserStateContext } from '../../store/stateProviders/userState'
import { colors } from '../../styling'
import { addScrollStyle } from '../util'
import { actions } from '../../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons'
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
    height: '25%',
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
    background: 'black',
    width: '18rem',
    minHeight: '150px',
    height: '12rem',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      minHeight: '0px',
      width: '0rem',
      height: '4rem',
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
  userName: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '150%',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: '125%',
    },
  },
  userEditName: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    marginTop: '20px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '5%',
      background: 'black'
    },
  },
  placeHolder: {
    opacity: 0.7,
    fontSize: '200%',
    width: '100%',
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
      background: colors.lightGray,
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  channels: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  recordings: {
    marginTop: '2%',
    zIndex: '-1',
    [theme.breakpoints.down('sm')]: {
      background: 'black'
    },
  },
  trophy: {
    marginTop: '2%',
    height: '120px',
  },
  trophyCont: {
    marginRight: '4%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  trophyName: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '150%',
  },
  trophys: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  creator: {
    margin: 0,
    padding: 0,
    color: colors.yellow,
  },
  ldCreatorImg: {
    width: '15%',
    marginLeft: '2%',
  },
  ldCreatorBadge: {
    marginTop: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfile: {
    background: colors.blue,
    width: '200px',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      fontSize: '80%',
    },
  },
  modalWrapper: {
    position: 'absolute',
    width: 520,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.darkGray,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: 'white',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    borderRadius: '5px',
    height: 250,
  },
  createBtn: {
    background: colors.blue,
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
  },
  accepted: {
    width: '200px',
    marginBottom: '5px',
    background: colors.blue,
    '&:hover': {
      background: theme.palette.primary.active,
    },
  },
  declined: {
    width: '200px',
    background: 'red',
    '&:hover': {
      background: 'red',
      opacity: 0.8,
    },
  },
}))

const apiKey = 'keymd23kpZ12EriVi'
const baseId = 'appXoertP1WJjd4TQ'
const base = new Airtable({ apiKey }).base(baseId)

const UserProfile = ({ userId }) => {
  const {
    userData,
    loading,
    getData,
    TitanTrophy,
    PentaTrophy,
    NoobTrophy,
    creatorList,
    userRecordings,
    audiocasts,
    channelList,
  } = useContext(UserStateContext)
  const { sendRequest, declineFriendReq, acceptFriendReq } = useContext(
    FriendsStateContext
  )

  const dispatch = useDispatch()
  const friendsList = useSelector(selectors.getFriendsList)
  const user = useSelector(selectors.getUser)
  const [liveRecordings, setLiveRecordings] = useState(true)
  const [trophieSelected, setTrophieSelected] = useState(false)
  const [creatorsSelected, setCreatorsSelected] = useState(false)
  const [channelSelected, setChannelSelected] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [declined, setDeclined] = useState(false)
  const [open, setOpen] = useState(false)
  const [alreadyFriends, setAlreadyFriends] = useState(false)
  const [requestPending, setRequestPending] = useState(false)
  const [sentRequest, setSentRequest] = useState(false)
  const [declineId, setDeclineId] = useState('')
  const [profileCreated, setProfileCreated] = useState(false)
  const userProfile = useSelector(selectors.getUserData)

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

  const classes = useStyles({ primaryColor })
  let count = 1

  if (loading) {
    return <h1>Loading...</h1>
  }

  const handleSend = () => {
    if (!user) {
      dispatch(actions.login())
    } else if (user && profileCreated === false) {
      setOpen(true)
    } else {
      sendRequest(userId)
      setSentRequest(true)
    }
  }

  const handleAccept = () => {
    acceptFriendReq(declineId)
    setAccepted(true)
  }

  useEffect(() => {
    friendsList?.sent?.map(friend => {
      if (friend.friend.id === userId) {
        setSentRequest(true)
      } else {
        return
      }
    })

    friendsList?.received?.map(friend => {
      console.log('from map ', friend)
      if (friend.friend.id === userId) {
        setRequestPending(true)
        setDeclineId(friend.id)
      } else {
        return
      }
    })

    friendsList?.accepted?.map(friend => {
      if (friend.friend.id === userId) {
        setAlreadyFriends(true)
      } else {
        return
      }
    })
  }, [friendsList, userId])

  useEffect(() => {
    if (userProfile) {
      setProfileCreated(true)
    }
  }, [userProfile])

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
            {userData?.fields?.leagueDayCreator === 'true' && (
              <div className={classes.ldCreatorBadge}>
                <h3 className={classes.creator}>LD Official Creator</h3>
                <img
                  className={classes.ldCreatorImg}
                  src="/img/LDcreator.png"
                  alt="LD creator badge"
                />
              </div>
            )}
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className={classes.modalWrapper}>
              <h4>Create a LeagueDay profile to send friend requests!</h4>
              <Button
                className={classes.createBtn}
                onClick={() => dispatch(actions.pushHistory('/create'))}
              >
                Create Profile
              </Button>
            </div>
          </Modal>
          {requestPending ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {!declined && (
                <Button className={classes.accepted} onClick={handleAccept}>
                  {accepted ? 'Accepted!' : 'Accept Friend Request'}
                </Button>
              )}
              {!accepted && (
                <Button
                  className={classes.declined}
                  onClick={() => {
                    declineFriendReq(declineId)
                    setDeclined(true)
                  }}
                >
                  {declined ? 'Declined!' : 'Decline Friend Request'}
                </Button>
              )}
            </div>
          ) : (
            <Button
              className={classes.editProfile}
              onClick={handleSend}
              disabled={alreadyFriends ? alreadyFriends : sentRequest}
            >
              {' '}
              {sentRequest
                ? 'Request Pending'
                : alreadyFriends
                ? 'Already Friends!'
                : 'Send Friend Request'}{' '}
            </Button>
          )}
          <div className={classes.userBio}>
            <div className={classes.userEditName}>
              <p className={classes.userName}>{userData?.fields?.username}</p>
              {userData?.fields?.credentials && (
                <p style={{ width: '100%' }}>
                  <span className={classes.socials}>Experience:</span>{' '}
                  {userData?.fields?.credentials}
                </p>
              )}
            </div>
            <div className={classes.description}>
              <p>{userData?.fields?.description}</p>
              <div>
                <p className={classes.socials}>Socials:</p>
                <p className={classes.socialLinks}>
                  <FontAwesomeIcon icon={faTwitter} />
                  <a
                    className={classes.socialLinks}
                    href={
                      userData?.fields?.TwitterUrl?.includes('http')
                        ? userData?.fields?.TwitterUrl
                        : `https://twitter.com/${userData?.fields?.TwitterUrl}`
                    }
                    target="_blank"
                    rel="noreferer"
                  >
                    {userData?.fields?.TwitterUrl}
                  </a>
                </p>
                <p className={classes.socialLinks}>
                  <FontAwesomeIcon icon={faTwitch} />
                  <a
                    className={classes.socialLinks}
                    href={
                      userData?.fields?.TwitchUrl?.includes('http')
                        ? userData?.fields?.TwitchUrl
                        : `https://twitch.com/${userData?.fields?.TwitchUrl}`
                    }
                    target="_blank"
                    rel="noreferer"
                  >
                    {userData?.fields?.TwitchUrl}
                  </a>
                </p>
              </div>
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
              Audiocasts
            </span>
            <span
              className={
                channelSelected ? classes.selectedButton : classes.sectionButton
              }
              onClick={handleChannelClick}
            >
              Followed Channels
            </span>
            <span
              className={
                creatorsSelected
                  ? classes.selectedButton
                  : classes.sectionButton
              }
              onClick={handleCreatorClick}
            >
              Followed Creators
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
            {liveRecordings && (
              <div className={classes.recordings}>
                {audiocasts?.concat(userRecordings)?.length < 1 ? (
                  <p className={classes.placeHolder}>No Audiocasts yet</p>
                ) : (
                  audiocasts?.concat(userRecordings)?.map((rec, index) => {
                    count += 1
                    return (
                      <div className={classes.track}>
                        <Tracks1
                          key={index}
                          episodeData={rec}
                          counter={count - 1}
                          channelColor={colors.darkGray}
                          indexdata={index}
                        />
                      </div>
                    )
                  })
                )}
              </div>
            )}
            {channelSelected && (
              <div className={classes.channels}>
                {channelList?.map((item, index) => {
                  return (
                    <div
                      className={classes.channelsWrapper}
                      onClick={() =>
                        dispatch(
                          actions.pushHistory(`/channel/${item.fields.tag}`)
                        )
                      }
                      key={index}
                    >
                      <img
                        className={classes.channelImg}
                        src={item.fields.channelImg}
                        alt="channel image"
                      />
                      <p className={classes.channelName}>{item.fields.title}</p>
                    </div>
                  )
                })}
              </div>
            )}
            {creatorsSelected && (
              <div className={classes.channels}>
                {creatorList?.map((item, index) => {
                  return (
                    <div
                      className={classes.channelsWrapper}
                      onClick={() =>
                        dispatch(
                          actions.pushHistory(
                            `/profile/${item.fields.creatorId}`
                          )
                        )
                      }
                      key={index}
                    >
                      <img
                        className={classes.channelImg}
                        src={item.fields.image}
                        alt="creator image"
                      />
                      <p className={classes.channelName}>{item.fields.username}</p>
                    </div>
                  )
                })}
              </div>
            )}
            <div className={classes.trophys}>
              {trophieSelected &&
                (audiocasts?.concat(userRecordings)?.length === 0 ? (
                  <div>
                    <p className={classes.placeHolder}>No trophies</p>
                  </div>
                ) : audiocasts?.concat(userRecordings)?.length > 10 ? (
                  <>
                    <NoobTrophy classes={classes} />
                    <PentaTrophy classes={classes} />
                    <TitanTrophy classes={classes} />
                  </>
                ) : audiocasts?.concat(userRecordings)?.length > 5 ? (
                  <>
                    <NoobTrophy classes={classes} />
                    <PentaTrophy classes={classes} />
                  </>
                ) : audiocasts?.concat(userRecordings)?.length > 1 ? (
                  <NoobTrophy classes={classes} />
                ) : null)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
