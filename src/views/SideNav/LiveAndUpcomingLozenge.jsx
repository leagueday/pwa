import React from 'react'
import {useDispatch} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'

import {actions} from '../../store'
import {colors} from '../../styling'

const useStyles = makeStyles(theme => ({
  contentMockImage: {
    display: 'block',
    height: '3vw',
    width: 'auto',
  },
  contentMockImageContainer: {
    paddingBottom: '0.5vw',
  },
  lozenge: {
    backgroundColor: colors.darkGray,
    borderBottomRightRadius: '3vw',
    borderTopRightRadius: '3vw',
    cursor: 'pointer',
    flex: 1,
    height: '6vw',
    maxHeight: '6vw',
    overflow: 'hidden',
    padding: '0.5vw 0.5vw 0 0.5vw',
    // maxWidth: '12em',
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
    paddingTop: '0.5vw',
  },
}))

const LiveAndUpcomingLozenge = ({className, skinny}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const yourBasicOnclick = () => dispatch(actions.pushHistory('/'))

  return (
    <div className={cx(classes.liveAndUpcomingLozenge, className)}>
      <div className={classes.lozenge} onClick={yourBasicOnclick}>
        <div className={classes.title}>
          {
            skinny ? (
              <span className={classes.titleLive}>LIVE</span>
            ) : (
              <span><span className={classes.titleLive}>LIVE</span> & UPCOMING</span>
            )
          }
        </div>
        <div className={classes.contentMockImageContainer}>
          <img className={classes.contentMockImage} src="/img/restyle_demo/live_and_upcoming_lozenge_content.png" />
        </div>
      </div>
    </div>
  )
}

export default LiveAndUpcomingLozenge
