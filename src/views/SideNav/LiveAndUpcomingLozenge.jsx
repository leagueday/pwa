import React from 'react'
import {useDispatch} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import {actions} from '../../store'

const useStyles = makeStyles(theme => ({
  contentMockImage: {
  },
  lozenge: {
    backgroundColor: colors.darkGray,
    borderBottomRightRadius: '2.5em',
    borderTopRightRadius: '2.5em',
    cursor: 'pointer',
    flex: 1,
    height: '5em',
    overflow: 'hidden',
    padding: '0.5em 0.5em 0 0.5em',
    maxWidth: '12em',
  },
  title: {
    fontWeight: theme.typography.weight.bold,
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  titleLive: {
    color: colors.lime,
  },
  liveAndUpcomingLozenge: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '0.5em',
  },
}))

const LiveAndUpcomingLozenge = ({className}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const yourBasicOnclick = () => dispatch(actions.pushHistory('/'))

  return (
    <div className={cx(className, classes.liveAndUpcomingLozenge)}>
      <div className={classes.lozenge} onClick={yourBasicOnclick}>
        <div className={classes.title}>
          <span className={classes.titleLive}>LIVE</span> & UPCOMING
        </div>
        <img className={classes.contentMockImage} src="/img/restyle_demo/live_and_upcoming_lozenge_content.png" />
      </div>
    </div>
  )
}

export default LiveAndUpcomingLozenge
