import React from 'react'
import { useSelector } from 'react-redux'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

import {selectors} from '../../store'
import {colors} from '../../styling'
import {secondsToHms} from '../dateutil'

const useStyles = makeStyles(theme => ({
  sliderThumbTooltip: {
    background: Color(colors.brandBlack).fade(0.4).toString(),
    border: `1px solid ${colors.cyan}`,
    borderRadius: '1em',
    color: colors.cyan,
    fontFamily: theme.typography.family.secondary,
    fontSize: '90%',
    height: '2em',
    [theme.breakpoints.down('md')]: {
      borderRadius: '0.6em',
      fontSize: '60%',
      height: '1.2em',
      lineHeight: '0.5em',
      margin: '0 0.5em',
    },
  },
}))

const TooltipThumb = ({ children, open, value }) => {
  const classes = useStyles()

  const position = useSelector(selectors.getAudioPosition)

  // Kind of quick-and-dirty test the type of `value` to
  // know if it's preformatted (ephemeral value during
  // drag), it would be a string, else it's a number 1-100
  // representing the Slider position
  const hms = typeof value === 'string' ? value : secondsToHms(position)

  return (
    <Tooltip
      classes={{ tooltip: classes.sliderThumbTooltip }}
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
