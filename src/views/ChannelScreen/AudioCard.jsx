import React, { useState, useContext, useEffect } from 'react'
import ToggleImageButton from '../ToggleImageButton'
import LikeButton from '../LikeButton'
import { useDispatch, useSelector } from 'react-redux'
import { actions, constants, selectors } from '../../store'
import { colors } from '../../styling'
import { makeStyles } from '@material-ui/styles'
import Airtable from 'airtable'
import useAirtable from '../../api/useAirtable'
import Modal from '@material-ui/core/Modal'
import { UserStateContext } from '../../store/stateProviders/userState'

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
  thumbnail: {
    cursor: 'pointer',
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  creatorImg: {
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
    width: '20%',
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
    width: '50%',
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
    height: '60%',
  },
  audioDescription: {},
  userImg: {
    borderRadius: '50%',
    objectFit: 'cover',
    height: '7rem',
    width: '7rem',
  },
  audioThumbnail: {
    width: '45%',
    minWidth: 400,
    maxHeight: 250,
    borderRadius: '5px',
    objectFit: 'cover',
  },
  images: {
    display: 'flex',
    alignItem: 'flex-start',
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
}))

const baseId = 'appXoertP1WJjd4TQ'
const apiKey = 'keymd23kpZ12EriVi'
const base = new Airtable({ apiKey }).base(baseId)

const AudioCard = ({ audio, indexData, channelTag }) => {
  // const { userData, setUserId } = useContext(UserStateContext)
  const dispatch = useDispatch()
  const classes = useStyles()
  const activeUser = useSelector(selectors.getUser)
  const { data } = useAirtable(baseId, 'UserProfile')
  const currentUser = data?.filter(
    user => user?.fields?.userId === activeUser?.id
  )
  const currentUserId = currentUser?.shift()?.id
  const audioUrl = useSelector(selectors.getAudioUrl)
  const [open, setOpen] = useState(false)
  const isSelectedAudio = audioUrl && audioUrl === audio.fields.playbackUrl
  const audioMode = useSelector(selectors.getAudioMode)

  const isPlayings = isSelectedAudio && audioMode === constants.AUDIO_MODE_PLAY

  const handleModalClose = () => {
    setOpen(false)
  }

  const handleModalOpen = () => {
    setOpen(true)
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
        <div className={classes.images}>
          <img
            className={classes.creatorImg}
            src={audio?.fields?.creatorImg}
            alt=""
            onClick={() =>
              dispatch(actions.pushHistory(`/profile/${audio?.fields?.userId}`))
            }
          />
          <img
            onClick={handleModalOpen}
            className={classes.thumbnail}
            src={audio?.fields?.thumbnail}
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
            <div className={classes.images}>
              <img
                className={classes.audioThumbnail}
                src={audio?.fields?.thumbnail}
                alt=""
              />
              <div className={classes.creatorCreds}>
                <div className={classes.createdBy} onClick={() => dispatch(actions.pushHistory(`/profile/${audio?.fields?.userId}`))}>
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
                <p style={{ color: colors.white80 }}>{audio?.fields?.uploadDate}</p>
                <p style={{ color: colors.white80 }}>Duration: </p>
              </div>
            </div>
            <div className={classes.audioDescription}>
              <h3>{audio?.fields?.title}</h3>
              <h5>{audio?.fields?.description}</h5>
            </div>
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
          </div>
        </Modal>
        <div>
          <h4 className={classes.title}>{audio?.fields?.title}</h4>
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
