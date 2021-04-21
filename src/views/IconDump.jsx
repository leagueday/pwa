import React from 'react'

import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'

import {colors} from '../styling'

import {
  IcoDot,
  IcoFastFwdStop,
  IcoForwardStop,
  IcoHome,
  IcoLeft,
  IcoMagnifier,
  IcoMinus,
  IcoPause,
  IcoPlay,
  IcoPlus,
  IcoRewindStop,
  IcoRight,
  IcoSolidArrowDown,
  IcoSolidArrowUp,
} from './icons'

const useStyles = makeStyles({
  iconDump: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  iconDumpCell: {
    backgroundColor: colors.brandBlack,
    color: 'white',
    padding: '0.25em',
  },
  iconDumpGrid: {},
  iconDumpHeading: {
    backgroundColor: colors.brandBlack,
    color: 'white',
    fontSize: '150%',
    padding: '1em',
    textAlign: 'center',
    width: '100%',
  },
})

const iconsList = [
  ['IcoHome', IcoHome],
  ['IcoDot', IcoDot],
  ['IcoFastFwdStop', IcoFastFwdStop],
  ['IcoForwardStop', IcoForwardStop],
  ['IcoLeft', IcoLeft],
  ['IcoMagnifier', IcoMagnifier],
  ['IcoMinus', IcoMinus],
  ['IcoPause', IcoPause],
  ['IcoPlay', IcoPlay],
  ['IcoPlus', IcoPlus],
  ['IcoRewindStop', IcoRewindStop],
  ['IcoRight', IcoRight],
  ['IcoSolidArrowDown', IcoSolidArrowDown],
  ['IcoSolidArrowUp', IcoSolidArrowUp],
]

const IconDump = () => {
  const classes = useStyles()

  const nextCounter = (counter => () => {
    counter = counter + 1
    return counter
  })(0)

  return (
    <div className={classes.iconDump}>
      <div className={classes.iconDumpHeading}>icons</div>
      <Grid className={classes.iconDumpGrid} container spacing={1}>
        {iconsList.map(([iconName, Icon]) => (
          <Grid
            className={classes.iconDumpCell}
            key={nextCounter()}
            item
            sm={1}
          >
            <Tooltip title={iconName}>
              <div>
                <Icon />
              </div>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default IconDump
