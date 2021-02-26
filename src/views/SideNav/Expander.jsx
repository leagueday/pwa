import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'

import {actions, selectors} from '../../store'

import {IcoSolidArrowDown, IcoSolidArrowUp} from '../icons'

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  content: {
    marginTop: '0.5em',
  },
  expander: {
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    transform: 'scaleY(0.5) translateY(-25%) scale(0.6);',
  },
  iconContainer: {
    height: '1em',
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    fontWeight: theme.typography.weight.bold,
    marginLeft: '0.25em',
    userSelect: 'none',
  },
}))

const Expander = ({children, className, defaultOpen, text, tag}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  let open = useSelector(selectors.getNavExpander(tag))

  if (open == null) open = defaultOpen

  const toggleOpen = () => {
    dispatch(actions.setNavExpander(!open, tag))
  }

  const Icon = open ? IcoSolidArrowDown : IcoSolidArrowUp

  return (
    <div className={cx(className, classes.expander)}>
      <div className={cx(classes.row, classes.clickable)} onClick={toggleOpen} >
        <Icon classes={{inner:classes.icon, outer:classes.iconContainer}} />
        <div className={classes.text}>
          {text}
        </div>
      </div>
      <Collapse in={open} timeout={'auto'}>
        <div className={classes.content}>
          {children}
        </div>
      </Collapse>
    </div>
  )
}

Expander.defaultProps = {
  defaultOpen: true,
}

export default Expander
