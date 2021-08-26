import React, { useState, useEffect, useContext } from 'react'
import Airtable from 'airtable'
import { useSelector, useDispatch } from 'react-redux'
import Friend from './Friend'
import FriendRequest from './FriendRequest'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { selectors } from '../../store'
import Modal from '@material-ui/core/Modal'
import { MyListContext } from '../../store/stateProviders/listState'
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
    position: 'relative',
    background: 'black',
    height: '90vh',
    width: '95%',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
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
    marginTop: '5%',
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
  accepted: {
    cursor: 'not-allowed',
    width: '300px',
    background: colors.blue,
    '&:hover': {
      background: colors.blue,
    },
  },
  declined: {
    cursor: 'not-allowed',
    width: '300px',
    background: 'red',
    '&:hover': {
      background: 'red',
    },
  },
  friendRequests: {
    position: 'absolute',
    zIndex: 10,
    right: 20,
    top: 20,
    background: colors.blue,
    width: '200px',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    [theme.breakpoints.down('md')]: {
      width: '25%',
      fontSize: '80%',
    },
  },
  deleteBtn: {
    background: 'transparent',
    border: '1px solid red',
    color: 'red',
    width: '150px',
    '&:hover': {
      transition: 'all .2s ease-in-out',
      backgroundColor: 'red',
      color: 'white',
    },
    [theme.breakpoints.down('md')]: {
      width: '25%',
      fontSize: '80%',
    },
  },
  buttons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
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
  track: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  userGamesWrapper: {
    background: 'black',
    width: '100%',
    marginLeft: '3%',
    marginTop: '5%',
    minHeight: '400px',
    [theme.breakpoints.down('md')]: {
      marginTop: '5%',
    },
    [theme.breakpoints.down('sm')]: {
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
    position: 'relative',
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
    position: 'relative',
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
    marginTop: '.5%',
    width: '100%',
  },
  placeHolder: {
    opacity: 0.7,
    fontSize: '200%',
    width: '75%',
  },
  goLiveButton: {
    width: '110px',
    height: '40px',
    marginRight: '5%',
    background: colors.blue,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    [theme.breakpoints.down('md')]: {},
    [theme.breakpoints.down('sm')]: {
      width: '30%',
      height: '15%',
    },
  },
  uploadButton: {
    width: '180px',
    height: '40px',
    background: colors.blue,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    [theme.breakpoints.down('sm')]: {
      width: '35%',
      height: '10%',
    },
  },
  socials: {
    fontWeight: theme.typography.fontWeightBold,
    marginLeft: '3%',
  },
  socialLinks: {
    display: 'flex',
    fontSize: '90%',
    alignItems: 'center',
    textDecoration: 'underline',
    color: 'white',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'stretch',
      alignItems: 'center',
      marginLeft: '1%',
    },
  },
  socialIcon: {
    marginRight: '10%',
  },
  socialContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  channels: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  recordings: {
    marginTop: '.5%',
    zIndex: '-1',
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
  audioButtons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '3%',
    justifyContent: 'center',
  },
  xBtn: {
    marginLeft: '1%',
    cursor: 'pointer',
    color: 'red',
    fontWeight: theme.typography.fontWeightBold,
    opacity: 0.6,
    '&:hover': {
      opacity: 1,
      transform: 'scale(1.2)',
    },
  },
  modalWrapper: {
    position: 'absolute',
    width: 500,
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
  friendsModalWrapper: {
    position: 'absolute',
    width: 650,
    overflow: 'scroll',
    backgroundColor: colors.darkGray,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: 'white',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    borderRadius: '5px',
    maxHeight: 750,
    height: 'auto',
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
    marginTop: '30%',
    marginLeft: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: '2% 0',
    paddingRight: '25%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  friendImgCont: {
    width: '25%',
    display: 'flex',
    alignItems: 'center',
  },
  friendBtnCont: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      width: '100%',
      marginTop: 10,
    },
  },
  friendName: {
    width: '25%',
  },
  friendReqList: {
    display: 'block',
    width: '100%',
  },
  friendImg: {
    width: '70px',
    margin: 'auto',
    borderRadius: '50%',
    height: '70px',
    objectFit: 'cover',
  },
  chatBtn: {
    width: '110px',
    height: '40px',
    marginRight: '5%',
    background: colors.blue,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
  },
  friendReqNot: {
    position: 'absolute',
    borderRadius: '50%',
    width: '15%',
    background: 'red',
    color: 'white',
    left: -5,
    top: -5,
  },
}))
const apiKey = 'keymd23kpZ12EriVi'
const baseId = 'appXoertP1WJjd4TQ'
const base = new Airtable({ apiKey }).base(baseId)

