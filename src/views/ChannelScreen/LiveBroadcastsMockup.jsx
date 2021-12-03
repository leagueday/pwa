import React, { useEffect } from 'react';
import cx from 'classnames';
import LiveStreams from './LiveStreams';
import { makeStyles } from '@mui/styles';
import { colors } from '../../styling';

const useStyles = makeStyles((theme) => ({
  comingSoon: {
    margin: '0 2vw 2vw 2vw',
  },
  eventImage: {
    height: '6vw',
    width: '6vw',
  },
  eventImageAndText: {
    display: 'flex',
    width: '100%',
  },
  eventTextplate: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '0.5em',
    minWidth: 0,
    [theme.breakpoints.only('xs')]: {
      marginLeft: '2vw',
    },
  },
  liveBroadcast: {
    display: 'flex',
    flexDirection: 'row',
  },
  liveBroadcasts: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  liveness: {
    display: 'flex',
    width: '400%',
  },
  livenessContent: {
    backgroundColor: '#070709',
    display: 'flex',
    flex: 4,
    padding: '1em 0 1em 1em',
    [theme.breakpoints.only('xs')]: {
      padding: '2vw 0 2vw 2vw',
    },
  },
  livenessLeftPad: {
    display: 'flex',
    flex: -6,
  },
  sectionTitle: ({ channelColor }) => ({
    color: channelColor,
    display: 'flex',
    fontSize: '125%',
    overflowX: 'hidden',
    textTransform: 'uppercase',
    [theme.breakpoints.only('xs')]: {
      fontSize: '85%',
    },
  }),
  sectionVariety: {
    display: 'flex',
    fontSize: '125%',
    overflowX: 'hidden',
    fontWeight: theme.typography.weight.bold,
    [theme.breakpoints.only('xs')]: {
      fontSize: '85%',
    },
  },
  textEllipsisOverflow: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  track: {
    display: 'flex',
  },
  trackText: {
    color: colors.white80,
    flex: 1,
    minWidth: '12vw',
    paddingLeft: '0.1vw',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

const mockupData = [
  {
    episodes: [],
    imageUrl: '/img/restyle_demo/lcs_versus.png',
    name: 'League of Legends',
    tags: ['riot', 'lol'],
    variety: 'LCS Summer Split',
  },
];

const filterMockupData = (tag) =>
  mockupData.filter(({ tags }) => tags.find((thisTag) => thisTag === tag));

const LiveBroadcastsMockup = ({ className, channel }) => {
  const classes = useStyles();

  return (
    <div className={cx(classes.liveBroadcasts, className)}>
      <LiveStreams channelTag={channel?.tag} />
      <div id="sdwContainer"></div>
    </div>
  );
};

export const mockupGetHasBroadcasts = (channel) => {
  const data = filterMockupData(channel.tag);
  return data.length > 0;
};

export default LiveBroadcastsMockup;
