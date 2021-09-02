import React, { useState, useMemo, useEffect } from 'react'
import ToggleImageButton from '../ToggleImageButton'
import LikeButton from '../LikeButton'
import { useDispatch, useSelector } from 'react-redux'
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
  content: ({ primaryColor = colors.blue }) =>
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
  audioThumbnail: {
    maxHeight: '15rem',
    maxWidth: '15rem',
    width: '90%',
    marginBottom: 20,
    height: '90%',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      height: '40%',
      width: '40%',
    },
  },
  audiocastInfo: {
    background: '#111',
    minHeight: '350px',
    height: '45%',
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
  sideColumn: {
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
    top: 30,
    right: '45%',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
      transform: 'translateX(45%)',
    },
  }),
  sendIcon: {
    position: 'absolute',
    top: 50,
    right: '41%',
    cursor: 'pointer',
    color: colors.blue,
    '&:hover': {
      color: theme.palette.primary.active,
    },
    [theme.breakpoints.down('sm')]: {
      right: '4%',
    },
  },
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
  commentImg: {
    position: 'absolute',
    top: 50,
    left: 5,
    height: '2rem',
    width: '2rem',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  toggleChatBtn: {
    background: colors.blue,
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    marginBottom: 10,
  },
}))

const baseId = 'appXoertP1WJjd4TQ'

const AudiocastScreen = ({ audiocastId }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const dispatch = useDispatch()
  const [audiocast, setAudiocast] = useState()
  const [sideColumn, setSideColumn] = useState([])
  const [selectedDuration, setSelectedDuration] = useState()
  const [partyChat, setPartyChat] = useState(true)
  const [qA, setQA] = useState(false)
  const [live, setLive] = useState(false)
  const classes = useStyles({ live })
  const [message, setMessage] = useState('')
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
                      width: '100%',
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
                    <b
                      className={
                        qA ? classes.chatOptionSelected : classes.chatOption
                      }
                      onClick={() => {
                        setPartyChat(false)
                        setQA(true)
                      }}
                    >
                      Q&A
                    </b>
                  </>
                ) : (
                  <b className={classes.chatOptionSelected}>Comments</b>
                )}
              </div>
              <div className={classes.chatRoom}></div>
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
                  <b
                    className={
                      qA ? classes.chatOptionSelected : classes.chatOption
                    }
                    onClick={() => {
                      setPartyChat(false)
                      setQA(true)
                    }}
                  >
                    Q&A
                  </b>
                </>
              ) : (
                <b className={classes.chatOptionSelected}>Comments</b>
              )}
            </div>
            <div className={classes.chatRoom}></div>
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
