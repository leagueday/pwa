import React, { useState, useEffect, useContext } from 'react'
import Airtable from 'airtable'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { selectors } from '../../store'
import { getMyList } from '../../api/getUserList'
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

export const mockFriends = {
  userId: 'a6283fa7-7405-4d72-aaab-3f84e630845d',
  friends: [
    {
      ChannelLiveData: ['recxA5xhJZlBw0qVo'],
      MyContext: 'Test',
      TwitchUrl: 'nvantzos',
      TwitterUrl: 'nikvantzos',
      UserAudiocasts: [
        ('recjHFYIEHksXoc5J',
        'recMNRJiaK3pZf7Dk',
        'recouTuUDYWADAv1h',
        'rec3GFESHacXGosb5',
        'recWSixPKsYxpzJqw',
        'reccrPmV7sI6Nk9ws',
        'recC4vfIgZzUQzuuz',
        'recxpX2XSbfMFaZ6J',
        'recVqeLpRG8yw7XjZ'),
      ],
      UserCreatorsList: [
        ('recJixYr6ZyhXlT7l', 'recUIZlxl0W84aClN', 'recc05v4kPFnOfy9m'),
      ],
      UserList: [
        ('recgHSN75dVUB6IBx', 'recjGDfvcjUMf3L8O', 'recwjSU9LqOKFiZuv'),
      ],
      admin: 'true',
      date: '2021-07-29T21:05:33.188Z',
      description: "LeagueDay Founder | 'Going for the Turkey' - MacGruber",
      email: 'nick@leagueday.gg',
      heroImg:
        'https://leagueday-prod-images.s3.amazonaws.com/uploads/beach 1.jpg',
      image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/1567776578931.jpg',
      likedAudio: [
        ('reccrPmV7sI6Nk9ws',
        'recxpX2XSbfMFaZ6J',
        'recC4vfIgZzUQzuuz',
        'rec3GFESHacXGosb5',
        'recWSixPKsYxpzJqw',
        'recouTuUDYWADAv1h',
        'recMNRJiaK3pZf7Dk',
        'recjHFYIEHksXoc5J',
        'recoVj8mGxPAptJQn',
        'reccDXcgbVZgOpMoC',
        'recVqeLpRG8yw7XjZ'),
      ],
      liveStreamId: 'bXthhO1HODhAx7u003N1aQUX89aGiz02yTKKvOWl6HvVo',
      name: 'Chuuper',
      profileCreated: 'yes',
      rtmpLink: 'rtmps://global-live.mux.com:443/app',
      streamKey: 'e7295a2e-72ad-faef-f288-ba66c822981a',
      userChannel: 'ChannelName',
      userChannelTag: 'channelname',
      userId: 'b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    },
    {
      ChannelLiveData: ['recxA5xhJZlBw0qVo'],
      MyContext: 'Test',
      TwitchUrl: 'nvantzos',
      TwitterUrl: 'nikvantzos',
      UserAudiocasts: [
        'recjHFYIEHksXoc5J',
        'recMNRJiaK3pZf7Dk',
        'recouTuUDYWADAv1h',
        'rec3GFESHacXGosb5',
        'recWSixPKsYxpzJqw',
        'reccrPmV7sI6Nk9ws',
        'recC4vfIgZzUQzuuz',
        'recxpX2XSbfMFaZ6J',
        'recVqeLpRG8yw7XjZ',
      ],
      UserCreatorsList: [
        ('recJixYr6ZyhXlT7l', 'recUIZlxl0W84aClN', 'recc05v4kPFnOfy9m'),
      ],
      UserList: [
        ('recgHSN75dVUB6IBx', 'recjGDfvcjUMf3L8O', 'recwjSU9LqOKFiZuv'),
      ],
      admin: 'true',
      date: '2021-07-29T21:05:33.188Z',
      description: "LeagueDay Founder | 'Going for the Turkey' - MacGruber",
      email: 'nick@leagueday.gg',
      heroImg:
        'https://leagueday-prod-images.s3.amazonaws.com/uploads/beach 1.jpg',
      image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/kelseyyt.jpg',
      likedAudio: [
        'reccrPmV7sI6Nk9ws',
        'recxpX2XSbfMFaZ6J',
        'recC4vfIgZzUQzuuz',
        'rec3GFESHacXGosb5',
        'recWSixPKsYxpzJqw',
        'recouTuUDYWADAv1h',
        'recMNRJiaK3pZf7Dk',
        'recjHFYIEHksXoc5J',
        'recoVj8mGxPAptJQn',
        'reccDXcgbVZgOpMoC',
        'recVqeLpRG8yw7XjZ',
      ],
      liveStreamId: 'bXthhO1HODhAx7u003N1aQUX89aGiz02yTKKvOWl6HvVo',
      name: 'Kelsey Moser',
      profileCreated: 'yes',
      rtmpLink: 'rtmps://global-live.mux.com:443/app',
      streamKey: 'e7295a2e-72ad-faef-f288-ba66c822981a',
      userChannel: 'ChannelName',
      userChannelTag: 'channelname',
      userId: 'b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    },
    {
      ChannelLiveData: ['recxA5xhJZlBw0qVo'],
      MyContext: 'Test',
      TwitchUrl: 'nvantzos',
      TwitterUrl: 'nikvantzos',
      UserAudiocasts: [
        'recjHFYIEHksXoc5J',
        'recMNRJiaK3pZf7Dk',
        'recouTuUDYWADAv1h',
        'rec3GFESHacXGosb5',
        'recWSixPKsYxpzJqw',
        'reccrPmV7sI6Nk9ws',
        'recC4vfIgZzUQzuuz',
        'recxpX2XSbfMFaZ6J',
        'recVqeLpRG8yw7XjZ',
      ],
      UserCreatorsList: [
        'recJixYr6ZyhXlT7l',
        'recUIZlxl0W84aClN',
        'recc05v4kPFnOfy9m',
      ],
      UserList: ['recgHSN75dVUB6IBx', 'recjGDfvcjUMf3L8O', 'recwjSU9LqOKFiZuv'],
      admin: 'true',
      date: '2021-07-29T21:05:33.188Z',
      description: "LeagueDay Founder | 'Going for the Turkey' - MacGruber",
      email: 'nick@leagueday.gg',
      heroImg:
        'https://leagueday-prod-images.s3.amazonaws.com/uploads/beach 1.jpg',
      image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/DSC_0051.jpg',
      likedAudio: [
        'reccrPmV7sI6Nk9ws',
        'recxpX2XSbfMFaZ6J',
        'recC4vfIgZzUQzuuz',
        'rec3GFESHacXGosb5',
        'recWSixPKsYxpzJqw',
        'recouTuUDYWADAv1h',
        'recMNRJiaK3pZf7Dk',
        'recjHFYIEHksXoc5J',
        'recoVj8mGxPAptJQn',
        'reccDXcgbVZgOpMoC',
        'recVqeLpRG8yw7XjZ',
      ],
      liveStreamId: 'bXthhO1HODhAx7u003N1aQUX89aGiz02yTKKvOWl6HvVo',
      name: 'Adrian Lawal',
      profileCreated: 'yes',
      rtmpLink: 'rtmps://global-live.mux.com:443/app',
      streamKey: 'e7295a2e-72ad-faef-f288-ba66c822981a',
      userChannel: 'ChannelName',
      userChannelTag: 'channelname',
      userId: 'b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    },
    {
      ChannelLiveData: ['recxA5xhJZlBw0qVo'],
      MyContext: 'Test',
      TwitchUrl: 'nvantzos',
      TwitterUrl: 'nikvantzos',
      UserAudiocasts: [
        ('recjHFYIEHksXoc5J',
        'recMNRJiaK3pZf7Dk',
        'recouTuUDYWADAv1h',
        'rec3GFESHacXGosb5',
        'recWSixPKsYxpzJqw',
        'reccrPmV7sI6Nk9ws',
        'recC4vfIgZzUQzuuz',
        'recxpX2XSbfMFaZ6J',
        'recVqeLpRG8yw7XjZ'),
      ],
      UserCreatorsList: [
        ('recJixYr6ZyhXlT7l', 'recUIZlxl0W84aClN', 'recc05v4kPFnOfy9m'),
      ],
      UserList: [
        ('recgHSN75dVUB6IBx', 'recjGDfvcjUMf3L8O', 'recwjSU9LqOKFiZuv'),
      ],
      admin: 'true',
      date: '2021-07-29T21:05:33.188Z',
      description: "LeagueDay Founder | 'Going for the Turkey' - MacGruber",
      email: 'nick@leagueday.gg',
      heroImg:
        'https://leagueday-prod-images.s3.amazonaws.com/uploads/beach 1.jpg',
      image: 'https://leagueday-prod-images.s3.amazonaws.com/uploads/nick1.jpg',
      likedAudio: [
        ('reccrPmV7sI6Nk9ws',
        'recxpX2XSbfMFaZ6J',
        'recC4vfIgZzUQzuuz',
        'rec3GFESHacXGosb5',
        'recWSixPKsYxpzJqw',
        'recouTuUDYWADAv1h',
        'recMNRJiaK3pZf7Dk',
        'recjHFYIEHksXoc5J',
        'recoVj8mGxPAptJQn',
        'reccDXcgbVZgOpMoC',
        'recVqeLpRG8yw7XjZ'),
      ],
      liveStreamId: 'bXthhO1HODhAx7u003N1aQUX89aGiz02yTKKvOWl6HvVo',
      name: 'Nick Vantzos',
      profileCreated: 'yes',
      rtmpLink: 'rtmps://global-live.mux.com:443/app',
      streamKey: 'e7295a2e-72ad-faef-f288-ba66c822981a',
      userChannel: 'ChannelName',
      userChannelTag: 'channelname',
      userId: 'b33b2ca9-6350-4e6e-aabe-544fc9f9e0c1',
    },
  ],
}

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
    [theme.breakpoints.down('md')]: {},
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
    justifyContent: 'space-between',
    width: '40%'
  },
  friendImg: {
    width: '10%',
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
}))

