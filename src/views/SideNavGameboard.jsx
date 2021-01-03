import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Color from 'color'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import useGameboard from '../api/useGameboard'
import * as actions from '../store/actions'
import * as selectors from '../store/selectors'

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
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0.5em',
  },
  itemSelected: {
    backgroundColor: Color(theme.palette.primary.dark).fade(0.7).string(),
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
  },
  itemImage: {
    height: '1.25em',
    marginRight: '0.5em',
  },
  itemName: {
    color: theme.palette.text.secondary,
    fontSize: '75%',
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

  return (
    <div className={cx(classes.item, {[classes.itemSelected]: isSelected})} onClick={toggleIsSelected}>
      <img className={classes.itemImage} src={imageUrl} alt={name} />
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
