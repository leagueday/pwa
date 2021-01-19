import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Color from 'color'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import { actions, constants as storeConsts, selectors, useFilter } from '../store'
import * as apiConsts from '../api/consts'
import { proxifyHttpUrl } from '../api/util'
import useGameboard from '../api/useGameboard'

import Error from './Error'
import Loading from './Loading'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
  },
  item: {
    alignItems: 'center',
    border: `1px solid transparent`,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0.25em',
  },
  itemImage: {
    height: '1em',
    marginRight: '0.35em',
  },
  itemName: {
    fontSize: '85%',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  itemSelected: {
    backgroundColor: Color(theme.palette.primary.dark).fade(0.8).string(),
    border: `1px solid ${Color(theme.palette.primary.dark).fade(0.6).string()}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
  },
}))

const Item = ({data}) => {
  const {id, name, filterKind, filterParam, imageUrl} = data

  const classes = useStyles()

  const dispatch = useDispatch()

  const filter = useFilter()

  const isSelected = (() => {
    if (filter.kind !== filterKind) return false

    if (filter.kind === storeConsts.FILTER_KIND_CAT) return filter.cat === filterParam

    if (filter.kind === storeConsts.FILTER_KIND_SUBCAT) return filter.subcat === filterParam

    // considering filter.kind === filterKind, tested above... and doesn't go to isSelected when null
    return filter.kind === storeConsts.FILTER_KIND_FEATURED || filter.kind === storeConsts.FILTER_KIND_MY_LIST
  })()

  const toggleIsSelected = isSelected
    ? () => dispatch(actions.setFilter(storeConsts.FILTER_KIND_FEATURED))
    : () => dispatch(actions.setFilter(
      filterKind,
      filterKind === storeConsts.FILTER_KIND_CAT ? filterParam : null,
      filterKind === storeConsts.FILTER_KIND_SUBCAT ? filterParam : null))

  const maybeProxiedImageUrl = proxifyHttpUrl(imageUrl, apiConsts.PROXY_RESPONSE_KIND_IMG)

  return (
    <div className={cx(classes.item, {[classes.itemSelected]: isSelected})} onClick={toggleIsSelected}>
      <img className={classes.itemImage} src={maybeProxiedImageUrl} alt={name} />
      <div className={classes.itemName}>
        {name}
      </div>
    </div>
  )
}

const SideNavGameboard = () => {
  const classes = useStyles()

  const {data, error} = useGameboard()

  return error
    ? (<Error e={error} />)
    : !data
    ? (<Loading />)
    : (
      <div className={classes.container}>
        {
          data.map(
            (data) => (
              <Item key={data.id} data={data} />
            )
          )
        }
      </div>
    )
}

export default SideNavGameboard
