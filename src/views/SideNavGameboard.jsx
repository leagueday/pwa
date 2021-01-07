import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Color from 'color'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import { actions, selectors } from '../store'
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
  itemSelected: {
    backgroundColor: Color(theme.palette.primary.dark).fade(0.8).string(),
    border: `1px solid ${Color(theme.palette.primary.dark).fade(0.6).string()}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
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
}))

const Item = ({data}) => {
  const {id, name, filterKind, filterParam, imageUrl} = data

  const classes = useStyles()

  const dispatch = useDispatch()

  const categoryFilter = useSelector(selectors.getCategoryFilter)

  const isSelected = (() => {
    if (!categoryFilter) return false

    return (filterKind === 'cat' && filterParam === categoryFilter.cat) ||
      (filterKind === 'subcat' && filterParam === categoryFilter.subcat)
  })()

  const toggleIsSelected = isSelected
    ? () => dispatch(actions.setCategoryFilter())
    : () => dispatch(actions.setCategoryFilter(
      filterKind === 'cat' ? filterParam : null,
      filterKind === 'subcat' ? filterParam : null))

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
