import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import useGameboard from '../api/useGameboard'
import * as actions from '../store/actions'
import * as selectors from '../store/selectors'

const useStyles = makeStyles(theme => ({
  menuItemContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  menuItemImage: {
    height: '1em',
    marginRight: '0.5em',
  },
  menuItemText: {
    fontSize: '80%',
  },
}))

const makeGameboardMenuOnClick = (dispatch, closeMenu, {filterKind, filterParam}) => {
  if (filterKind === 'cat') {
    return () => {
      closeMenu()
      dispatch(actions.setCategoryFilter(filterParam, null))
    }
  } else if (filterKind === 'subcat') {
    return () => {
      closeMenu()
      dispatch(actions.setCategoryFilter(null, filterParam))
    }
  } else { // no op
    return () => {
      closeMenu()
    }
  }
}

const GameboardMenuContent = ({data}) => {
  const {id, name, filterKind, filterParam, imageUrl} = data

  const classes = useStyles()

  return (
    <div className={classes.menuItemContent}>
      {imageUrl && (<img className={classes.menuItemImage} src={imageUrl} />)}
      <div className={classes.menuItemText}>
        {name}
      </div>
    </div>
  )
}

const MenuNav = ({anchor}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const closeMenu = () => dispatch(actions.hideCategories())

  const {data: gameboardData} = useGameboard()

  const showCategories = useSelector(selectors.getShowCategories)
  const categoryFilter = useSelector(selectors.getCategoryFilter)

  // by default the menu is not visible
  // although currently same category-filter feature is provided by menu and sidenav
  // the sidenav is by default open
  const isCategoriesVisible = showCategories === true

  const isFiltered = categoryFilter && (categoryFilter.cat || categoryFilter.subcat)

  return (
    <Menu
      anchorEl={anchor}
      open={isCategoriesVisible}
      onClose={closeMenu}
    >
      { isFiltered && (
        <MenuItem onClick={() => {
          dispatch(actions.setCategoryFilter())
          closeMenu()
        }}>
          <GameboardMenuContent data={{name:'Show everything'}} />
        </MenuItem>
        )
      }
      { gameboardData &&
        gameboardData.map(
          (data) => (
            <MenuItem key={data.id} onClick={makeGameboardMenuOnClick(dispatch, closeMenu, data)}>
              <GameboardMenuContent data={data} />
            </MenuItem>
          )
        )
      }
    </Menu>
  )
}

export default MenuNav
