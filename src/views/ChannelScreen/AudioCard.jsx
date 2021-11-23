import React, { useState, useMemo } from 'react';
import ToggleImageButton from '../ToggleImageButton';
import SubscriptionModal from './SubscriptionModal';
import LikeButton from '../LikeButton';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { actions, constants, selectors } from '../../store';
import { colors } from '../../styling';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Airtable from 'airtable';
import { Person } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  audioCard: () => ({
    width: '15rem',
    height: '18rem',
    border: '.5px solid white',
    borderRadius: '5px',
    marginLeft: '35px',
    marginBottom: '8%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.1s ease-in-out',
    [theme.breakpoints.down('sm')]: {
      width: '40%',
      marginLeft: '15px',
      height: '25rem',
    },
    '&:hover': {
      transform: 'scale(1.05)',
      borderLeft: `5px solid ${colors.magenta}`,
      borderBottom: `4px solid #610037`,
    },
  }),
  images: {
    width: '100%',
  },
  modalImages: {
    width: '100%',
    display: 'flex',
    alignItem: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  thumbnail: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  creatorImg: {
    zIndex: 10,
    cursor: 'pointer',
    position: 'absolute',
    borderRadius: '50%',
    width: '5rem',
    height: '5rem',
    objectFit: 'cover',
    right: -15,
    top: -15,
    border: `2px solid ${colors.blue}`,
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '4rem',
      height: '4rem',
    },
  },
  title: {
    margin: 0,
    padding: 0,
    textAlign: 'center',
    fontSize: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '80%',
    },
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
    [theme.breakpoints.down('sm')]: {
      bottom: 10,
    },
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
  '@keyframes blinker': {
    '0%': { filter: 'brightness(100%)' },
    '49%': { filter: 'brightness(100%)' },
    '50%': { filter: 'brightness(200%)' },
    '100%': { filter: 'brightness(200%)' },
  },
  liveSign: {
    width: 'auto',
    zIndex: 100,
    border: 'none',
    outline: 'none',
    position: 'absolute',
    top: -10,
    left: -10,
    padding: '10 20',
    minWidth: '25%',
    color: 'white',
    background: 'red',
    borderRadius: '5px',
    '&:hover': {
      background: 'red',
      filter: 'brightness(150%)',
    },
    animationName: '$blinker',
    animationTimingFunction: 'linear',
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
  },
  expandModal: {
    zIndex: 100,
    border: 'none',
    outline: 'none',
    position: 'absolute',
    color: 'white',
    top: '30%',
    transform: 'translateX(-50%)',
    left: '50%',
    padding: '10 20',
    width: '25%',
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
  },
}));

const baseId = 'appXoertP1WJjd4TQ';
const apiKey = 'keymd23kpZ12EriVi';
const base = new Airtable({ apiKey }).base(baseId);

const AudioCard = ({ audio, indexData, channelTag, live }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectors.getUserData);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const currentUserId = currentUser?.id;
  const audioUrl = useSelector(selectors.getAudioUrl);
  const isSelectedAudio = audioUrl && audioUrl === audio.fields.playbackUrl;
  const audioMode = useSelector(selectors.getAudioMode);
  const [seeMore, setSeeMore] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleListen = async () => {
    if (audio?.fields?.type === 'audiocast') {
      base('UserAudiocasts').update(
        [
          {
            id: audio.id,
            fields: {
              listeners: audio?.fields?.listeners
                ? [...audio?.fields?.listeners, currentUserId]
                : [currentUserId],
            },
          },
        ],
        function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          records.forEach(function (record) {
            console.log('listen recorded  ', record);
          });
        }
      );
    } else if (audio.fields.type === 'livestream') {
      base('ChannelLiveData').update(
        [
          {
            id: audio.id,
            fields: {
              listeners: audio?.fields?.listeners
                ? [...audio?.fields?.listeners, currentUserId]
                : [currentUserId],
            },
          },
        ],
        function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          records.forEach(function (record) {
            console.log('listen recorded  ', record);
          });
        }
      );
    }
  };

  const isPlayings = isSelectedAudio && audioMode === constants.AUDIO_MODE_PLAY;

  const onPopClick = isPlayings
    ? (ev) => {
        ev.stopPropagation();
        dispatch(actions.pauseAudio());
      }
    : (ev) => {
      if (live) {
        if (currentUser) {
          if (
            currentUser.fields.subscriptions === 'true' &&
            audio.fields.userId === 'cbfba6e1-54eb-43aa-80a9-cb1bd4c04948'
            ) {
              console.log('hello?? ')
              handleListen();
              if (isSelectedAudio) dispatch(actions.playAudio());
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
                );
                dispatch(actions.playAudio());
              }
              ev.stopPropagation();
            } else if (
              currentUser.fields.subscriptions !== 'true' &&
              audio.fields.userId === 'cbfba6e1-54eb-43aa-80a9-cb1bd4c04948'
            ) {
              setOpen(true);
            }
        } else if (!currentUser) {
          setOpen(true)
        }
        } else {
          handleListen();
          if (isSelectedAudio) dispatch(actions.playAudio());
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
            );
            dispatch(actions.playAudio());
          }
          ev.stopPropagation();
        }
      };

  const onClick = () => {
    live
      ? dispatch(
          actions.pushHistory(`/audiocast/${audio?.fields?.liveStreamId}`)
        )
      : dispatch(
          actions.pushHistory(`/audiocast/${audio?.fields?.audiocastId}`)
        );
  };

  return (
    <div
      className={classes.audioCard}
      onMouseLeave={!sm ? () => setSeeMore(false) : null}
      onMouseEnter={!sm ? () => setSeeMore(true) : null}
    >
      <SubscriptionModal open={open} setOpen={setOpen} />
      <div className={classes.images}>
        {seeMore && (
          <button
            variant="contained"
            onMouseOpen={() => setSeeMore(true)}
            className={classes.expandModal}
            onClick={onClick}
          >
            More
          </button>
        )}
        {live && (
          <button className={classes.liveSign} variant="contained">
            Live
          </button>
        )}
        <img
          className={classes.creatorImg}
          src={live ? audio?.fields?.creatorImg : audio?.fields?.image}
          alt=""
          onClick={() =>
            dispatch(actions.pushHistory(`/profile/${audio?.fields?.userId}`))
          }
        />
        <div style={{ height: '150px' }}>
          {audio?.fields?.thumbnail && (
            <img
              className={classes.thumbnail}
              src={audio?.fields?.thumbnail}
              onClick={onClick}
              style={{
                filter: seeMore ? 'brightness(50%)' : '',
              }}
              alt=""
            />
          )}
        </div>
      </div>
      <div style={{ overflow: 'hidden' }}>
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
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <LikeButton
            userId={currentUserId}
            channelTag={channelTag}
            audio={audio}
          />
          <p style={{ display: 'flex', alignItems: 'center', opacity: 0.6 }}>
            <Person />{' '}
            {audio?.fields?.listeners ? audio?.fields?.listeners?.length : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
