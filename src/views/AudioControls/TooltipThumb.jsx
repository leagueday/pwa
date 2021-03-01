import React from 'react'
import {useSelector} from 'react-redux'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

import * as colors from '../../styling/colors'
import {selectors} from '../../store'
import {secondsToHms} from './util'

const useStyles = makeStyles(theme => ({
  sliderThumbTooltip: {
    background: Color(colors.brandBlack).fade(0.6).toString(),
    border: `1px solid ${colors.cyan}`,
    borderRadius: '1em',
    color: colors.cyan,
    fontFamily: theme.typography.family.secondary,
    fontSize: '90%',
    height: '2em',
  },
}))

const TooltipThumb = ({children, open, value}) => {
  const classes = useStyles()

  const position = useSelector(selectors.getAudioPosition)

  // Kind of quick-and-dirty test the type of `value` to
  // know if it's preformatted (ephemeral value during
  // drag), it would be a string, else it's a number 1-100
  // representing the Slider position
  const hms = typeof(value) === 'string' ? value : secondsToHms(position)

  return (
    <Tooltip
      classes={{tooltip: classes.sliderThumbTooltip}}
      open={open}
      enterTouchDelay={0}
      placement="right"
      title={hms}
    >
      {children}
    </Tooltip>
  )
}

export default TooltipThumb