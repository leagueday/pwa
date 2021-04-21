import React from 'react'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core'

import {colors} from '../styling'
import {IcoDot} from './icons'

const useStyles = makeStyles(theme => ({
  dotInner: {
    color: colors.white80,
    height: '0.75em',
    width: '0.75em',
    [theme.breakpoints.only('xs')]: {
      height: '2vw',
      width: '2vw',
    },
  },
  dotInnerCurrentPage: {
    color: colors.magenta,
  },
  dotOuter: { },
  sliderDots: {
    alignItems: 'center',
    display: 'flex',
    padding: '0.25em',
  }
}))

const makeRange = length => {
  const result = new Array(length)

  for (let i = 0; i < length; i++) result.push(i)

  return result
}

const SliderDots = ({className, numPages, pageNum}) => {
  const classes = useStyles()

  const indexes = React.useMemo(
    () => makeRange(numPages),
    [numPages]
  )

  return (
    <div className={cx(classes.sliderDots, className)}>
      {
        indexes.map(
          i => (
            isCurrentPage => (
              <IcoDot classes={{
                  inner: cx(classes.dotInner, {[classes.dotInnerCurrentPage]: isCurrentPage}),
                  outer: classes.dotOuter,
                }}
              />
            )
          )(
            i === pageNum
          )
        )
      }
    </div>
  )
}

export default SliderDots
