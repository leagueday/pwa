import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import MenuIcon from '@material-ui/icons/Menu'
import PauseIcon from '@material-ui/icons/PauseRounded'
import PlayIcon from '@material-ui/icons/PlayArrowRounded'

import * as colors from '../styling/colors'
import * as actions from '../store/actions'
import * as selectors from '../store/selectors'

import * as consts from './consts'
import MenuNav from './MenuNav'

const useStyles = makeStyles(theme => ({
  appBarContainer: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.control,
    display: 'flex',
    flexDirection: 'row',
    maxHeight: consts.APPBAR_HEIGHT,
    minHeight: consts.APPBAR_HEIGHT,
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
    marginBottom: '-0.1em',
    maxHeight: '1.75em',
    paddingTop: '0.35em',
  },
  feedbackCluster: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    fontWeight: theme.typography.fontWeightBold,
    marginLeft: 'auto',
    marginRight: '2em',
    userSelect: 'none',
  },
  link: {
    color: theme.palette.secondary.light,
    textDecoration: 'none',
  },
  logo: {
    marginLeft: '1em',
    maxHeight: '1.5em',
  },
  vintageTube: {
    color: colors.vintageTubeBright,
  },
}))

const AppBar = () => {
  const dispatch = useDispatch()

  const theme = useTheme()
  const screenIsXs = useMediaQuery(theme.breakpoints.only('xs'))

  const classes = useStyles()

  const showCategories = useSelector(selectors.getShowCategories)

  const isCategoriesVisible = screenIsXs ? showCategories === true : showCategories !== false

  let toggleShowCategories = null
  let toggleShowCategoriesLabel = null

  if (isCategoriesVisible) {
    toggleShowCategories = () => dispatch(actions.hideCategories())
    toggleShowCategoriesLabel = 'Hide Categories'
  } else {
    toggleShowCategories = () => dispatch(actions.showCategories())
    toggleShowCategoriesLabel = 'Show Categories'
  }

  const burgerButtonRef = React.useRef()

  return (
    <div className={classes.appBarContainer}>
      <Tooltip title={toggleShowCategoriesLabel}>
        <div className={classes.burgerButtonContainer}>
          <IconButton
            ref={burgerButtonRef}
            className={classes.burgerButton}
            disableRipple
            onClick={toggleShowCategories}
            size="small"
            value="showCategories"
          >
            <MenuIcon className={classes.vintageTube} />
          </IconButton >
        </div>
      </Tooltip>
      <img className={classes.logo} src="/img/logo_vt.png" alt="LeagueDay" />
      <Hidden xsDown>
        <div className={classes.feedbackCluster}>
          <a className={classes.link}
            href="https://docs.google.com/forms/d/e/1FAIpQLSf_pA_9J5Tcp6wgiyDA5VzjZHvscKtsT2810dDy9MmRjVsBWA/viewform"
            target="_none">Give us Feedback ☺️
          </a>
          <a className={classes.link} href="https://discord.gg/uXDQydmnVu" target="_none">
            <img className={classes.discordLogo} src="/img/Discord-Logo-Color.png" alt="Discord" />
          </a>
        </div>
      </Hidden>
      <Hidden smUp>
        <MenuNav anchor={burgerButtonRef.current} />
      </Hidden>
    </div>
  )
}

export default AppBar
