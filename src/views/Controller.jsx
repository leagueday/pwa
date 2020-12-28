import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Tooltip from '@material-ui/core/Tooltip'

import CategoryIcon from '@material-ui/icons/CategoryRounded'
import PauseIcon from '@material-ui/icons/PauseRounded'
import PlayIcon from '@material-ui/icons/PlayArrowRounded'
import SearchIcon from '@material-ui/icons/SearchRounded'

import * as selectors from '../store/selectors'
import * as actions from '../store/actions'

const useStyles = makeStyles(theme => ({
  card: {
  },
  toggleButton: {
  },
  transportButton: {
    marginLeft: '0.25em',
  }
}))

const Controller = () => {
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
            <CategoryIcon />
          </ToggleButton>
        </span>
      </Tooltip>
      <Tooltip title="Search/Filter tbd">
        <span>
          <IconButton
            className={classes.transportButton}
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
    </Card>
  )
}

export default Controller
