import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'

const useStyles = makeStyles(theme => ({
  bottomBlock: {
    width: '100%',
  },
  children: {
    marginBottom: '0.5em',
  },
  pinStripe: ({channelColor}) => ({
    borderBottom: `0.2em solid ${channelColor ?? colors.white80}`,
  }),
  rhsCell: {
    height: '50%',
    width: '100%',
  },
  rhsCol: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    marginLeft: 'auto',
    paddingLeft: '1em',
    width: '100%',
  },
  title: {
    fontSize: '150%',
    fontWeight: theme.typography.weight.bold,
    whiteSpace: 'nowrap',
  },
  titleRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1em',
    width: '100%',
  },
  titleStart: ({channelColor}) => ({
    color: channelColor
  }),
}))

const BottomBlock = props => {
  const classes = useStyles(props)

  const {className, title} = props

  const [titleStart, ...titleRest] = title ? title.split(' ') : ['']

  return (
    <div className={cx(classes.bottomBlock, className)}>
      <div className={classes.titleRow}>
        <div className={classes.title}><span className={classes.titleStart}>{titleStart}</span> {titleRest.join(' ')}</div>
        <div className={classes.rhsCol}>
          <div className={cx(classes.rhsCell, classes.pinStripe)} />
          <div className={classes.rhsCell} />
        </div>
      </div>
      <div className={classes.children}>
        {props.children}
      </div>
    </div>
  )
}

export default BottomBlock
