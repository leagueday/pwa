import React, { useState, useEffect } from 'react';
import useAirTable from '../api/useAirtable';
import { makeStyles } from '@mui/styles';
import { colors } from '../styling';

const useStyles = makeStyles((theme) => ({
  nextLive: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    fontSize: '100%',
    [theme.breakpoints.only('xs')]: {
      background: 'black',
      fontSize: '70%',
    },
    [theme.breakpoints.only('sm')]: {
      flexDirection: 'column',
      fontSize: '90%',
    },
  },
  nextLiveText: {
    fontWeight: theme.typography.fontWeightBold,
    width: '70%',
    marginLeft: 10,
    textAlign: 'center',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  liveSpan: {
    color: colors.magenta,
  },
  nextLiveImg: {
    width: '18%',
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
}));

const NextLive = ({ titleStart, titleRest }) => {
  const classes = useStyles();

  return (
    <div classes={classes.nextLive}>
      {titleStart === 'League of Legends' && (
        <>
          <p>
            Find the full LCS Playoffs Schedule{' '}
            <a
              href="https://lolesports.com/schedule?leagues=lec,lck,lcl"
              target="_blank"
              rel="noreferer"
              style={{ color: 'blue' }}
            >
              here.
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default NextLive;
