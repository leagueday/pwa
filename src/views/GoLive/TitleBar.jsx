import React from 'react';
import Color from 'color';
import cx from 'classnames';

import { makeStyles } from '@mui/styles';

import { formatDate } from '../dateutil';

const useStyles = makeStyles((theme) => ({
  datetime: ({ primaryColor }) => ({
    color: Color(primaryColor).fade(0.25).toString(),
    fontSize: '95%',
    marginLeft: 'auto',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  text: {
    fontSize: '125%',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  titleBar: {
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'row',
    fontWeight: theme.typography.weight.bold,
    justifyContent: 'flex-start',
    userSelect: 'none',
    [theme.breakpoints.only('xs')]: {
      fontSize: '65%',
    },
  },
}));

const TitleBar = ({ className, primaryColor, text }) => {
  const classes = useStyles({ primaryColor });

  return (
    <div className={cx(classes.titleBar, className)}>
      <div className={classes.text}>{text}</div>
      <div className={classes.datetime}>{formatDate()}</div>
    </div>
  );
};

export default TitleBar;
