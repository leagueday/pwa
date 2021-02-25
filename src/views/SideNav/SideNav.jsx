import React from 'react'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import {constants as storeConsts} from '../../store'
import * as apiConsts from '../../api/consts'
import useGameboard from '../../api/useGameboard'
import useStarred from '../../api/useStarred'

import Item from './Item'
import Expander from './Expander'
import LiveAndUpcomingLozenge from './LiveAndUpcomingLozenge'
import NonExpander from './NonExpander'
import SearchLozenge from './SearchLozenge'

const MY_LIST_TEXT_COLOR = colors.blue

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  inset: {
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    width: '100%',
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
    fontFamily: theme.typography.family.primary,
    overflowX: 'hidden',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  itemNameChild: {
    fontSize: '90%',
  },
  itemNameStandalone: {
  },
  lozenge: {
    marginBottom: '0.5em',
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
    fontFamily: theme.typography.family.primary,
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  myExpanderHeadingIcon: {
    color: theme.palette.text.primary,
    height: '0.7em',
    width: '0.7em',
  },
  myExpanderHeadingIconBracket: {
    alignItems: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'row',
    fontFamily: theme.typography.family.primary,
    fontSize: '90%',
    justifyContent: 'flex-start',
    marginRight: '0.3em',
    textShadow: `1px 1px ${colors.lightGray}`,
  },
  myExpanderContent: {
    paddingLeft: '0.5em',
  },
  selectable: {
    border: `1px solid transparent`,
  },
  selected: ({textColor}) => ({
    backgroundColor: colors.darkGray,
    border: `1px solid ${colors.blue}`,
    borderRadius: theme.shape.borderRadius,
    color: textColor ?? theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
  }),
  sideNav: {
    backgroundColor: colors.darkerGray,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    paddingBottom: '0.5em',
    paddingTop: '0.5em',
    width: '100%',
  },
}))

const SideNav = () => {
  const classes = useStyles()

  const [, , , isStarsEmpty] = useStarred()
  const {data: gameboardData} = useGameboard()

  return (
    <div className={classes.sideNav}>
      <SearchLozenge className={classes.lozenge} />
      <LiveAndUpcomingLozenge className={classes.lozenge} />
      <div className={classes.inset}>
        <Item classes={classes} text="Featured" filterKind={storeConsts.FILTER_KIND_FEATURED} standAlone />
        {!isStarsEmpty && (
          <>
            <Item classes={classes} text="My List" textColor={MY_LIST_TEXT_COLOR} filterKind={storeConsts.FILTER_KIND_MY_LIST} standAlone />
          </>
        )}
        <NonExpander classes={classes} text="By Category">
          <Expander
            classes={classes}
            text="Video Games"
            tag={storeConsts.NAV_EXPANDER_VIDEO_GAMES}
          >
            {
              gameboardData && gameboardData.map(
                ({id, name, filterKind, filterParam, imageUrl}) => (
                  <Item
                    key={`gb.${id}`}
                    classes={classes}
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
            classes={classes}
            text="iGaming"
            tag={storeConsts.NAV_EXPANDER_IGAMING}
            filterKind={storeConsts.FILTER_KIND_CAT}
            filterParam={apiConsts.CAT_IGAMING}
          >
            <Item
              classes={classes}
              text="Sports Betting"
              filterKind={storeConsts.FILTER_KIND_SUBCAT}
              filterParam={apiConsts.SUBCAT_SPORTS_BETTING}
              imageUrl="/img/betting.png"
            />
            <Item
              classes={classes}
              text="Fantasy"
              filterKind={storeConsts.FILTER_KIND_SUBCAT}
              filterParam={apiConsts.SUBCAT_FANTASY_SPORTS}
              imageUrl="/img/fantasy.png"
            />
          </Expander>
          <Expander
            classes={classes}
            text="Classic Games"
            tag={storeConsts.NAV_EXPANDER_CLASSIC_GAMES}
            filterKind={storeConsts.FILTER_KIND_CAT}
            filterParam={apiConsts.CAT_CLASSIC}
          >
            <Item
              classes={classes}
              text="Chess"
              filterKind={storeConsts.FILTER_KIND_SUBCAT}
              filterParam={'Chess'}
              imageUrl="img/chess.png"
            />
          </Expander>
        </NonExpander>
      </div>
    </div>
  )
}

export default SideNav
