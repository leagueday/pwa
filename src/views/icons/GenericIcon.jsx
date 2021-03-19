import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  centerFill: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
  }
})

const makeGenericIcon = Svg => {
  const Icon = ({classes, onClick, size, strokeWidth}) => {
    const classes2 = useStyles()

    return (
      <div className={cx(classes2.centerFill, classes?.outer)} onClick={onClick}>
        <Svg className={classes?.inner} size={size} strokeWidth={strokeWidth} />
      </div>
    )
  }

  Icon.defaultProps = {
    size: 24,
    strokeWidth: null,
  }

  return Icon
}

export default makeGenericIcon
