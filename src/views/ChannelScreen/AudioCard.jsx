import React, { useState, useContext, useEffect, useMemo } from 'react'
import ToggleImageButton from '../ToggleImageButton'
import LikeButton from '../LikeButton'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { actions, constants, selectors } from '../../store'
import { colors } from '../../styling'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Airtable from 'airtable'
import { LinkedIn, Twitter, Facebook, Email } from '@material-ui/icons'
import LinkIcon from '@material-ui/icons/Link'
import useAirtable from '../../api/useAirtable'
import Modal from '@material-ui/core/Modal'
import { UserStateContext } from '../../store/stateProviders/userState'
import { maybeHmsToSecondsOnly, formatSecondsDuration } from '../dateutil'

const useStyles = makeStyles(theme => ({
  audioCard: {
    width: '15rem',
    height: '18rem',
    border: '.5px solid white',
    borderRadius: '5px',
    marginLeft: '35px',
    marginBottom: '32%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  images: {
    width: '100%',
  },
  modalImages: {
    width: '100%',
    display: 'flex',
    alignItem: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      // marginTop: '50%',
      display: 'none',
    },
  },
  thumbnail: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  creatorImg: {
    zIndex: 100,
    cursor: 'pointer',
    position: 'absolute',
    borderRadius: '50%',
    width: '5rem',
    height: '5rem',
    objectFit: 'cover',
    right: -15,
    top: -15,
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  title: {
    margin: 0,
    padding: 0,
    textAlign: 'center',
    fontSize: '100%',
  },
  playBtn: {
    width: '50%',
    height: '50px',
  },
  playBtnModal: {
    width: '50%',
    height: '50px',
  },
  playLike: {
    position: 'absolute',
    bottom: -86,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  count: {
    fontWeight: 900,
  },
  thumbsup: {
    cursor: 'pointer',
    color: colors.blue,
  },
  likeBtn: {
    background: 'transparent',
    outline: 'none',
    border: 'none',
  },
  modalWrapper: {
    position: 'absolute',
    minWidth: '50%',
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
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '90%',
      overflow: 'auto',
      width: '100%',
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
  userImg: {
    borderRadius: '50%',
    objectFit: 'cover',
    height: '7rem',
    width: '7rem',
  },
  audioThumbnail: {
    width: '40%',
    minWidth: 350,
    maxHeight: 250,
    borderRadius: '5px',
    objectFit: 'contain',
    borderRadius: '5px',
  },
  userName: {
    padding: 0,
    margin: 5,
    color: colors.yellow,
  },
  creatorCreds: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '5%',
    minWidth: 400,
  },
  createdBy: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  expandModal: {
    zIndex: 100,
    border: 'none',
    outline: 'none',
    position: 'absolute',
    top: '30%',
    transform: 'translateX(-50%)',
    left: '50%',
    padding: '10 20',
    width: '25%',
    borderRadius: '70px',
    background: colors.blue,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
  },
  likeShare: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '100%',
    },
  },
  shareBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    cursor: 'pointer',
    width: '50%',
  },
  audioDescription: {
    overflow: 'visible',
    [theme.breakpoints.down('sm')]: {
      marginTop: 'auto',
    },
  }
}))

const baseId = 'appXoertP1WJjd4TQ'

