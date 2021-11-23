import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
import { Button, Modal } from '@mui/material';
import { actions, selectors } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as ThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../styling';
const useStyles = makeStyles((theme) => ({
  like: {
    width: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  thumbsup: ({ size }) => ({
    cursor: 'pointer',
    color: colors.blue,
    fontSize: size ? size : '24px',
  }),
  likeBtn: {
    background: 'transparent',
    outline: 'none',
    border: 'none',
  },
  modalWrapper: {
    position: 'absolute',
    width: 520,
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
  createBtn: {
    background: colors.blue,
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
  },
}));

const baseId = 'appXoertP1WJjd4TQ';
const apiKey = 'keymd23kpZ12EriVi';
const base = new Airtable({ apiKey }).base(baseId);

const LikeButton = ({ audio, channelTag, userId, size }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState();
  const [votedAudio, setVotedAudio] = useState([]);
  const classes = useStyles({ size });
  const [open, setOpen] = useState(false);
  const user = useSelector(selectors.getUser);
  const dispatch = useDispatch();
  const userProfile = useSelector(selectors.getUserData);
  const [profileCreated, setProfileCreated] = useState(false);

  const handleLike = async () => {
    if (!user) {
      dispatch(actions.login());
    } else if (!profileCreated) {
      setOpen(true);
    }

    if (user && profileCreated) {
      setLiked(true);
      setCount(count + 1);

      if (audio?.fields?.type === 'audiocast') {
        base('UserAudiocasts').update(
          [
            {
              id: audio.id,
              fields: {
                upvotes: audio.fields.upvotes + 1,
                userProfile:
                  votedAudio.length > 0 ? [...votedAudio, userId] : [userId],
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
              console.log('liked record  ', record);
            });
          }
        );
      } else if (audio.fields.type === 'livestream') {
        base('ChannelLiveData').update(
          [
            {
              id: audio.id,
              fields: {
                upvotes: audio.fields.upvotes + 1,
                userProfile:
                  votedAudio.length > 0 ? [...votedAudio, userId] : [userId],
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
              console.log('liked record  ', record);
            });
          }
        );
      }
    }
  };

  const toggleUnLike = (e) => {
    setLiked(false);
    setCount(count - 1);
    const filtered = votedAudio?.filter((item) => item !== userId);
    setVotedAudio(filtered);
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
            console.error(err);
            return;
          }
          records.forEach(function (record) {
            console.log('unliked record  ', record);
          });
        }
      );
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
            console.error(err);
            return;
          }
          records.forEach(function (record) {
            console.log('unliked record  ', record);
          });
        }
      );
    }
  };

  useEffect(() => {
    setCount(audio?.fields?.upvotes);
    setLiked(audio?.fields?.userProfile?.includes(userId));
    if (!!audio?.fields?.userProfile) {
      setVotedAudio(audio?.fields?.userProfile);
    }
  }, [channelTag, audio]);

  useEffect(() => {
    if (userProfile) {
      setProfileCreated(true);
    } else {
      setProfileCreated(false);
    }
  }, []);

  return (
    <div className={classes.like}>
      {liked ? (
        <button
          onClick={toggleUnLike}
          className={classes.likeBtn}
          disabled={false}
        >
          <FontAwesomeIcon icon={faThumbsUp} className={classes.thumbsup} />
        </button>
      ) : (
        <button
          onClick={handleLike}
          className={classes.likeBtn}
          disabled={false}
        >
          <FontAwesomeIcon icon={ThumbsUp} className={classes.thumbsup} />
        </button>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.modalWrapper}>
          <h4>Create a LeagueDay profile to like audiocasts!</h4>

          <Button
            className={classes.createBtn}
            onClick={() => dispatch(actions.pushHistory('/create'))}
          >
            Create Profile
          </Button>
        </div>
      </Modal>
      <p className={classes.count}>{count}</p>
    </div>
  );
};

export default LikeButton;
