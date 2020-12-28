import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Tooltip from '@material-ui/core/Tooltip'

import CategoryIcon from '@material-ui/icons/CategoryRounded'
import SearchIcon from '@material-ui/icons/SearchRounded'

import { getShowCategories } from '../store/selectors'
import { hideCategories, showCategories } from '../store/actions'

const useStyles = makeStyles(theme => ({
  card: {
  },
  toggleButton: {
  },
}))

const Controller = () => {
  const classes = useStyles()

  const isCategoriesVisible = useSelector(getShowCategories)

  const dispatch = useDispatch()

  let toggleShowCategories = null
  let toggleShowCategoriesLabel = null

  if (isCategoriesVisible) {
    toggleShowCategories = () => dispatch(hideCategories())
    toggleShowCategoriesLabel = 'Hide Categories'
  } else {
    toggleShowCategories = () => dispatch(showCategories())
    toggleShowCategoriesLabel = 'Show Categories'
  }

  return (
    <Card className={classes.card}>
      <Tooltip title={toggleShowCategoriesLabel}>
        <span>
          <ToggleButton
            className={classes.toggleButton}
            onClick={toggleShowCategories}
            selected={isCategoriesVisible}
            size="small"
            value="showCategories"
          >
            <CategoryIcon />
          </ToggleButton>
        </span>
      </Tooltip>
      <Tooltip title="Search/Filter coming soon">
        <span>
          <ToggleButton
            className={classes.toggleButton}
            disabled
            selected={false}
            size="small"
            value="searchTbd"
          >
            <SearchIcon />
          </ToggleButton>
        </span>
      </Tooltip>
    </Card>
  )
}

export default Controller
