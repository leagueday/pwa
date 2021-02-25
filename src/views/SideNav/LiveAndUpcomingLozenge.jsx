import React from 'react'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'

const useStyles = makeStyles(theme => ({
  contentMockImage: {
  },
  lozenge: {
    backgroundColor: colors.darkGray,
    borderBottomRightRadius: '2.5em',
    borderTopRightRadius: '2.5em',
    flex: 1,
    height: '5em',
    overflow: 'hidden',
    padding: '0.5em 0.5em 0 0.5em',
    maxWidth: '12em',
  },
  title: {
    fontFamily: theme.typography.family.primary,
    fontWeight: theme.typography.weight.bold,
    whiteSpace: 'nowrap',
  },
  titleLive: {
    color: colors.lime,
  },
  liveAndUpcomingLozenge: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
  },
}))

const LiveAndUpcomingLozenge = ({className}) => {
  const classes = useStyles()

  return (
    <div className={cx(className, classes.liveAndUpcomingLozenge)}>
      <div className={classes.lozenge}>
        <div className={classes.title}>
          <span className={classes.titleLive}>LIVE</span> & UPCOMING
        </div>
        <img className={classes.contentMockImage} src="/img/restyle_demo/live_and_upcoming_lozenge_content.png" />
      </div>
    </div>
  )
}

export default LiveAndUpcomingLozenge
