import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import Square from '../Square'

const useStyles = makeStyles(theme => ({
  // airbox: {
  //   border: `2px solid ${colors.lime}`,
  //   color: colors.lime,
  //   padding: '0.25em 2em',
  //   textTransform: 'uppercase',
  //   whiteSpace: 'nowrap',
  // },
  image: {
    height: '4em',
    width: '4em',
  },
  imageContainer: {
  },
  liveness: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '6em'
  },
  livenessCell: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    fontWeight: theme.typography.weight.bold,
  }
}))

const Liveness = () => {
  const classes = useStyles()

  // <div className={classes.airbox}>On the air</div>
  return (
    <div className={classes.livenessCell}>
      <div className={classes.liveness}>
        <img className={classes.image} src="/img/logo_gray_circle_live_play.png" />
        <div className={classes.text}>Stream</div>
      </div>
    </div>
  )
}

export default Liveness