const MyProfile = ({ userId }) => {
  const { globalList, creatorList, setGlobalList, setCreatorList } = useContext(MyListContext)
  const { userData, loading } = useContext(UserStateContext)
  const baseId = 'appXoertP1WJjd4TQ'
  const apiKey = 'keymd23kpZ12EriVi'
  const base = new Airtable({ apiKey }).base(baseId)
  const [userRecordings, setUserRecordings] = useState([])
  const [liveRecordings, setLiveRecordings] = useState(true)
  const [audiocasts, setAudiocasts] = useState([])
  const [channelSelected, setChannelSelected] = useState(false)
  const [friendSelected, setFriendSelected] = useState(false)
  const [trophieSelected, setTrophieSelected] = useState(false)
  const [creatorsSelected, setCreatorsSelected] = useState(false)
  const [recordToDelete, setRecordToDelete] = useState({})
  const [open, setOpen] = useState(false)
  const {filteredListRecords, creatorList: cl} = getMyList();
  const user = useSelector(selectors.getUser)

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

  const getUserRecordings = () => {
    base('UserAudiocasts')
      .select({
        filterByFormula: `{userId} = '${user?.id}'`,
        view: 'Grid view',
      })
      .eachPage(
        async function page(records, fetchNextPage) {
          setAudiocasts(records)
        },
        function done(err) {
          if (err) {
            console.error(err)
            return
          }
        }
      )

    base('ChannelLiveData')
      .select({
        filterByFormula: `{userId} = '${user?.id}'`,
        view: 'Grid view',
      })
      .eachPage(
        async function page(records, fetchNextPage) {
          setUserRecordings(records)
        },
        function done(err) {
          if (err) {
            console.error(err)
            return
          }
        }
      )
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
  // const gamesArray = currentUserGames?.fields?.channelName?.split(',')
  let countt = 1

  if (loading) {
    return <h1>Loading...</h1>
  }

  const NoobTrophy = ({ classes }) => {
    return (
      <div className={classes.trophyCont}>
        <img className={classes.trophy} src="/img/noobTrophy1.png" alt="" />
        <p>
          <span className={classes.trophyName}>Noob Award</span> <br></br>
          <i>first stream created</i>
        </p>
      </div>
    )
  }

  const PentaTrophy = ({ classes }) => {
    return (
      <div className={classes.trophyCont}>
        <img className={classes.trophy} src="/img/noobTrophy1.png" alt="" />
        <p>
          <span className={classes.trophyName}>Penta Cast</span> <br></br>
          <i>5 streams created</i>
        </p>
      </div>
    )
  }

  const TitanTrophy = ({ classes }) => {
    return (
      <div className={classes.trophyCont}>
        <img className={classes.trophy} src="/img/noobTrophy1.png" alt="" />
        <p>
          {' '}
          <span className={classes.trophyName}>Gamer Audio Titan</span>
          <br></br> <i>10 streams created</i>
        </p>
      </div>
    )
  }

  useEffect(() => {
    if (globalList.length === 0 && filteredListRecords.length > 0) {
      console.log('set channel list ')
      setGlobalList(filteredListRecords)
    }
  }, [filteredListRecords])

  useEffect(() => {
    if (creatorList.length === 0 && cl.length > 0) {
      console.log('set creator list')
      setCreatorList(cl)
    } 
  }, [cl])

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
            {/* <span
              className={
                friendSelected ? classes.selectedButton : classes.sectionButton
              }
              onClick={handleFriendClick}
            >
              Friends
            </span> */}
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
                {cl?.map((item, index) => {
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
                {mockFriends.friends.map((friend, index) => (
                  <div className={classes.friendList} key={index}>
                    <img
                      src={friend.image}
                      alt=""
                      className={classes.friendImg}
                    />
                    <p>{friend.name}</p>
                    <Button
                      className={classes.chatBtn}
                      onClick={() => dispatch(actions.pushHistory('/chat'))}
                    >
                      Chat
                    </Button>
                  </div>
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