const MyProfile = ({ userId }) => {
  const { globalList, creatorList, setGlobalList, setCreatorList } = useContext(
    MyListContext
  )
  const { userData, loading, getUserRecordings, userRecordings, audiocasts } = useContext(UserStateContext)
  const [liveRecordings, setLiveRecordings] = useState(true)
  const [channelSelected, setChannelSelected] = useState(false)
  const [friendSelected, setFriendSelected] = useState(false)
  const [trophieSelected, setTrophieSelected] = useState(false)
  const [creatorsSelected, setCreatorsSelected] = useState(false)
  const [recordToDelete, setRecordToDelete] = useState({})
  const [friendsModal, setFriendsModal] = useState(false)
  const [open, setOpen] = useState(false)
  const friendList = useSelector(selectors.getFriendsList)
  // const { filteredListRecords, creatorList: cl } = getMyList()
  const filteredListRecords = useSelector(selectors.getMyChannels)

  const handleCreatorClick = () => {
    setCreatorsSelected(true)
    setLiveRecordings(false)
    setChannelSelected(false)
    setTrophieSelected(false)
    setFriendSelected(false)
  }

  const handleChannelClick = () => {
    setCreatorsSelected(false)
    setLiveRecordings(false)
    setChannelSelected(true)
    setTrophieSelected(false)
    setFriendSelected(false)
  }

  const handleTrophyClick = () => {
    setCreatorsSelected(false)
    setLiveRecordings(false)
    setChannelSelected(false)
    setTrophieSelected(true)
    setFriendSelected(false)
  }

  const handleLiveClick = () => {
    setCreatorsSelected(false)
    setLiveRecordings(true)
    setChannelSelected(false)
    setTrophieSelected(false)
    setFriendSelected(false)
  }

  const handleFriendClick = () => {
    setCreatorsSelected(false)
    setLiveRecordings(false)
    setChannelSelected(false)
    setTrophieSelected(false)
    setFriendSelected(true)
  }

  const handleModalClose = () => {
    setOpen(false)
  }

  const deleteAudiocast = audio => {
    setOpen(true)
    setRecordToDelete(audio)
  }

  const deleteRecord = () => {
    if (recordToDelete.fields.type === 'audiocast') {
      base('UserAudiocasts').destroy(
        [recordToDelete.id],
        function (err, deletedRecords) {
          if (err) {
            console.error(err)
            return
          }
          console.log('Deleted', deletedRecords.length, 'records')
        }
      )
    } else if (recordToDelete.fields.type === 'livestream') {
      base('ChannelLiveData').destroy(
        [recordToDelete.id],
        function (err, deletedRecords) {
          if (err) {
            console.error(err)
            return
          }
          console.log('Deleted', deletedRecords.length, 'records')
        }
      )
    }
    setOpen(false)
    getUserRecordings()
  }

  useEffect(() => {
    getUserRecordings()
  }, [open, userId])

  const classes = useStyles()
  const dispatch = useDispatch()
  const golive = () => dispatch(actions.pushHistory('/live'))
  const editProfile = () => dispatch(actions.pushHistory('/editprofile'))
  let countt = 1

  if (loading) {
    return <h1>Loading...</h1>
  }

  // useEffect(() => {
  //   if (globalList.length === 0 && filteredListRecords.length > 0) {
  //     console.log('set channel list ')
  //     setGlobalList(filteredListRecords)
  //   }
  // }, [filteredListRecords])

  return (
    <div className={classes.content}>
      <Modal open={friendsModal} onClose={() => setFriendsModal(false)}>
        <div className={classes.friendsModalWrapper}>
          {friendList?.received?.length === 0 && <h4>No Pending requests</h4>}
          {friendList?.received?.map((friend, ind) => (
            <div className={classes.friendReqList} key={ind}>
              <FriendRequest friend={friend} classes={classes} />
            </div>
          ))}
        </div>
      </Modal>
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
        <Button
          onClick={() => setFriendsModal(true)}
          className={classes.friendRequests}
        >
          Friend Requests
          {friendList?.received?.length > 0 && (
            <span className={classes.friendReqNot}>
              {friendList?.received?.length}
            </span>
          )}
        </Button>
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
          <div className={classes.userBio}>
            <div className={classes.userEditName}>
              <p className={classes.userName}>{userData?.fields?.name}</p>
              <Button onClick={editProfile} className={classes.editProfile}>
                Edit profile
              </Button>
            </div>
            <div className={classes.description}>
              <p>{userData?.fields?.description}</p>
              <div className={classes.socialContainer}>
                <p style={{ width: '100%' }}>
                  <span className={classes.socials}>Experience:</span>{' '}
                  {userData?.fields?.credentials}
                </p>
                <p className={classes.socials}>Socials:</p>
                <p className={classes.socialLinks}>
                  <FontAwesomeIcon
                    icon={faTwitter}
                    size={'lg'}
                    className={classes.socialIcon}
                  />
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
                  <FontAwesomeIcon
                    icon={faTwitch}
                    size={'lg'}
                    className={classes.socialIcon}
                  />
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
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.modalWrapper}>
            <div>
              <p>Are you sure you want to delete this audiocast?</p>
            </div>
            <div className={classes.buttons}>
              <Button
                onClick={handleModalClose}
                className={classes.editProfile}
              >
                No, cancel
              </Button>
              <Button onClick={deleteRecord} className={classes.deleteBtn}>
                Yes, delete
              </Button>
            </div>
          </div>
        </Modal>
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
                friendSelected ? classes.selectedButton : classes.sectionButton
              }
              onClick={handleFriendClick}
            >
              Friends
              <NotificationsActiveIcon
                style={{
                  position: 'absolute',
                  color: colors.blue,
                  right: -5,
                  top: -5,
                }}
              />
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
                creatorsSelected
                  ? classes.selectedButton
                  : classes.sectionButton
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
                {filteredListRecords?.map((item, index) => {
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
                      <p className={classes.channelName}>{item.fields.name}</p>
                    </div>
                  )
                })}
              </div>
            )}
            {friendSelected && (
              <div>
                {friendList?.accepted?.map((friend, index) => (
                  <Friend friend={friend} key={index} classes={classes} />
                ))}
              </div>
            )}
            {liveRecordings && (
              <>
                <div className={classes.audioButtons}>
                  {userData?.fields?.admin === 'true' && (
                    <Button onClick={golive} className={classes.goLiveButton}>
                      Go Live
                    </Button>
                  )}
                  <Button
                    onClick={() => dispatch(actions.pushHistory('/upload'))}
                    className={classes.uploadButton}
                  >
                    Upload Audiocast
                  </Button>
                </div>
                <div className={classes.recordings}>
                  {audiocasts.concat(userRecordings)?.length < 1 ? (
                    <p className={classes.placeHolder}>
                      No Recorded Streams yet
                    </p>
                  ) : (
                    audiocasts?.concat(userRecordings)?.map((rec, index) => {
                      countt += 1
                      return (
                        <div className={classes.track} key={index}>
                          <Tracks1
                            key={index}
                            episodeData={rec}
                            counter={countt - 1}
                            channelColor={colors.darkGray}
                            indexdata={index}
                          />
                          <p
                            onClick={() => deleteAudiocast(rec)}
                            className={classes.xBtn}
                          >
                            &#10005;
                          </p>
                        </div>
                      )
                    })
                  )}
                </div>
              </>
            )}
            <div className={classes.trophys}>
              {trophieSelected &&
                (audiocasts.concat(userRecordings)?.length === 0 ? (
                  <div>
                    <p className={classes.placeHolder}>
                      Stream to earn trophies!
                    </p>
                  </div>
                ) : audiocasts.concat(userRecordings)?.length > 10 ? (
                  <>
                    <NoobTrophy classes={classes} />
                    <PentaTrophy classes={classes} />
                    <TitanTrophy classes={classes} />
                  </>
                ) : audiocasts.concat(userRecordings)?.length > 5 ? (
                  <>
                    <NoobTrophy classes={classes} />
                    <PentaTrophy classes={classes} />
                  </>
                ) : audiocasts.concat(userRecordings)?.length > 1 ? (
                  <NoobTrophy classes={classes} />
                ) : null)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
