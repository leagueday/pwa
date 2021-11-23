import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { makeStyles } from '@mui/styles';
import { colors } from '../styling';
import SliderDots from './SliderDots';
import NextLive from './NextLive';

const useStyles = makeStyles((theme) => ({
  bottomBlock: {
    overflowY: 'hidden',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      minHeight: '250px',
    },
  },
  children: {
    [theme.breakpoints.only('xs')]: {
      marginBottom: '2vw',
    },
  },
  pinStripe: ({ accentColor }) => ({
    borderBottom: `0.2em solid ${accentColor ?? colors.white80}`,
    [theme.breakpoints.only('xs')]: {
      borderBottom: `0.25vw solid ${accentColor ?? colors.white80}`,
    },
  }),
  rhsCell: {
    height: '50%',
    width: '100%',
  },
  rhsCol: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    height: '100%',
  },
  title: {
    position: 'relative',
    flexGrow: 0,
    flexShrink: 1,
    fontSize: '150%',
    fontWeight: theme.typography.weight.bold,
    overflow: 'hidden',
    paddingRight: '1em',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    [theme.breakpoints.only('xs')]: {
      fontSize: '95%',
      paddingRight: '2vw',
    },
  },
  titleAndDotsRow: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    overflowY: 'hidden',
  },
  titleRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      marginBottom: '2vw',
    },
  },
  titleStart: ({ accentColor }) => ({
    color: accentColor,
  }),
}));

const BottomBlock = (props) => {
  const classes = useStyles(props);
  const { className, numPages, pageNum, titleRest, titleStart } = props;

  return (
    <div
      className={cx(classes.bottomBlock, className)}
      id={titleRest === 'Audiocasts' ? 'audiocasts' : ''}
    >
      <div className={classes.titleAndDotsRow}>
        <div className={classes.titleRow}>
          {(titleStart || titleRest) && (
            <div className={classes.title}>
              <span className={classes.titleStart}>{titleStart}</span>{' '}
              {titleRest}
            </div>
          )}
          {numPages > 1 && (
            <SliderDots
              className={classes.sliderDots}
              numPages={numPages}
              pageNum={pageNum}
            />
          )}
          <div className={classes.rhsCol}>
            <div className={cx(classes.rhsCell, classes.pinStripe)} />
            <div className={classes.rhsCell} />
          </div>
        </div>
      </div>
      <div className={classes.children}>{props.children}</div>
    </div>
  );
};

BottomBlock.defaultProps = {
  accentColor: colors.white80,
};

export default BottomBlock;
