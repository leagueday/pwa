import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Color from 'color'
import cx from 'classnames'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded'
import MenuIcon from '@material-ui/icons/Menu'

import * as colors from '../styling/colors'
import { actions, selectors } from '../store'

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
  betaNotice: {
    fontFamily: theme.typography.serif,
    fontSize: '75%',
    fontStyle: 'oblique',
    marginLeft: '0.5em',
    paddingBottom: '0.04em',
    textShadow: `1px 1px ${Color(colors.pinkSalmon).darken(0.45)}`,
  },
  discordLogo: {
    marginLeft: '0.5em',
    marginBottom: '-0.1em',
    maxHeight: '1.75em',
    paddingTop: '0.35em',
  },
  clickable: {
    cursor: 'pointer',
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
  mainButton: {
  },
  mainButtonContainer: {
    border: `1px solid ${theme.palette.grey[900]}`,
    borderRadius: theme.shape.borderRadius,
    margin: '0.1em',
  },
  vintageTube: {
    color: colors.vintageTubeBright,
  },
}))

const AppBar = props => {
  const dispatch = useDispatch()

  const theme = useTheme()
  const screenIsXs = useMediaQuery(theme.breakpoints.only('xs'))

  const classes = useStyles()

  const navVisibility = useSelector(selectors.getNavVisibility)

  const previousLocations = useSelector(selectors.getRouterPreviousLocations)
  const backIsElsewhere = (previousLocations?.length ?? 1) === 1

  const goMain = () => { dispatch(actions.pushHistory('/')) }
  const goBack = backIsElsewhere ? goMain : () => { dispatch(actions.goHistory(-1)) }

  let mainButtonOnclick = null
  let MainButtonMuiIcon = null
  let extraLogoClass = null
  let logoOnclick = null

  // when not at main, tapping on the logo should go to main
  if (props.mode !== 'main') {
    extraLogoClass = classes.clickable
    logoOnclick = goMain
  }

  // main button setup, given props.mode
  if (props.mode === 'back') {
    MainButtonMuiIcon = ArrowBackRoundedIcon
    mainButtonOnclick = goBack
  }
  else { // main/default - burger button game/cat filters
    MainButtonMuiIcon = MenuIcon

    const isNavVisible = screenIsXs ? navVisibility === true : navVisibility !== false

    if (isNavVisible) {
      mainButtonOnclick = () => dispatch(actions.hideNav())
    } else {
      mainButtonOnclick = () => dispatch(actions.showNav())
    }
  }

  const mainButtonRef = React.useRef()

  return (
    <div className={classes.appBarContainer}>
      <div className={classes.mainButtonContainer}>
        <IconButton
          ref={mainButtonRef}
          className={classes.mainButton}
          disableRipple
          onClick={mainButtonOnclick}
          size="small"
          value="showNav"
        >
          <MainButtonMuiIcon className={classes.vintageTube} />
        </IconButton >
      </div>
      <img
        className={cx(classes.logo, extraLogoClass)}
        src="/img/logo_vt.png"
        alt="LeagueDay"
        onClick={logoOnclick}
      />
      <div className={classes.betaNotice}>BETA</div>
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
        <MenuNav anchor={mainButtonRef.current} />
      </Hidden>
    </div>
  )
}

export default AppBar