const AudioCard = ({ audio, indexData, channelTag }) => {
  // const { userData, setUserId } = useContext(UserStateContext)
  const dispatch = useDispatch()
  const classes = useStyles()
  const activeUser = useSelector(selectors.getUser)
  const { data } = useAirtable(baseId, 'UserProfile')
  const currentUser = data?.filter(
    user => user?.fields?.userId === activeUser?.id
  )
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const currentUserId = currentUser?.shift()?.id
  const audioUrl = useSelector(selectors.getAudioUrl)
  const [open, setOpen] = useState(false)
  const [linkOpen, setLinkOpen] = useState(false)
  const isSelectedAudio = audioUrl && audioUrl === audio.fields.playbackUrl
  const audioMode = useSelector(selectors.getAudioMode)
  const [selectedDuration, setSelectedDuration] = useState()
  const [seeMore, setSeeMore] = useState(false)
  const [copied, setCopied] = useState(false)
  const duration = maybeHmsToSecondsOnly(selectedDuration)

  const durationLabel = useMemo(() => formatSecondsDuration(duration), [
    duration,
  ])

  const isPlayings = isSelectedAudio && audioMode === constants.AUDIO_MODE_PLAY

  const au = document.createElement('audio')

  au.src = audio?.fields?.playbackUrl

  au.addEventListener(
    'loadedmetadata',
    function () {
      const duration = au.duration

      setSelectedDuration(duration)
    },
    false
  )

  const handleModalClose = () => {
    setOpen(false)
  }

  const handleModalOpen = () => {
    setOpen(true)
  }

  const openLinkModal = () => {
    setLinkOpen(true)
  }

  const closeLinkModal = () => {
    setLinkOpen(false)
  }

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
              audio.fields.playbackUrl,
              indexData,
              '',
              ''
            )
          )
          dispatch(actions.playAudio())
        }
        ev.stopPropagation()
      }

  return (
    <div>
      <div className={classes.audioCard}>
        <div className={classes.images} onMouseLeave={!sm ? () => setSeeMore(false) : null}>
          {seeMore && (
            <Button
              onMouseOpen={() => setSeeMore(true)}
              className={classes.expandModal}
              onClick={handleModalOpen}
            >
              More
            </Button>
          )}
          <img
            className={classes.creatorImg}
            src={audio?.fields?.creatorImg}
            alt=""
            style={{}}
            onClick={() =>
              dispatch(actions.pushHistory(`/profile/${audio?.fields?.userId}`))
            }
          />
          <img
            onMouseEnter={!sm ? () => setSeeMore(true) : null}
            className={classes.thumbnail}
            src={audio?.fields?.thumbnail}
            onClick={handleModalOpen}
            style={{
              filter: seeMore ? 'brightness(50%)' : '',
            }}
            alt=""
          />
        </div>
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.modalWrapper}>
            <div className={classes.modalImages}>
              <img
                className={classes.audioThumbnail}
                src={audio?.fields?.thumbnail}
                alt=""
              />
              <div className={classes.creatorCreds}>
                <div
                  className={classes.createdBy}
                  onClick={() =>
                    dispatch(
                      actions.pushHistory(`/profile/${audio?.fields?.userId}`)
                    )
                  }
                >
                  <img
                    className={classes.userImg}
                    src={audio?.fields?.creatorImg}
                    alt=""
                  />
                  <p style={{ opacity: 0.8, marginLeft: 15 }}>
                    By:
                    <span className={classes.userName}>
                      {audio?.fields?.username}
                    </span>
                  </p>
                </div>
                <p style={{ color: colors.white80 }}>
                  Date:{' '}
                  <span style={{ color: colors.yellow, opacity: 0.8 }}>
                    {audio?.fields?.uploadDate}
                  </span>
                </p>
                <p style={{ color: colors.white80 }}>
                  Duration:{' '}
                  <span style={{ color: colors.yellow, opacity: 0.8 }}>
                    {durationLabel}
                  </span>
                </p>
              </div>
            </div>
            <div className={classes.audioDescription}>
              <p style={{ fontSize: '20px', fontWeight: 300 }}>
                <span style={{ fontWeight: 900 }}>Title: </span>
                {audio?.fields?.title}
              </p>
              <p style={{ fontSize: '20px', fontWeight: 300 }}>
                <span style={{ fontWeight: 900 }}>Description: </span>
                {audio?.fields?.description}
              </p>
            </div>
            <div>
              <div className={classes.likeShare}>
                <ToggleImageButton
                  className={classes.playBtnModal}
                  size="1vw"
                  on={isPlayings}
                  onClick={onPopClick}
                  onImage="/img/logo_live_pause.png"
                  offImage="/img/logo_live_play.png"
                  shadowColor={colors.lightGray}
                />

                <LikeButton
                  size={'32px'}
                  userId={currentUserId}
                  channelTag={channelTag}
                  audio={audio}
                />
                <div
                  className={classes.shareBtn}
                  onClick={openLinkModal}
                >
                  <LinkIcon style={{ fontSize: '32px' }} fontSize={'inherit'} />
                  <p style={{ padding: 0, margin: 0 }}> Share Link</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={linkOpen}
          onClose={closeLinkModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.linkModalWrapper}>
            <a
              target="_blank"
              href={`https://www.facebook.com/sharer.php?u=https%3A%2F%2Fapp.leagueday.gg/channel/${audio?.fields?.channelTag}`}
              style={{ color: colors.blue }}
            >
              <Facebook />
            </a>{' '}
            <a
              target="_blank"
              href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fapp.leagueday.gg/channel/${audio?.fields?.channelTag}`}
              style={{ color: colors.blue }}
            >
              <Twitter />{' '}
            </a>{' '}
            <a
              target="_blank"
              href={`https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fapp.leagueday.gg/channel/${audio?.fields?.channelTag}`}
              style={{ color: colors.blue }}
            >
              <LinkedIn />
            </a>
            <a
              style={{ color: colors.blue }}
              href={`mailto:?body= Check out this LeagueDay channel page! https://app.leagueday.gg/channel/${audio?.fields?.channelTag}`}
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
        <div>
          <h4
            style={{ filter: seeMore ? 'brightness(50%)' : '' }}
            className={classes.title}
          >
            {audio?.fields?.title}
          </h4>
        </div>
        <div className={classes.playLike}>
          <ToggleImageButton
            className={classes.playBtn}
            size="5vw"
            on={isPlayings}
            onClick={onPopClick}
            onImage="/img/logo_live_pause.png"
            offImage="/img/logo_live_play.png"
            shadowColor={colors.lightGray}
          />
          <LikeButton
            userId={currentUserId}
            channelTag={channelTag}
            audio={audio}
          />
        </div>
      </div>
    </div>
  )
}

export default AudioCard
