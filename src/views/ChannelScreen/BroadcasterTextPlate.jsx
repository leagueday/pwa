import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import {colors} from '../../styling'
import Backgrounder from './Backgrounder'
import SchedulePopper from './SchedulePopper'

const useStyles = makeStyles(theme => ({
  backgrounder: {
    paddingTop: '0.5em',
    [theme.breakpoints.only('xs')]: {
      paddingTop: '2vw',
    },
  },
  broadcasterTextPlate: {
    fontSize: '85%',
  },
  channelTypename: {
    textTransform: 'uppercase',
  },
  channelTypename2: {
    fontWeight: theme.typography.weight.bold,
    marginLeft: '0.5em',
    [theme.breakpoints.only('xs')]: {
      marginLeft: '2vw',
    },
  },
  heterogeneousTitleLine: {
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'row',
  },
  locationNote: {
    fontWeight: theme.typography.weight.bold,
    paddingTop: '0.5em',
    [theme.breakpoints.only('xs')]: {
      paddingTop: '2vw',
    },
  },
  schedulePopper: {
    paddingTop: '0.5em',
    [theme.breakpoints.only('xs')]: {
      paddingTop: '2vw',
    },
  },
  title: ({ color }) => ({
    color,
    fontSize: '150%',
    fontWeight: theme.typography.weight.bold,
    [theme.breakpoints.only('xs')]: {
      fontSize: '80%',
      fontWeight: theme.typography.weight.normal,
    },
  }),
}))

const BroadcasterTextPlate = ({ className, channel }) => {
  const rawColor = channel.color
  const color = colors[rawColor] ?? rawColor

  const classes = useStyles({ color })

  return (
    <div className={cx(classes.broadcasterTextPlate, className)}>
      <div className={classes.channelTypename}>Broadcaster Network</div>
      <div className={classes.heterogeneousTitleLine}>
        <div className={classes.title}>{channel.title}</div>
        <Hidden mdDown>
          <div className={classes.channelTypename2}>Broadcast Channel®</div>
        </Hidden>
      </div>
      <div className={classes.locationNote}>{channel.locationNote}</div>
      <Backgrounder
        className={classes.backgrounder}
        text={channel.backgrounder}
        textMore={channel.backgrounderMore}
        color={color}
      />
      <SchedulePopper
        className={classes.schedulePopper}
        text={channel.scheduleNote}
        link={channel.scheduleLink}
        color={color}
      />
    </div>
  )
}

export default BroadcasterTextPlate
