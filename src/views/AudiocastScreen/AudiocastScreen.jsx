import React, { useState, useMemo, useEffect, useContext, useRef } from 'react'
import ToggleImageButton from '../ToggleImageButton'
import axios from 'axios'
import LikeButton from '../LikeButton'
import { ChatStateContext } from '../../store/stateProviders/useChat'
import { useDispatch, useSelector } from 'react-redux'
import SocketIOClient from 'socket.io-client'
import PlusMinusBtn from '../CreatorTilesRow/PlusMinusBtn'
import BasicLayout from '../BasicLayout'
import { addScrollStyle } from '../util'
import { TextField } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { actions, constants, selectors } from '../../store'
import { colors } from '../../styling'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { LinkedIn, Twitter, Facebook, Email } from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import Modal from '@material-ui/core/Modal'
import { maybeHmsToSecondsOnly, formatSecondsDuration } from '../dateutil'

const useStyles = makeStyles((theme, live) => ({
  contentt: ({ primaryColor = colors.blue }) =>
    addScrollStyle(
      primaryColor,
      theme
    )({
      overflow: 'auto',
      width: '100%',
      height: '100%',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    }),
  content: {
    // overflow: 'auto',
    width: '100%',
    height: '100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  audioThumbnail: {
    maxHeight: '15rem',
    maxWidth: '15rem',
    width: '50%',
    marginBottom: 20,
    height: '50%',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      height: '40%',
      width: '40%',
    },
  },
  audiocastInfo: {
    background: '#111',
    height: 'auto',
    display: 'flex',
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      minHeight: '70%',
      height: 'auto',
      flexDirection: 'column',
    },
  },
  audiocastCreds: {
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  castTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  sideColumn: {
    width: '20%',
  },
  creator: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  creatorNameImg: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    display: 'flex',
    padding: '0px 15px',
    borderRadius: '70px',
    cursor: 'pointer',
    background: colors.darkGray,
    '&:hover': {
      background: colors.lightGray,
    },
  },
  userImg: {
    height: '3rem',
    width: '3rem',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  creatorName: {
    fontSize: '1rem',
    paddingleft: '25px',
    opacity: 0.8,
  },
  likeShare: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  shareBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  playBtnModal: {
    margin: '0 10px',
    height: '40px',
  },
  sideColumnn: {
    background: colors.darkerGray,
    maxWidth: '25%',
    minWidth: '320px',
    borderLeft: `1px solid ${colors.white30}`,
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      width: '100%',
      maxWidth: '100%',
    },
  },
  sideColumn: ({ primaryColor = colors.blue }) =>
    addScrollStyle(
      primaryColor,
      theme
    )({
      overflowX: 'hidden',
      overflow: 'scroll',
      background: colors.darkerGray,
      maxWidth: '25%',
      minWidth: '320px',
      borderLeft: `1px solid ${colors.white30}`,
      [theme.breakpoints.down('sm')]: {
        height: 'auto',
        width: '100%',
        maxWidth: '100%',
      },
    }),
  sideCast: {
    height: '100px',
    zIndex: 100,
    cursor: 'pointer',
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    borderTop: `1px solid ${colors.white30}`,
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(103%)',
    },
  },
  sideCastImg: {
    height: '4rem',
    width: '4rem',
    marginRight: 15,
    objectFit: 'cover',
  },
  chatAndCast: {
    height: '100%',
    width: '100%',
    minWidth: '70%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      background: '#111',
    },
  },
  sideCastTitle: {
    padding: '10% 0',
    textOverflow: 'ellipsis',
  },
  dateAndDesc: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  chatBox: {
    minHeight: '55%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {},
  },
  chatOptions: {
    display: 'flex',
    justifyContent: 'space-evenly',
    borderBottom: `.5px solid ${colors.white30}`,
    [theme.breakpoints.down('sm')]: {},
  },
  chatOption: {
    cursor: 'pointer',
    padding: '3px 15px',
  },
  chatRoom: ({ primaryColor = colors.blue }) =>
    addScrollStyle(
      primaryColor,
      theme
    )({
      overflowY: 'scroll',
      overflowX: 'hidden',
      minHeight: '90%',
    }),
  chatOptionSelected: {
    cursor: 'pointer',
    padding: '3px 15px',
    borderBottom: `2px solid ${colors.magenta}`,
  },
  message: ({ live }) => ({
    position: 'absolute',
    top: live ? '' : 30,
    bottom: live ? 5 : '',
    transform: live ? 'translateX(45%)' : '',
    right: '45%',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
      transform: 'translateX(45%)',
    },
  }),
  sendIcon: ({ live }) => ({
    position: 'absolute',
    top: live ? '' : 50,
    bottom: live ? 0 : '',
    right: live ? '19%' : '41%',
    cursor: 'pointer',
    color: colors.blue,
    '&:hover': {
      color: theme.palette.primary.active,
    },
    [theme.breakpoints.down('sm')]: {
      right: '4%',
    },
  }),
  commentImg: ({ live }) => ({
    position: 'absolute',
    top: live ? '' : 50,
    bottom: live ? 2 : '',
    left: live ? '23%' : 5,
    height: '2rem',
    width: '2rem',
    borderRadius: '50%',
    objectFit: 'cover',
  }),
  linkModalWrapper: {
    position: 'absolute',
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#f7f7f7',
    boxShadow: theme.shadows[5],
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    borderRadius: '5px',
    height: '12%',
  },
  toggleChatBtn: {
    background: colors.blue,
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    marginBottom: 10,
  },
  chat: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'black',
  },
  Uchat: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    color: 'black',
  },
  uText: {
    maxWidth: '50%',
    marginRight: '2%',
    borderRadius: '10px',
    background: colors.blue,
    padding: '1%',
  },
  text: {
    maxWidth: '50%',
    marginLeft: '2%',
    borderRadius: '10px',
    background: colors.white80,
    padding: '1%',
  },
}))

