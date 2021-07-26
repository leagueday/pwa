import React, { useState, useContext, useEffect } from 'react'
import ToggleImageButton from '../ToggleImageButton'
import { useDispatch, useSelector } from 'react-redux'
import { actions, constants, selectors } from '../../store'
import { colors } from '../../styling'
import { makeStyles } from '@material-ui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as ThumbsUp } from '@fortawesome/free-regular-svg-icons'
import Airtable from 'airtable'
import useAirtable from '../../api/useAirtable'
import { UserStateContext } from '../../store/stateProviders/userState'

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
    cursor: 'pointer',
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
}))

const baseId = 'appXoertP1WJjd4TQ'
const apiKey = 'keymd23kpZ12EriVi'
const base = new Airtable({ apiKey }).base(baseId)

const AudioCard = ({ audio, indexData, channelTag }) => {
  const { userData, setUserId, handleUnLike, userLikedAudio } = useContext(
    UserStateContext
  )
  const dispatch = useDispatch()
  const classes = useStyles()
  const activeUser = useSelector(selectors.getUser)
  const [count, setCount] = useState()
  const { data } = useAirtable(baseId, 'UserProfile')
  const currentUser = data?.filter(
    user => user?.fields?.userId === activeUser?.id
  )
  const currentUserId = currentUser?.shift()?.id
  const [liked, setLiked] = useState(false)
  const [votedAudio, setVotedAudio] = useState([])
  const audioUrl = useSelector(selectors.getAudioUrl)

  const isSelectedAudio = audioUrl && audioUrl === audio.fields.playbackUrl
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

  const handleLike = () => {
    setLiked(true)
    setCount(count + 1)
    base('UserAudiocasts').update(
      [
        {
          id: audio.id,
          fields: {
            upvotes: audio.fields.upvotes + 1,
            userProfile: [currentUserId],
              // audio?.fields?.userProfile?.length > 0
              //   ? [...audio?.fields?.userProfile, currentUserId]
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err)
          return
        }
        records.forEach(function (record) {
          console.log('liked record  ', record)
        })
      }
    )
  }

  const index = userData?.fields?.likedAudio?.indexOf(audio?.id)
  const toggleUnLike = () => {
    // handleUnLike(audio, currentUserId)
    setLiked(false);
    setCount(count - 1);
    const filtered = votedAudio?.filter(item => item !== currentUserId);
    console.log('avoiding user profiles ',filtered);
    
    base('UserAudiocasts').update(
      [
        {
          id: audio.id,
          fields: {
            upvotes: audio.fields.upvotes - 1,
            userProfile: !!filtered ? filtered : []
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err)
          return
        }
        records.forEach(function (record) {
          console.log('unliked record  ', record)
        })
      }
    )
  }

  useEffect(() => {
    setUserId(activeUser.id)
  }, [])

  useEffect(() => {
    setCount(audio.fields.upvotes)
    if (audio?.fields?.userProfile?.includes(currentUserId)) {
      setLiked(true)
    }
    setVotedAudio(audio?.fields?.userProfile)
  }, [channelTag])

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
          <div className={classes.like}>
            {liked ? (
              <button
                onClick={toggleUnLike}
                className={classes.likeBtn}
                disabled={false}
              >
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  size={'2x'}
                  className={classes.thumbsup}
                />
              </button>
            ) : (
              <button
                onClick={handleLike}
                className={classes.likeBtn}
                disabled={false}
              >
                <FontAwesomeIcon
                  icon={ThumbsUp}
                  size={'2x'}
                  className={classes.thumbsup}
                />
              </button>
            )}
            <p className={classes.count}>{count}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioCard