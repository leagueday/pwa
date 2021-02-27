import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'

const useStyles = makeStyles(theme => ({
  airbox: {
    border: `2px solid ${colors.lime}`,
    color: colors.lime,
    padding: '0.25em 2em',
    textTransform: 'uppercase',
  },
  image: {
    width: '50%',
  },
  liveness: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
}))

const Liveness = ({className}) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.liveness, className)}>
      <img className={classes.image} src="/img/logo_gray_circle_live_play.png" />
      <div className={classes.airbox}>On the air</div>
    </div>
  )
}

export default Liveness
