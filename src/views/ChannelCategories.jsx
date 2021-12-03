import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { makeStyles } from '@mui/styles';
import useAirtable from '../api/useAirtable';
import useChannels from '../api/useChannels';
import { colors } from '../styling';
import useChannelCategories from '../api/useChannelCategories';
import ChannelTilesRow from './ChannelTilesRow';

const useStyles = makeStyles((theme) => ({
  channelCategories: {},
  creatorWrapper: {
    position: 'relative',
    minHeight: '25vh',
  },
  creatorContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    background: 'black',
    [theme.breakpoints.down('sm')]: {
      background: 'inherit',
    },
  },
  creator: {
    textAlign: 'center',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  line: {
    width: '38%',
    borderBottom: `0.2em solid ${colors.white80}`,
  },
  searchBar: {
    backgroundColor: colors.lightGray,
    margin: '0.5vw',
    outline: 'none',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    padding: '12px 50px 12px 5px',
    width: '25%',
    marginBottom: '2%',
    fontFamily: theme.typography.family.primary,
    '&::placeholder': {
      color: 'white',
      fontFamily: theme.typography.family.primary,
      fontSize: '120%',
      opacity: 0.8,
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
}));

const ChannelCategories = ({ className }) => {
  const classes = useStyles();
  const { data } = useAirtable('appXoertP1WJjd4TQ', 'UserProfile');
  const [creators, setCreators] = useState([]);
  const channels = useChannels().list;
  const channelCategories = useChannelCategories();

  useEffect(() => {
    setCreators(data);
  }, [data]);

  const channelsByCat = React.useMemo(() => {
    if (channelCategories.size === 0 || channels.length === 0) return [];
    const channelMap = new Map(channels.map((record) => [record.tag, record]));

    const result = [];
    for (let [title, tagSet] of channelCategories.entries()) {
      const channels = [];
      for (let tag of tagSet.values()) {
        channels.push(channelMap.get(tag));
      }
      result.push([title, channels]);
    }
    return result;
  }, [channels, channelCategories]);

  return (
    <div className={cx(className, classes.channelCategories)}>
      {channelsByCat.map(([title, channels]) => (
        <ChannelTilesRow
          id={`chan.${title}`}
          channels={channels}
          key={title}
          title={title}
        />
      ))}
    </div>
  );
};

export default ChannelCategories;
