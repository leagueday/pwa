import React from 'react'
import {useDispatch} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'

import {constants as storeConsts, useFilter} from '../../store'
import {proxifyHttpUrl} from '../../api/util'
import * as apiConsts from '../../api/consts'

import {isMatchingFilter, makeFilterOnclick} from './util'

const useStyles = makeStyles({
  textColor: ({textColor}) => ({
    color: textColor,
  }),
})

const Item = ({ classes,
                text,
                textColor,
                imageUrl,
                filterKind,
                filterParam,
                disabled,
                standAlone }) => {
  const classes2 = useStyles({textColor})

  const dispatch = useDispatch()

  const filter = useFilter()

  const isSelected = isMatchingFilter(filter, filterKind, filterParam)

  const toggleIsSelected = isSelected
    ? makeFilterOnclick(dispatch, storeConsts.FILTER_KIND_FEATURED)
    : makeFilterOnclick(dispatch, filterKind, filterParam)

  const maybeProxiedImageUrl = proxifyHttpUrl(imageUrl, apiConsts.PROXY_RESPONSE_KIND_IMG)

  return (
    <div
      className={
        cx(
          classes.item,
          classes.selectable,
          {
            [classes.clickable]: !disabled,
            [classes.selected]: !disabled && isSelected,
          },
        )}
      onClick={disabled ? null : toggleIsSelected}
    >
      {maybeProxiedImageUrl && (<img className={classes.itemImage} src={maybeProxiedImageUrl} />)}
      <div className={cx(
        classes.itemName,
        classes2.textColor,
        {
          [classes.itemNameChild]: !standAlone,
          [classes.itemNameStandalone]: standAlone,
        }
      )}>
        {text}
      </div>
    </div>
  )
}

export default Item
