import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cx from 'classnames'
import Color from 'color'

import {makeStyles} from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'

import AddRoundedIcon from '@material-ui/icons/AddRounded'
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded'

import * as colors from '../styling/colors'
import {actions, constants as storeConsts, selectors, useFilter} from '../store'
import * as apiConsts from '../api/consts'
import {proxifyHttpUrl} from '../api/util'
import useGameboard from '../api/useGameboard'
import useStarred from '../api/useStarred'

// Note that Material-UI Accordion was tried and had too much spacing,
// which seemed really difficult to tune. So this component rolls its
// own Accordion/ExpanderPanel, with hopefully kind of snazzy styling
// including a `Collapse` transition

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  item: ({textColor}) => ({
    alignItems: 'center',
    color: textColor ?? theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0.15em',
    userSelect: 'none',
  }),
  itemImage: {
    height: '1em',
    marginRight: '0.35em',
  },
  itemName: {
    fontFamily: theme.typography.nav,
    overflowX: 'hidden',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  itemNameChild: {
    fontSize: '75%',
  },
  itemNameStandalone: {
    fontSize: '90%',
  },
  myExpander: {
    userSelect: 'none',
    marginBottom: '0.25em',
  },
  myExpanderHeading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '90%',
    justifyContent: 'flex-start',
    marginBottom: '0.25em',
    width: '100%',
  },
  myExpanderHeadingText: {
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.nav,
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  myExpanderHeadingIcon: {
    color: colors.vintageTubeFaint,
    height: '0.4em',
    marginLeft: '-0.1em',
    marginRight: '-0.1em',
    width: '0.4em',
  },
  myExpanderHeadingIconBracket: {
    alignItems: 'center',
    color: colors.sienna,
    display: 'flex',
    flexDirection: 'row',
    fontFamily: theme.typography.mono,
    fontSize: '70%',
    justifyContent: 'flex-start',
    marginRight: '0.3em',
    textShadow: `1px 1px ${colors.darkSienna}`,
  },
  myExpanderContent: {
    paddingLeft: '0.5em',
  },
  selectable: {
    border: `1px solid transparent`,
  },
  selected: ({textColor}) => ({
    backgroundColor: colors.blackPlum,
    border: `1px solid ${Color(colors.blackPlum).lighten(0.5).string()}`,
    borderRadius: theme.shape.borderRadius,
    color: textColor ?? theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
  }),
  sideNav: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '0.5em',
    minHeight: '100%',
    padding: '0.5em',
  },
}))

const makeFilterOnclick = (dispatch, filterKind, filterParam) => () => {
  dispatch(actions.setFilter(
    filterKind,
    filterKind === storeConsts.FILTER_KIND_CAT ? filterParam : null,
    filterKind === storeConsts.FILTER_KIND_SUBCAT ? filterParam : null))
}

const isMatchingFilter = (storeFilter, filterKind, filterParam) => {
  if (!storeFilter || !filterKind) return false

  if (filterKind !== storeFilter.kind) return false

  return (filterKind === storeConsts.FILTER_KIND_CAT && filterParam === storeFilter.cat) ||
    (filterKind === storeConsts.FILTER_KIND_SUBCAT && filterParam === storeFilter.subcat) ||
    (
      filterKind === storeConsts.FILTER_KIND_FEATURED ||
      filterKind === storeConsts.FILTER_KIND_MY_LIST
    )
}

const Item = ({text, textColor, imageUrl, filterKind, filterParam, disabled, standAlone}) => {
  const classes = useStyles({textColor})
  const dispatch = useDispatch()

  const filter = useFilter()

  const isSelected = isMatchingFilter(filter, filterKind, filterParam)

  const toggleIsSelected = isSelected
    ? makeFilterOnclick(dispatch, storeConsts.FILTER_KIND_FEATURED)
    : makeFilterOnclick(dispatch, filterKind, filterParam)

  const maybeProxiedImageUrl = proxifyHttpUrl(imageUrl, apiConsts.PROXY_RESPONSE_KIND_IMG)

  return (
    <div
      className={
      cx(
        classes.item,
        classes.selectable,
        {
          [classes.clickable]: !disabled,
          [classes.selected]: !disabled && isSelected,
        },
      )}
      onClick={disabled ? null : toggleIsSelected}
    >
      {maybeProxiedImageUrl && (<img className={classes.itemImage} src={maybeProxiedImageUrl} />)}
      <div className={cx(
        classes.itemName,
        {
          [classes.itemNameChild]: !standAlone,
          [classes.itemNameStandalone]: standAlone,
        }
      )}>
        {text}
      </div>
    </div>
  )
}

