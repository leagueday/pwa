import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import useGameboard from '../api/useGameboard'
import * as actions from '../store/actions'
import * as selectors from '../store/selectors'

const NO_FILTER = 'X'

const useStyles = makeStyles(theme => ({
  filterSelect: {
    width: '100%',
  },
  menuItemContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '80%',
    justifyContent: 'flex-start',
    maxHeight: '2em',
    overflowX: 'clip',
    paddingRight: '0.5em',
  },
  menuItemIcon: {
    marginRight: '0.5em',
    maxHeight: '1.5em',
  },
  smallNavContainer: {
    backgroundColor: 'lightgreen',
  },
}))

const makeFilterString = categoryFilter => {
  if (!categoryFilter) return ''

  const {cat, subcat} = categoryFilter

  const sCat = cat ?? ''
  const sSubcat = subcat ?? ''

  return `${sCat},${sSubcat}`
}

const unmakeFilterString = filterString => {
  if (!filterString || filterString === NO_FILTER) return {cat: null, subcat: null}

  const [cat, subcat] = filterString.split(',')

  const mCat = cat ? cat : null
  const mSubcat = subcat ? subcat : null

  return {cat: mCat, subcat: mSubcat}
}

const GameboardOption = ({data, filterString}) => {
  const {id, name, filterKind, filterParam, imageUrl} = data

  const classes = useStyles()

  const matchingFilter = makeFilterString(
    filterKind === 'cat'
      ? {cat: filterParam}
      : filterKind === 'subcat'
      ? {subcat: filterParam}
      : null
  )

  return (
    <MenuItem value={matchingFilter}>
      <div className={classes.menuItemContent}>
        <img className={classes.menuItemIcon} src={imageUrl}/>
        {name}
      </div>
    </MenuItem>
  )
}

const SmallNav = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const {data: gameboardData} = useGameboard()

  const categoryFilter = useSelector(selectors.getCategoryFilter)

  const filterString = makeFilterString(categoryFilter)

  const handleOnChange = ev => {
    const nextFilterString = ev.target.value

    const {cat, subcat} = unmakeFilterString(nextFilterString)
    console.log('next filter', JSON.stringify({cat, subcat}))

    dispatch(actions.setCategoryFilter(cat, subcat))
  }

  return (
    <div className={classes.smallNavContainer}>
      <Select className={classes.filterSelect} onChange={handleOnChange} value={filterString}>
        <MenuItem value={NO_FILTER}>&nbsp;</MenuItem>
        { gameboardData &&
            gameboardData.map(
              (data) => (
                <GameboardOption key={data.id} data={data} />
              )
            )
        }
        <MenuItem value="10">Ten</MenuItem>
        <MenuItem value="20">Twenty</MenuItem>
      </Select>
    </div>
  )
}

export default SmallNav
