import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { selectors } from '../../store'
import { colors } from '../../styling'
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
  },
  heroImgCont: {},
  heroImg: {
    position: 'absolute',
    top: 20,
    height: '25%',
    width: '100%',
    objectFit: 'cover',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
  },
  credInfo: {
    width: '30%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
  },
  userImgContainer: {
    width: '100%',
    height: '27%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  userImg: {
    borderRadius: '50%',
    width: '18rem',
    height: '18rem',
    position: 'absolute',
    top: 0,
    border: '2px solid magenta',
  },
  userBio: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '25%',
  },
  editProfile: {
    background: colors.blue,
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
  },
  userName: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '150%',
    height: 'auto',
    marginTop: 0,
  },
  userEditName: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userGamesWrapper: {
    width: '100%',
    marginTop: '15%',
    marginLeft: '5%',
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
    opacity: '0.7',
    fontWeight: theme.typography.fontWeightBold,
    '&:hover': {
      background: '#222',
      borderBottom: '3px solid orange',
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
    width: '15%',
    height: '10%',
    marginLeft: '18%',
    background: colors.blue,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
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
  },
  trophy: {
    marginTop: '2%',
    height: '120px'
  }
}))

const MyProfile = () => {
  const [currentUserCreds, setCurrentUserCreds] = useState()
  const [currentUserGames, setCurrentUserGames] = useState()
  const [userRecordings, setUserRecordings] = useState()
  const [gamesSelected, setGamesSelected] = useState(false)
  const [liveRecordings, setLiveRecordings] = useState(true)
  const [channelSelected, setChannelSelected] = useState(false)
  const [trophieSelected, setTrophieSelected] = useState(false)

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
    const currentUserRecordings = recordedStreams?.filter(
      item => item.fields.userId === 'a339ba70-5026-431d-9d3d-bfe7d19dd534'
    )
    // const currentUserRecordings = recordedStreams?.filter(
    //   item => item.fields.userId === user.id
    // )
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
          src={currentUserCreds?.fields?.heroImg}
          alt="Hero img"
        />
      </div>
      <div className={classes.profileWrapper}>
        <div className={classes.credInfo}>
          <div className={classes.userImgContainer}>
            <img
              className={classes.userImg}
              src={currentUserCreds?.fields?.image}
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
            <Button onClick={golive} className={classes.goLiveButton}> 
              Go Live
            </Button>
          </div>
          <div className={classes.userContent}>
            {gamesSelected && (
              <div>
                {gamesArray?.map(game => {
                  console.log(game)
                  return <p>{game}</p>
                })}
              </div>
            )}
            {channelSelected && (
              <div className={classes.channels}>
                {myChannels?.map(item => {
                  console.log(item)
                  return (
                    <div className={classes.channelsWrapper}>
                      <img
                        className={classes.channelImg}
                        src={item.imageUrl}
                        alt="channel image"
                      />
                      <p className={classes.channelName}>{item.title}</p>
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
                    console.log(rec)
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
                  <p className={classes.placeHolder}>Stream to earn trophies!</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}

export default MyProfile;