const Expander = ({children, text, tag, filterKind, filterParam}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const filter = useFilter()

  const isSelectedFilter = isMatchingFilter(filter, filterKind, filterParam)

  const open = useSelector(selectors.getNavExpander(tag))

  const toggleOpen = () => {
    dispatch(actions.setNavExpander(!open, tag))
  }

  const Icon = open ? RemoveRoundedIcon : AddRoundedIcon

  const textOnClick = filterKind
    ? (
      isSelectedFilter
        ? makeFilterOnclick(dispatch, storeConsts.FILTER_KIND_FEATURED)
        : makeFilterOnclick(dispatch, filterKind, filterParam)
    ) : toggleOpen

  return (
    <div className={cx(
      classes.myExpander,
    )}>
      <div className={cx(
        classes.myExpanderHeading,
        classes.selectable,
        {
          [classes.selected]: isSelectedFilter,
        }
      )}>
        <div className={cx(classes.myExpanderHeadingIconBracket, classes.clickable)} onClick={toggleOpen}>
          [
          <Icon className={classes.myExpanderHeadingIcon} />
          ]
        </div>
        <div className={cx(classes.myExpanderHeadingText, classes.clickable)} onClick={textOnClick}>
          {text}
        </div>
      </div>
      <Collapse in={open} timeout={'auto'}>
        <div className={classes.myExpanderContent}>
          {children}
        </div>
      </Collapse>
    </div>
  )
}

const NonExpander = ({children, text, filterKind, filterParam}) => {
  // this is styled like the Expander but without expander action, it fits in alongside though
  const classes = useStyles()

  const dispatch = useDispatch()

  const filter = useFilter()

  const isSelectedFilter = isMatchingFilter(filter, filterKind, filterParam)

  const textOnClick = filterKind
    ? (
      isSelectedFilter
        ? makeFilterOnclick(dispatch, storeConsts.FILTER_KIND_FEATURED)
        : makeFilterOnclick(dispatch, filterKind, filterParam)
    ) : null

  return (
    <div className={cx(
      classes.myExpander,
    )}>
      <div className={cx(
        classes.myExpanderHeading,
        classes.selectable,
        {
          [classes.selected]: isSelectedFilter,
        }
      )}>
        <div className={cx(
          classes.myExpanderHeadingText,
          {
            [classes.clickable]: !!textOnClick,
          }
        )} onClick={textOnClick}>
          {text}
        </div>
      </div>
      <div className={classes.myExpanderContent}>
        {children}
      </div>
    </div>
  )
}

const SideNav = () => {
  const classes = useStyles()

  const [, , , isStarsEmpty] = useStarred()
  const {data: gameboardData} = useGameboard()

  return (
    <div className={classes.sideNav}>
      <Item text="Featured" filterKind={storeConsts.FILTER_KIND_FEATURED} standAlone />
      {!isStarsEmpty && (
        <>
          <Item text="My List" textColor={colors.pinkSalmon} filterKind={storeConsts.FILTER_KIND_MY_LIST} standAlone />
        </>
      )}
      <NonExpander text="By Category">
        <Expander
          text="Video Games"
          tag={storeConsts.NAV_EXPANDER_VIDEO_GAMES}
        >
          {
            gameboardData && gameboardData.map(
              ({id, name, filterKind, filterParam, imageUrl}) => (
                <Item
                  key={`gb.${id}`}
                  text={name}
                  filterKind={filterKind}
                  filterParam={filterParam}
                  imageUrl={imageUrl}
                />
              )
            )
          }
        </Expander>
        <Expander
          text="iGaming"
          tag={storeConsts.NAV_EXPANDER_IGAMING}
          filterKind={storeConsts.FILTER_KIND_CAT}
          filterParam={apiConsts.CAT_IGAMING}
        >
          <Item
            text="Sports Betting"
            filterKind={storeConsts.FILTER_KIND_SUBCAT}
            filterParam={apiConsts.SUBCAT_SPORTS_BETTING}
            imageUrl="/img/betting.png"
          />
          <Item
            text="Fantasy"
            filterKind={storeConsts.FILTER_KIND_SUBCAT}
            filterParam={apiConsts.SUBCAT_FANTASY_SPORTS}
            imageUrl="/img/fantasy.png"
          />
        </Expander>
        <Expander
          text="Classic Games"
          tag={storeConsts.NAV_EXPANDER_CLASSIC_GAMES}
          filterKind={storeConsts.FILTER_KIND_CAT}
          filterParam={apiConsts.CAT_CLASSIC}
        >
          <Item
            text="Chess"
            filterKind={storeConsts.FILTER_KIND_SUBCAT}
            filterParam={'Chess'}
            imageUrl="img/chess.png"
          />
        </Expander>
      </NonExpander>
      <Item text="Search" disabled standAlone />
    </div>
  )
}

export default SideNav
