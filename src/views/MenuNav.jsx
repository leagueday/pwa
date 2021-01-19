import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import * as apiConsts from '../api/consts'
import { actions, constants as storeConsts, selectors, useFilter } from '../store'
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
    dispatch(actions.setFilter(storeConsts.FILTER_KIND_CAT, cat, null))
    closeMenu()
  }

const makeGameboardMenuOnClick = (dispatch, closeMenu, {filterKind, filterParam}) => {
  switch (filterKind) {
    case storeConsts.FILTER_KIND_FEATURED:
    case storeConsts.FILTER_KIND_MY_LIST:
      return () => {
        dispatch(filterKind)
        closeMenu()
      }
    case storeConsts.FILTER_KIND_CAT:
      return () => {
        dispatch(actions.setFilter(filterKind, filterParam, null))
        closeMenu()
      }
    case storeConsts.FILTER_KIND_SUBCAT:
      return () => {
        dispatch(actions.setFilter(filterKind, null, filterParam))
        closeMenu()
      }
    default:
      return () => {
        // no op
        closeMenu()
      }
  }
}

const makeFilterDescription = ({kind, cat, subcat}) => {
  switch (kind) {
    case storeConsts.FILTER_KIND_FEATURED:
      return 'Featured'
    case storeConsts.FILTER_KIND_MY_LIST:
      return 'My List'
    case storeConsts.FILTER_KIND_CAT:
      return cat
    case storeConsts.FILTER_KIND_SUBCAT:
      return subcat
    default:
      return ''
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
  const dispatch = useDispatch()

  const closeMenu = () => dispatch(actions.hideCategories())

  const {categories} = usePodcasts()
  const {data: gameboardData} = useGameboard()

  const showCategories = useSelector(selectors.getShowCategories)
  const filter = useFilter()
  const {kind: filterKind, cat: filterCat, subcat: filterSubcat} = filter

  // by default the menu is not visible
  // although currently same category-filter feature is provided by menu and sidenav
  // the sidenav is by default open
  const isMenuVisible = showCategories === true

  const isFiltered =
    filterKind === storeConsts.FILTER_KIND_FEATURED ||
    filterKind === storeConsts.FILTER_KIND_MY_LIST ||
    (filterKind === storeConsts.FILTER_KIND_CAT && filterCat) ||
    (filterKind === storeConsts.FILTER_KIND_SUBCAT && filterSubcat)

  return (
    <Menu
      anchorEl={anchor}
      open={isMenuVisible}
      onClose={closeMenu}
    >
      { isFiltered && (
        <MenuItem onClick={() => {
          dispatch(actions.setFilter(storeConsts.FILTER_KIND_FEATURED))
          closeMenu()
        }}>
          <ClearFilterMenuContent filterDescription={makeFilterDescription(filter)} />
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
