import React from 'react'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'

import Expander from './Expander'
import LiveAndUpcomingLozenge from './LiveAndUpcomingLozenge'
import MyChannels from './MyChannels'
import MyPodcasts from './MyPodcasts'
import SearchLozenge from './SearchLozenge'

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  expander: {
    marginBottom: '0.5em',
    paddingTop: '0.5em',
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

  return (
    <div className={classes.sideNav}>
      <SearchLozenge className={classes.lozenge} />
      <LiveAndUpcomingLozenge className={classes.lozenge} />
      <div className={classes.inset}>
        <Expander className={classes.expander} text="MY CHANNELS" tag="chan">
          <MyChannels />
        </Expander>
        <Expander className={classes.expander} text="MY PODCASTS" tag="poca">
          <MyPodcasts />
        </Expander>
      </div>
    </div>
  )
}

export default SideNav
