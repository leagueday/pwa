import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import * as apiConsts from '../api/consts'
import { actions, selectors } from '../store'
import { isHttpUrl, proxifyHttpUrl } from '../api/util'
import useGameboard from '../api/useGameboard'
import usePodcasts from '../api/usePodcasts'

const useStyles = makeStyles(theme => ({
  clearFilterMenuItemContent: {
    color: theme.palette.primary.light,
    fontSize: '70%',
    fontStyle: 'oblique',
  },
  menuItemContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'hidden',
    width: '100%',
  },
  menuItemImage: {
    height: '0.9em',
    marginRight: '0.4em',
  },
  menuItemText: {
    fontSize: '75%',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
}))

const makeCategoryMenuOnClick = (dispatch, closeMenu, cat) =>
  () => {
    dispatch(actions.setCategoryFilter(cat, null))
    closeMenu()
  }

const makeGameboardMenuOnClick = (dispatch, closeMenu, {filterKind, filterParam}) => {
  if (filterKind === 'cat') {
    return () => {
      dispatch(actions.setCategoryFilter(filterParam, null))
      closeMenu()
    }
  } else if (filterKind === 'subcat') {
    return () => {
      dispatch(actions.setCategoryFilter(null, filterParam))
      closeMenu()
    }
  } else { // no op
    return () => {
      closeMenu()
    }
  }
}

const ClearFilterMenuContent = ({filterDescription}) => {
  const classes = useStyles()

  return (
    <div className={classes.clearFilterMenuItemContent}>
      (filtered to {filterDescription} - tap to clear)
    </div>
  )
}

const MenuContent = ({data}) => {
  const {id, name, filterKind, filterParam, imageUrl} = data

  const classes = useStyles()

  const maybeProxiedImageUrl = proxifyHttpUrl(imageUrl, apiConsts.PROXY_RESPONSE_KIND_IMG)

  return (
    <div className={classes.menuItemContent}>
      {imageUrl && (<img className={classes.menuItemImage} src={maybeProxiedImageUrl} />)}
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

  const {categories} = usePodcasts()
  const {data: gameboardData} = useGameboard()

  const showCategories = useSelector(selectors.getShowCategories)
  const categoryFilter = useSelector(selectors.getCategoryFilter)

  // by default the menu is not visible
  // although currently same category-filter feature is provided by menu and sidenav
  // the sidenav is by default open
  const isMenuVisible = showCategories === true

  const isFiltered = categoryFilter && (categoryFilter.cat || categoryFilter.subcat)

  return (
    <Menu
      anchorEl={anchor}
      open={isMenuVisible}
      onClose={closeMenu}
    >
      { isFiltered && (
        <MenuItem onClick={() => {
          dispatch(actions.setCategoryFilter())
          closeMenu()
        }}>
          <ClearFilterMenuContent filterDescription={`${categoryFilter.cat ?? categoryFilter.subcat}`} />
        </MenuItem>
        )
      }
      { gameboardData &&
        gameboardData.map(
          (data) => (
            <MenuItem key={data.id} onClick={makeGameboardMenuOnClick(dispatch, closeMenu, data)}>
              <MenuContent data={data} />
            </MenuItem>
          )
        )
      }
      { categories &&
        categories.map(
          cat => (
            <MenuItem key={cat} onClick={makeCategoryMenuOnClick(dispatch, closeMenu, cat)}>
              <MenuContent data={{name: cat}} />
            </MenuItem>
          )
        )
      }
    </Menu>
  )
}

export default MenuNav
