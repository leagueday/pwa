import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cx from 'classnames'

import Collapse from '@material-ui/core/Collapse'

import {actions, constants as storeConsts, selectors, useFilter} from '../../store'

import {IcoMinus, IcoPlus} from '../icons'
import {isMatchingFilter, makeFilterOnclick} from './util'

const Expander = ({classes, children, text, tag, filterKind, filterParam}) => {
  const dispatch = useDispatch()

  const filter = useFilter()

  const isSelectedFilter = isMatchingFilter(filter, filterKind, filterParam)

  const open = useSelector(selectors.getNavExpander(tag))

  const toggleOpen = () => {
    dispatch(actions.setNavExpander(!open, tag))
  }

  const Icon = open ? IcoMinus : IcoPlus

  const textOnClick = filterKind
    ? (
      isSelectedFilter
        ? makeFilterOnclick(dispatch, storeConsts.FILTER_KIND_FEATURED)
        : makeFilterOnclick(dispatch, filterKind, filterParam)
    ) : toggleOpen

  return (
    <div className={cx(
      classes.myExpander,
    )}>
      <div className={cx(
        classes.myExpanderHeading,
        classes.selectable,
        {
          [classes.selected]: isSelectedFilter,
        }
      )}>
        <div className={cx(classes.myExpanderHeadingIconBracket, classes.clickable)} onClick={toggleOpen}>
          [
          <Icon classes={{inner:classes.myExpanderHeadingIcon}} />
          ]
        </div>
        <div className={cx(classes.myExpanderHeadingText, classes.clickable)} onClick={textOnClick}>
          {text}
        </div>
      </div>
      <Collapse in={open} timeout={'auto'}>
        <div className={classes.myExpanderContent}>
          {children}
        </div>
      </Collapse>
    </div>
  )
}

export default Expander
