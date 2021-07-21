import React from 'react'
import ToggleImageButton from '../ToggleImageButton'
import { useDispatch, useSelector } from 'react-redux'
import { actions, constants, selectors } from '../../store'
import { colors } from '../../styling'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  audioCard: {
    width: '15rem',
    height: '18rem',
    border: '.5px solid white',
    borderRadius: '5px',
    marginLeft: '35px',
    marginBottom: '40px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  images: {
    width: '100%',
  },
  thumbnail: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  creatorImg: {
    position: 'absolute',
    borderRadius: '50%',
    width: '30%',
    objectFit: 'cover',
    right: -15,
    top: -15,
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  title: {
    textAlign: 'center',
    fontSize: '100%',
  },
  playBtn: {
    position: 'absolute',
    bottom: -26,
    width: '50%',
    height: '50px',
  },
}))

const AudioCard = ({ audio, indexData }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const audioUrl = useSelector(selectors.getAudioUrl)

  const isSelectedAudio =
    audioUrl && audioUrl === audio.fields.playbackUrl

  const audioMode = useSelector(selectors.getAudioMode)

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
            className={classes.thumbnail}
            src={audio?.fields?.thumbnail}
            alt=""
          />
        </div>
        <div>
          <h4 className={classes.title}>{audio?.fields?.title}</h4>
        </div>
        <ToggleImageButton
          className={classes.playBtn}
          size="5vw"
          on={isPlayings}
          onClick={onPopClick}
          onImage="/img/logo_live_pause.png"
          offImage="/img/logo_live_play.png"
          shadowColor={colors.lightGray}
        />
      </div>
    </div>
  )
}

export default AudioCard
