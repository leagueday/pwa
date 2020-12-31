import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import MenuIcon from '@material-ui/icons/Menu'
import PauseIcon from '@material-ui/icons/PauseRounded'
import PlayIcon from '@material-ui/icons/PlayArrowRounded'

import * as actions from '../store/actions'
import * as selectors from '../store/selectors'

const useStyles = makeStyles(theme => ({
  appBarContainer: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.control,
    display: 'flex',
    flexDirection: 'row',
    minHeight: '2.5em',
  },
  burgerButton: {
  },
  burgerButtonContainer: {
    border: `1px solid ${theme.palette.grey[900]}`,
    borderRadius: theme.shape.borderRadius,
    margin: '0.1em',
  },
  discordLogo: {
    marginLeft: '0.5em',
    maxHeight: '1.5em',
    paddingTop: '0.1em',
  },
  feedbackCluster: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontWeight: theme.typography.fontWeightBold,
    marginLeft: 'auto',
    marginRight: '2em',
  },
  logo: {
    marginLeft: '1em',
    maxHeight: '1.5em',
  },
}))

const AppBar = () => {
  const dispatch = useDispatch()

  const classes = useStyles()

  const isCategoriesVisible = useSelector(selectors.getShowCategories)

  let toggleShowCategories = null
  let toggleShowCategoriesLabel = null

  if (isCategoriesVisible) {
    toggleShowCategories = () => dispatch(actions.hideCategories())
    toggleShowCategoriesLabel = 'Hide Categories'
  } else {
    toggleShowCategories = () => dispatch(actions.showCategories())
    toggleShowCategoriesLabel = 'Show Categories'
  }

  return (
    <div className={classes.appBarContainer}>
      <Tooltip title={toggleShowCategoriesLabel}>
        <div className={classes.burgerButtonContainer}>
          <IconButton
            className={classes.burgerButton}
            disableRipple
            onClick={toggleShowCategories}
            size="small"
            value="showCategories"
          >
            <MenuIcon />
          </IconButton >
        </div>
      </Tooltip>
      <img className={classes.logo} src="/img/logo.png" alt="LeagueDay" />
      <Hidden xsDown>
        <div className={classes.feedbackCluster}>
          Give us Feedback ☺️
          <img className={classes.discordLogo} src="/img/Discord-Logo-Color.png" alt="Discord" />
        </div>
      </Hidden>
    </div>
  )
}

export default AppBar
