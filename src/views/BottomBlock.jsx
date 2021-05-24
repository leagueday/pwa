import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import { colors } from '../styling'
import SliderDots from './SliderDots'

const useStyles = makeStyles(theme => ({
  bottomBlock: {
    width: '100%',
  },
  children: {
    marginBottom: '0.5em',
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
  sliderDots: {
    marginBottom: '1em',
    [theme.breakpoints.only('xs')]: {
      marginBottom: '2vw',
    },
  },
  title: {
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
  },
  titleRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1em',
    maxWidth: '100%',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      marginBottom: '2vw',
    },
  },
  titleStart: ({ accentColor }) => ({
    color: accentColor,
  }),
}))

const BottomBlock = props => {
  const classes = useStyles(props)

  const { className, numPages, pageNum, titleRest, titleStart } = props

  return (
    <div className={cx(classes.bottomBlock, className)}>
      <div className={classes.titleAndDotsRow}>
        <div className={classes.titleRow}>
          {(titleStart || titleRest) && (
            <div className={classes.title}>
              <span className={classes.titleStart}>{titleStart}</span>{' '}
              {titleRest}
            </div>
          )}
          <div className={classes.rhsCol}>
            <div className={cx(classes.rhsCell, classes.pinStripe)} />
            <div className={classes.rhsCell} />
          </div>
        </div>
        {numPages > 1 && (
          <SliderDots
            className={classes.sliderDots}
            numPages={numPages}
            pageNum={pageNum}
          />
        )}
      </div>
      <div className={classes.children}>{props.children}</div>
    </div>
  )
}

BottomBlock.defaultProps = {
  accentColor: colors.white80,
}

export default BottomBlock
