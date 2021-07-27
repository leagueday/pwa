import React, { useState, useEffect } from 'react'
import Airtable from 'airtable'
import { makeStyles } from '@material-ui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as ThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { colors } from '../styling'
const useStyles = makeStyles(theme => ({
  like: {
    width: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
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
}));

const baseId = 'appXoertP1WJjd4TQ'
const apiKey = 'keymd23kpZ12EriVi'
const base = new Airtable({ apiKey }).base(baseId)

const LikeButton = ({ audio, channelTag, userId }) => {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState()
  const [votedAudio, setVotedAudio] = useState([])
  const classes = useStyles()

  const handleLike = (e) => {
    setLiked(true)
    setCount(count + 1)
    if (audio.fields.type === 'audiocast') {
      base('UserAudiocasts').update(
        [
          {
            id: audio.id,
            fields: {
              upvotes: audio.fields.upvotes + 1,
              userProfile: !!audio?.fields?.userProfile
                ? [...audio?.fields?.userProfile, currentUserId]
                : [currentUserId],
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
    } else if (audio.fields.type === 'livestream') {
      base('ChannelLiveData').update(
        [
          {
            id: audio.id,
            fields: {
              upvotes: audio.fields.upvotes + 1,
              userProfile: !!audio?.fields?.userProfile
                ? [...audio?.fields?.userProfile, userId]
                : [userId],
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
  }

  const toggleUnLike = (e) => {
    setLiked(false)
    setCount(count - 1)
    const filtered = votedAudio?.filter(item => item !== userId)
    if (audio.fields.type === 'audiocast') {
      base('UserAudiocasts').update(
        [
          {
            id: audio.id,
            fields: {
              upvotes: audio.fields.upvotes - 1,
              userProfile: !!filtered ? filtered : [],
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
    } else if (audio.fields.type === 'livestream') {
      base('ChannelLiveData').update(
        [
          {
            id: audio.id,
            fields: {
              upvotes: audio.fields.upvotes - 1,
              userProfile: !!filtered ? filtered : [],
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
  }

  useEffect(() => {
    setCount(audio?.fields?.upvotes)
    setLiked(audio?.fields?.userProfile?.includes(userId))
    setVotedAudio(audio?.fields?.userProfile)
  }, [channelTag, audio])

  return (
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
  )
}

export default LikeButton
