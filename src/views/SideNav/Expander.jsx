import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'

import { actions, selectors } from '../../store'

import { IcoSolidArrowDown, IcoSolidArrowUp } from '../icons'

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  col: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
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
  text: ({ skinny }) => ({
    flex: 1,
    fontWeight: theme.typography.weight.bold,
    marginLeft: '0.25em',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  }),
}))

const Expander = ({ children, className, defaultOpen, skinny, text, tag }) => {
  const classes = useStyles({ skinny })

  const dispatch = useDispatch()

  let open = useSelector(selectors.getNavExpander(tag))

  if (open == null) open = defaultOpen

  const toggleOpen = () => {
    dispatch(actions.setNavExpander(!open, tag))
    console.log('tage',tag)
    if(tag=="profile"){
    dispatch(actions.pushHistory('/profile'))
    }
     else if(tag == "live"){
      dispatch(actions.pushHistory('/live'))
    }
  }

  const Icon = open ? IcoSolidArrowDown : IcoSolidArrowUp

  return skinny ? (
    <div className={cx(className, classes.expander)}>
      <div className={cx(classes.col, classes.clickable)} onClick={toggleOpen}>
        <div className={classes.text}>{text}</div>
        <Icon classes={{ inner: classes.icon, outer: classes.iconContainer }} />
      </div>
      <Collapse in={open} timeout={'auto'}>
        <div className={classes.content}>{children}</div>
      </Collapse>
    </div>
  ) : (
    <div className={cx(className, classes.expander)}>
      <div className={cx(classes.row, classes.clickable)} onClick={toggleOpen}>
        <Icon classes={{ inner: classes.icon, outer: classes.iconContainer }} />
        <div className={classes.text}>{text}</div>
      </div>
      <Collapse in={open} timeout={'auto'}>
        <div className={classes.content}>{children}</div>
      </Collapse>
    </div>
  )
}

Expander.defaultProps = {
  defaultOpen: true,
}

export default Expander
