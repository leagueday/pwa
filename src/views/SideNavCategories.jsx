import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Color from 'color'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import { actions, constants as storeConsts, selectors, useFilter } from '../store'
import usePodcasts from '../api/usePodcasts'

const useStyles = makeStyles(theme => ({
  category: {
    border: `1px solid transparent`,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    fontSize: '85%',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  categorySelected: {
    backgroundColor: Color(theme.palette.primary.dark).fade(0.8).string(),
    border: `1px solid ${Color(theme.palette.primary.dark).fade(0.6).string()}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
  }
}))

const Item = ({cat}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const filter = useFilter()

  const isSelected = filter.kind === storeConsts.FILTER_KIND_CAT && cat === filter.cat

  const toggleIsSelected = isSelected
    ? () => dispatch(actions.setFilter(storeConsts.FILTER_KIND_FEATURED))
    : () => dispatch(actions.setFilter(storeConsts.FILTER_KIND_CAT, cat, null))

  return (
    <div className={cx(classes.category, {[classes.categorySelected]: isSelected})} onClick={toggleIsSelected}>
      {cat}
    </div>
  )
}

const SideNavCategories = () => {
  const classes = useStyles()

  const {categories} = usePodcasts()

  if (!categories) return null

  return (
    <Card className={classes.container}>
      {
        categories.filter(cat => cat !== 'Uncategorized').map(
          cat => (<Item key={cat} cat={cat} />)
        )
      }
    </Card>
  )
}

export default SideNavCategories
