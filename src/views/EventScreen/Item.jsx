import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import * as colors from '../../styling/colors'
import {computeZebraBackgroundColor} from '../util'
import {makeIconButton} from '../IconButton'
import {IcoPlay} from '../icons'

const PlayButton = makeIconButton(IcoPlay)

const useStyles = makeStyles(theme => ({
  attribute: {
    padding: '0em 1em',
    whiteSpace: 'nowrap',
  },
  item: ({backgroundColor}) => ({
    backgroundColor,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),
  itemNumber: {
    color: colors.white30,
    padding: '0 1em',
    fontFamily: theme.typography.family.secondary,
  },
  itemRow: ({accentColor}) => ({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: '2em',
    minWidth: 0,
    width: '100%',
    userSelect: 'none',
    '&:hover': {
      color: accentColor,
    },
  }),
  popButton: {
    backgroundColor: null,
  },
  popButtonIcon: ({accentColor}) => ({
    width: '60%',
    '&:hover': {
      color: accentColor,
    },
  }),
  rightJustified: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginLeft: 'auto',
    minWidth: 0,
  },
  title: {
    flex: 1,
    fontWeight: theme.typography.weight.bold,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
}))

const Item = ({accentColor, className, date, duration, itemIndex, title}) => {
  const classes = useStyles({accentColor, backgroundColor: computeZebraBackgroundColor(itemIndex)})

  return (
    <div className={cx(classes.item, className)}>
      <div className={classes.itemRow}>
        <PlayButton
          className={classes.popButton}
          iconClassName={classes.popButtonIcon}
          size="1.5em"
          color={colors.white}
          shadowColor={colors.darkGray} />
        <div className={classes.itemNumber}>
          {itemIndex < 9 ? `0${itemIndex+1}` : String(itemIndex+1)}
        </div>
        <div className={classes.title}>
          {title}
        </div>
        <Hidden smDown>
          <div className={classes.rightJustified}>
            <div className={classes.attribute}>
              {date}
            </div>
            <div className={classes.attribute}>
              {duration}
            </div>
          </div>
        </Hidden>
      </div>
    </div>
  )
}

export default Item
