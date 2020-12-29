import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Tooltip from '@material-ui/core/Tooltip'

import MenuIcon from '@material-ui/icons/Menu'
import PauseIcon from '@material-ui/icons/PauseRounded'
import PlayIcon from '@material-ui/icons/PlayArrowRounded'

import * as actions from '../../store/actions'
import * as selectors from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.control,
    display: 'flex',
    flexDirection: 'row',
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
    fontWeight: 700,
    marginLeft: 'auto',
    marginRight: '2em',
  },
  logo: {
    marginLeft: '1em',
    maxHeight: '1.5em',
  },
  toggleButton: {
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
  // <div className={classes.logoContainer}>

  return (
    <Card className={classes.container}>
      <Tooltip title={toggleShowCategoriesLabel}>
        <span>
          <ToggleButton
            className={classes.toggleButton}
            onClick={toggleShowCategories}
            selected={isCategoriesVisible}
            size="small"
            value="showCategories"
          >
            <MenuIcon />
          </ToggleButton>
        </span>
      </Tooltip>
      <img className={classes.logo} src="/img/logo.png" alt="LeagueDay" />
      <Hidden xsDown>
        <div className={classes.feedbackCluster}>
          Give us Feedback ☺️
          <img className={classes.discordLogo} src="/img/Discord-Logo-Color.png" alt="Discord" />
        </div>
      </Hidden>
    </Card>
  )
}

export default AppBar
