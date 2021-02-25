import {useDispatch} from 'react-redux'
import {constants as storeConsts, useFilter} from '../../store'
import {isMatchingFilter, makeFilterOnclick} from './util'
import cx from 'classnames'
import React from 'react'


const NonExpander = ({classes, children, text, filterKind, filterParam}) => {
  // this is styled like the ./Expander but without expander action, it fits in alongside though

  const dispatch = useDispatch()

  const filter = useFilter()

  const isSelectedFilter = isMatchingFilter(filter, filterKind, filterParam)

  const textOnClick = filterKind
    ? (
      isSelectedFilter
        ? makeFilterOnclick(dispatch, storeConsts.FILTER_KIND_FEATURED)
        : makeFilterOnclick(dispatch, filterKind, filterParam)
    ) : null

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
        <div className={cx(
          classes.myExpanderHeadingText,
          {
            [classes.clickable]: !!textOnClick,
          }
        )} onClick={textOnClick}>
          {text}
        </div>
      </div>
      <div className={classes.myExpanderContent}>
        {children}
      </div>
    </div>
  )
}

export default NonExpander
