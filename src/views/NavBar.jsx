import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { colors } from '../styling'
import { useDispatch } from 'react-redux'
import { actions } from '../store'
import { useLocationPathname } from '../store'

const useStyles = makeStyles(theme => ({
  navbar: {
    padding: 0,
    margin: 0,
    position: 'relative',
    height: '7%',
    width: '100%',
    background: colors.darkGray,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    width: '180px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  logo: {
    cursor: 'pointer',
    width: '100%',
    marginBottom: '0',
    marginBottom: 0,
  },
  logoText: {
    position: 'absolute',
    top: 0,
    left: '6.5%',
    textAlign: 'top',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '150%',
    color: colors.magenta,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    width: '20%',
    justifyContent: 'space-evenly',
  },
  link: {
    cursor: 'pointer',
    position: 'relative',
    borderBottom: `2px solid ${colors.darkerGray}`,
    '&:before': {
      content: "''",
      display: 'block',
      width: '100%',
      height: '2px',
      background: `linear-gradient(90deg, ${colors.cyan} 0%, ${colors.magenta} 50%, ${colors.yellow} 100%)`,
      position: 'absolute',
      left: 0,
      zIndex: 100,
      bottom: '-2px',
      transformOrigin: 'left',
      transform: 'scale(0)',
      transition: '0.1s linear',
    },
    '&:hover:before': {
      transform: 'scale(1)',
    },
  },
  selectedLink: {
    borderBottom: `2px solid ${colors.magenta}`,
  },
}))

const NavBar = () => {
  const pathname = useLocationPathname()
  const classes = useStyles()
  const dispatch = useDispatch()
  const goHome = () => dispatch(actions.pushHistory('/'))
  const [homeActive, setHomeActive] = useState(pathname === '/')
  const [creatorActive, setCreatorActive] = useState(pathname === '/creators')

  const homeClick = () => {
    setHomeActive(true)
    setCreatorActive(false)
  }

  const creatorClick = () => {
    setCreatorActive(true)
    setHomeActive(false)
  }

  return (
    <div className={classes.navbar}>
      <div className={classes.logoContainer} onClick={goHome}>
        <img className={classes.logo} src="/img/NEW_LDLogo.png" />
        <p className={classes.logoText}>BETA</p>
      </div>
      <div className={classes.navLinks}>
        <h4
          className={homeActive ? classes.selectedLink : classes.link}
          onClick={() => {
            goHome()
            homeClick()
          }}
        >
          Discover
        </h4>
        <h4
          className={creatorActive ? classes.selectedLink : classes.link}
          onClick={() => {
            dispatch(actions.pushHistory('/creators'))
            creatorClick()
          }}
        >
          Creators
        </h4>
      </div>
    </div>
  )
}

export default NavBar
