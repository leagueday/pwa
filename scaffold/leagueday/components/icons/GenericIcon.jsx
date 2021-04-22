import React from 'react'
import cx from 'classnames'
import Image from 'next/image';

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  centerFill: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

const makeGenericIcon = imageUrl => {
  const Icon = ({ classes, onClick, size, strokeWidth }) => {
    const classes2 = useStyles()

    return (
      <div
        className={cx(classes2.centerFill, classes?.outer)}
        onClick={onClick}
      >
        <Image src={imageUrl} className={classes?.inner} height={24} width={24} strokeWidth={strokeWidth} />
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
