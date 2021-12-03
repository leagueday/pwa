import React, { useState, useEffect } from 'react';
import { actions } from '../../store';
import { useDispatch } from 'react-redux';
import { base } from '../..';
import Item from './Item';
import { makeStyles } from '@mui/styles';
import PlusMinusBtn from '../CreatorTilesRow/PlusMinusBtn';
import { useLocationPathname } from '../../store';

const useStyles = makeStyles((theme) => ({
  likeItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  playPause: {
    position: 'absolute',
    right: 8,
    fontWeight: 'bold',
  },
}));

const isChannelSelected = (locationPathname, channelTag) => {
  const path = locationPathname ?? '';

  if (path.substr(0, 9) !== '/profile/') {
    return false;
  } else {
    return path.substr(9) === channelTag;
  }
};

const TopFive = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const locationPathname = useLocationPathname();
  const [leaderboard, setleaderboard] = useState([]);

  useEffect(() => {
    base('UserProfile')
      .select({
        view: 'Grid view',
      })
      .eachPage(
        async function page(records, fetchNextPage) {
          const count = records
            .filter((rec) => rec.fields.UserAudiocasts)
            .sort((a, b) => {
              return (
                b.fields.UserAudiocasts.length - a.fields.UserAudiocasts.length
              );
            })
            .slice(0, 5);
          setleaderboard(count);
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }, []);

  return (
    <div>
      {leaderboard.map((user, ind) => {
        const { fields } = user;
        return (
          <div className={classes.likeItem} key={ind}>
            <Item
              title={fields?.username}
              imageUrl={
                fields?.image
                  ? fields?.image
                  : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues='
              }
              isSelected={isChannelSelected(locationPathname, fields?.userId)}
              onClick={() =>
                dispatch(actions.pushHistory(`/profile/${fields?.userId}`))
              }
            />
            <div className={classes.playPause}>
              {fields.UserAudiocasts.length}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopFive;