const baseId = 'appXoertP1WJjd4TQ'

const AudiocastScreen = ({ audiocastId }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const dispatch = useDispatch()
  const [audiocast, setAudiocast] = useState()
  const { message, setMessage, allChats, getMessages } = useContext(
    ChatStateContext
  )
  const [sideColumn, setSideColumn] = useState([])
  const [selectedDuration, setSelectedDuration] = useState()
  const [partyChat, setPartyChat] = useState(true)
  const [qA, setQA] = useState(false)
  const [live, setLive] = useState(false)
  const classes = useStyles({ live })
  const [linkOpen, setLinkOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [chatSelected, setChatSelected] = useState(false)

  const audioMode = useSelector(selectors.getAudioMode)
  const audioUrl = useSelector(selectors.getAudioUrl)
  const currentUser = useSelector(selectors.getUserData)
  const currentUserId = currentUser?.id

  const isSelectedAudio = audioUrl && audioUrl === audiocast.fields.playbackUrl
  const duration = maybeHmsToSecondsOnly(selectedDuration)
  const durationLabel = useMemo(() => formatSecondsDuration(duration), [
    duration,
  ])

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = SocketIOClient('https://leagueday-api.herokuapp.com', {
      query: audiocastId,
    })
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  useEffect(() => {
    socket?.on('new_chat', () => {
      console.log('triggered new chat ')
      getMessages(audiocastId)
    })

    return () => {
      socket?.off('new_chat', () => {
        getMessages(audiocastId)
      })
    }
  }, [socket])

  const au = document.createElement('audio')

  au.src = audiocast?.fields?.playbackUrl

  au.addEventListener(
    'loadedmetadata',
    function () {
      const duration = au.duration

      setSelectedDuration(duration)
    },
    false
  )

  const openLinkModal = () => {
    setLinkOpen(true)
  }

  const closeLinkModal = () => {
    setLinkOpen(false)
  }

  const sendChat = e => {
    e.preventDefault()
    axios
      .post('https://leagueday-api.herokuapp.com/chats/create', {
        userId: currentUser?.fields?.userId,
        roomId: audiocastId,
        message: message,
        image: currentUser?.fields?.image
          ? currentUser?.fields?.image
          : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues=',
      })
      .then(res => {
        socket.emit('new_chat', { message })
        setMessage('')
        console.log('sent message ', res)
      })
      .catch(err => {
        console.log('message send error ', err)
      })
  }

  useEffect(() => {
    if (!isNaN(audiocastId)) {
      fetch('/.netlify/functions/airtable-getprofile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: `${baseId}/UserAudiocasts`,
        }),
      })
        .then(response => response.json())
        .then(function (response) {
          setAudiocast(
            response.records.filter(
              item => item.fields.audiocastId === audiocastId * 1
            )[0]
          )
        })
        .catch(error => {
          console.log('error while data fetching', error)
        })
    } else {
      setLive(true)
      let urladd = `filterByFormula={liveStreamId}='${audiocastId}'&sort%5B0%5D%5Bfield%5D=uploadDate&sort%5B0%5D%5Bdirection%5D=desc`
      fetch('/.netlify/functions/commingsoon-proxy', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: `${baseId}/ChannelLiveData?${urladd}` }),
      })
        .then(response => response.json())
        .then(function (response) {
          setAudiocast(response.records[0])
        })
        .catch(error => {
          console.log('error from LiveStream.jsx', error)
        })
    }
    fetch('/.netlify/functions/airtable-getprofile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `${baseId}/UserAudiocasts`,
      }),
    })
      .then(response => response.json())
      .then(function (response) {
        setSideColumn(
          response.records.filter(
            item => item.fields.audiocastId !== audiocastId * 1
          )
        )
      })
      .catch(error => {
        console.log('error while data fetching', error)
      })
  }, [audiocastId])

  const isPlayings = isSelectedAudio && audioMode === constants.AUDIO_MODE_PLAY

  const onPopClick = isPlayings
    ? ev => {
        dispatch(actions.pauseAudio())
        ev.stopPropagation()
      }
    : ev => {
        if (isSelectedAudio) dispatch(actions.playAudio())
        else {
          dispatch(
            actions.selectAudio(
              '',
              '',
              '',
              audiocast.fields.playbackUrl,
              '',
              '',
              ''
            )
          )
          dispatch(actions.playAudio())
        }
        ev.stopPropagation()
      }

  const messageEl = useRef(null)

  const scrollToBottom = () => {
    messageEl?.current?.scrollIntoView({ behavior: 'auto' })
  }

  useEffect(scrollToBottom, [allChats])

  useEffect(() => {
    getMessages(audiocastId)
  }, [audiocastId])

  const listener = event => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      sendChat()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  return (
    <BasicLayout>
      <div className={classes.content}>
        <div className={classes.chatAndCast}>
          <div className={classes.audiocastInfo}>
            <div
              style={{
                margin: 0,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img
                  className={classes.audioThumbnail}
                  src={audiocast?.fields?.thumbnail}
                  alt=""
                />
                {smDown && (
                  <h3 className={classes.castTitle}>
                    {audiocast?.fields?.title}
                  </h3>
                )}
                <div className={classes.likeShare}>
                  <ToggleImageButton
                    className={classes.playBtnModal}
                    size="2vw"
                    on={isPlayings}
                    onClick={onPopClick}
                    onImage="/img/logo_live_pause.png"
                    offImage="/img/logo_live_play.png"
                    shadowColor={colors.lightGray}
                  />
                  <div className={classes.shareBtn}>
                    <LikeButton
                      size={'24px'}
                      userId={currentUserId}
                      channelTag={audiocast?.fields?.channelTag}
                      audio={audiocast}
                    />
                    <FontAwesomeIcon
                      style={{
                        fontSize: '24px',
                        marginRight: 20,
                        cursor: 'pointer',
                      }}
                      fontSize={'inherit'}
                      icon={faShareSquare}
                      onClick={openLinkModal}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Modal
              open={linkOpen}
              onClose={closeLinkModal}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div className={classes.linkModalWrapper}>
                <a
                  target="_blank"
                  href={`https://www.facebook.com/sharer.php?u=https%3A%2F%2Fapp.leagueday.gg/channel/${audiocast?.fields?.channelTag}`}
                  style={{ color: colors.blue }}
                >
                  <Facebook />
                </a>{' '}
                <a
                  target="_blank"
                  href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fapp.leagueday.gg/channel/${audiocast?.fields?.channelTag}`}
                  style={{ color: colors.blue }}
                >
                  <Twitter />{' '}
                </a>{' '}
                <a
                  target="_blank"
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fapp.leagueday.gg/channel/${audiocast?.fields?.channelTag}`}
                  style={{ color: colors.blue }}
                >
                  <LinkedIn />
                </a>
                <a
                  style={{ color: colors.blue }}
                  href={`mailto:?body= Check out this LeagueDay channel page! https://app.leagueday.gg/channel/${audiocast?.fields?.channelTag}`}
                  target="_blank"
                >
                  {' '}
                  <Email />
                </a>
                <p
                  style={{ color: 'black', fontSize: '90%', cursor: 'pointer' }}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setCopied(true)
                  }}
                >
                  {!copied ? 'Copy link' : 'Copied!'}
                </p>
              </div>
            </Modal>
            <div className={classes.audiocastCreds}>
              <div className={classes.audioDescription}>
                <div className={classes.dateAndDesc}>
                  <div
                    className={classes.creator}
                    onClick={() =>
                      dispatch(
                        actions.pushHistory(
                          `/profile/${audiocast?.fields?.userId}`
                        )
                      )
                    }
                  >
                    <div className={classes.creatorNameImg}>
                      <img
                        className={classes.userImg}
                        src={audiocast?.fields?.creatorImg}
                        alt=""
                      />
                      <p className={classes.creatorName}>
                        {audiocast?.fields?.username}
                      </p>
                    </div>
                    <PlusMinusBtn
                      size="2rem"
                      className={classes.plusMinusButton}
                      userId={audiocast?.fields?.userId[0]}
                      creator={audiocast?.fields}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: smDown ? '100%' : '50%',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <p style={{ color: colors.white80 }}>
                      Date:{' '}
                      <span style={{ color: colors.yellow, opacity: 0.8 }}>
                        {audiocast?.fields?.uploadDate}
                      </span>
                    </p>
                    {!live && (
                      <p style={{ color: colors.white80 }}>
                        Duration:{' '}
                        <span style={{ color: colors.yellow, opacity: 0.8 }}>
                          {durationLabel}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                {!smDown && (
                  <h3 className={classes.castTitle}>
                    {audiocast?.fields?.title}
                  </h3>
                )}
                <p
                  style={{
                    fontSize: smDown ? '1rem' : '20px',
                    fontWeight: 300,
                  }}
                >
                  Description: {audiocast?.fields?.description}
                </p>
              </div>
            </div>
          </div>
          {!smDown && (
            <div className={classes.chatBox}>
              <div className={classes.chatOptions}>
                {live ? (
                  <>
                    <b
                      className={
                        partyChat
                          ? classes.chatOptionSelected
                          : classes.chatOption
                      }
                      onClick={() => {
                        setPartyChat(true)
                        setQA(false)
                      }}
                    >
                      Party Chat
                    </b>
                    {/* <b
                      className={
                        qA ? classes.chatOptionSelected : classes.chatOption
                      }
                      onClick={() => {
                        setPartyChat(false)
                        setQA(true)
                      }}
                    >
                      Q&A
                    </b> */}
                  </>
                ) : (
                  <b className={classes.chatOptionSelected}>Comments</b>
                )}
              </div>
              <div className={classes.chatRoom}>
                {allChats?.map((chat, ind) => (
                  <div
                    className={
                      chat?.authorId === currentUser?.fields?.userId
                        ? classes.Uchat
                        : classes.chat
                    }
                    key={ind}
                  >
                    <img
                      className={classes.chatImg}
                      src={chat?.authorImg}
                      alt=""
                    />
                    <p
                      className={
                        chat?.authorId === currentUser?.fields?.userId
                          ? classes.uText
                          : classes.text
                      }
                    >
                      {chat?.message}
                    </p>
                  </div>
                ))}
                <div ref={messageEl} />
              </div>
              <form onSubmit={sendChat}>
                <img
                  src={currentUser?.fields?.image}
                  className={classes.commentImg}
                />
                <TextField
                  type="text"
                  label={!live ? 'Add a Comment' : 'Send a Chat'}
                  name="Comment"
                  className={classes.message}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={listener}
                  onSubmit={listener}
                />
                <button
                  type="submit"
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                  }}
                  onClick={event => sendChat(audiocastId, socket)}
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={classes.sendIcon}
                    size={'2x'}
                  />
                </button>
              </form>
            </div>
          )}
        </div>
        {smDown && (
          <Button
            onClick={() => setChatSelected(!chatSelected)}
            className={classes.toggleChatBtn}
          >
            {chatSelected
              ? 'Explore Audiocasts'
              : live && !chatSelected
              ? 'See Party Chat'
              : 'See Comments'}
          </Button>
        )}
        {chatSelected && (
          <div className={classes.chatBox}>
            <div className={classes.chatOptions}>
              {live ? (
                <>
                  <b
                    className={
                      partyChat
                        ? classes.chatOptionSelected
                        : classes.chatOption
                    }
                    onClick={() => {
                      setPartyChat(true)
                      setQA(false)
                    }}
                  >
                    Party Chat
                  </b>
                  {/* <b
                    className={
                      qA ? classes.chatOptionSelected : classes.chatOption
                    }
                    onClick={() => {
                      setPartyChat(false)
                      setQA(true)
                    }}
                  >
                    Q&A
                  </b> */}
                </>
              ) : (
                <b className={classes.chatOptionSelected}>Comments</b>
              )}
            </div>
            <div className={classes.chatRoom}>
              {allChats?.map((chat, ind) => (
                <div
                  className={
                    chat?.authorId === user?.id ? classes.Uchat : classes.chat
                  }
                  key={ind}
                >
                  <img
                    className={classes.chatImg}
                    src={chat?.authorImg}
                    alt=""
                  />
                  <p
                    className={
                      chat?.authorId === user?.id ? classes.uText : classes.text
                    }
                  >
                    {chat?.message}
                  </p>
                </div>
              ))}
            </div>
            <form onSubmit={e => e.preventDefault()}>
              <img
                src={currentUser?.fields?.image}
                className={classes.commentImg}
              />
              <TextField
                type="text"
                label={!live ? 'Add a Comment' : 'Send a Chat'}
                name="Comment"
                className={classes.message}
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <button
                type="submit"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                }}
                onClick={event => sendChat(event, audiocastId, socket)}
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className={classes.sendIcon}
                  size={'2x'}
                />
              </button>
            </form>
          </div>
        )}
        {!chatSelected && (
          <div className={classes.sideColumn}>
            {sideColumn?.map((audio, key) => (
              <div
                key={key}
                className={classes.sideCast}
                onClick={() =>
                  dispatch(
                    actions.pushHistory(
                      `/audiocast/${audio?.fields?.audiocastId}`
                    )
                  )
                }
              >
                <img
                  src={audio.fields.thumbnail}
                  alt=""
                  className={classes.sideCastImg}
                />
                <p className={classes.sideCastTitle}>{audio?.fields?.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </BasicLayout>
  )
}

export default AudiocastScreen
