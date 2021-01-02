import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Color from 'color'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import usePodcasts from '../api/usePodcasts'
import * as selectors from '../store/selectors'
import * as actions from '../store/actions'

const useStyles = makeStyles(theme => ({
  category: {
    border: `1px solid transparent`,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
  },
  categorySelected: {
    backgroundColor: Color(theme.palette.primary.dark).fade(0.7).string(),
    border: `1px solid ${theme.palette.primary.dark}`,
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

  const categoryFilter = useSelector(selectors.getCategoryFilter)

  const isSelected = (() => {
    if (!categoryFilter) return false

    return !categoryFilter.subcat && cat === categoryFilter.cat
  })()

  const toggleIsSelected = isSelected
    ? () => dispatch(actions.setCategoryFilter())
    : () => dispatch(actions.setCategoryFilter(cat, null))

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