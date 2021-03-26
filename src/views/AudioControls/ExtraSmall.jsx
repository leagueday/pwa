import React from 'react'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core'

import * as colors from '../../styling/colors'

const useStyles = makeStyles(theme => ({
  xsAudioControls: {
    backgroundColor: colors.brandBlack,
  }
}))

const XsAudioControls = ({className}) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.xsAudioControls, className)}>
      {`extra small audio controls ${className}`}
    </div>
  )
}

export default XsAudioControls
