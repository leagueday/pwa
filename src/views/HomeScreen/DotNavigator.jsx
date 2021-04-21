import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import IcoDot from '../icons/IcoDot'

const useStyles = makeStyles(theme => ({
  dotInner: {
    color: colors.white80,
  },
  dotInnerSelected: ({ primaryColor }) => ({
    color: primaryColor,
  }),
  dotNav: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '0.5em',
    paddingTop: '0.5em',
  },
  dotOuter: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dotOuterSelected: {
    cursor: 'default',
  },
}))

const DotNavigator = ({
  currentIndex,
  numElements,
  primaryColor,
  setCurrentIndex,
}) => {
  const classes = useStyles({ primaryColor })

  return (
    <div className={classes.dotNav}>
      {(() => {
        const dots = []

        for (let i = 0; i < numElements; i++) {
          const isSelected = i === currentIndex

          dots.push(
            <IcoDot
              key={i}
              classes={{
                inner: cx(classes.dotInner, {
                  [classes.dotInnerSelected]: isSelected,
                }),
                outer: cx(classes.dotOuter, {
                  [classes.dotOuterSelected]: isSelected,
                }),
              }}
              onClick={isSelected ? null : () => setCurrentIndex(i)}
            />
          )
        }

        return dots
      })()}
    </div>
  )
}

export default DotNavigator
