import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Tooltip from '@material-ui/core/Tooltip'

import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'
import PauseIcon from '@material-ui/icons/PauseRounded'
import PlayIcon from '@material-ui/icons/PlayArrowRounded'
import SearchIcon from '@material-ui/icons/SearchRounded'

import * as actions from '../../store/actions'
import * as selectors from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  card: {
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
    fontWeight: theme.typography.fontWeightBold,
    marginLeft: 'auto',
    marginRight: '2em',
  },
  logo: {
    marginLeft: '1em',
    maxHeight: '1.5em',
  },
  toggleButton: {
  },
  tooltipButton: {
    height: '100%',
    marginLeft: '0.25em',
  },
  transportButton: {
    marginLeft: '0.25em',
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

  const selectedAudio = useSelector(selectors.getSelectedAudio)

  let pauseSelectedAudio = null
  let playSelectedAudio = null

  if (selectedAudio) {
    pauseSelectedAudio = () => dispatch(actions.pauseAudio())
    playSelectedAudio = () => dispatch(actions.playAudio())
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
            <MenuIcon />
          </ToggleButton>
        </span>
      </Tooltip>
      <Tooltip title="Search/Filter tbd">
        <span>
          <IconButton
            className={classes.tooltipButton}
            disabled
            size="small"
          >
            <SearchIcon />
          </IconButton>
        </span>
      </Tooltip>
      <IconButton
        className={classes.transportButton}
        disabled={!playSelectedAudio}
        onClick={playSelectedAudio}
        size="small"
      >
        <PlayIcon />
      </IconButton>
      <IconButton
        className={classes.transportButton}
        disabled={!pauseSelectedAudio}
        onClick={pauseSelectedAudio}
        size="small"
      >
        <PauseIcon />
      </IconButton>
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
