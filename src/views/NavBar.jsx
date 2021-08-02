import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { colors } from '../styling'
import { useDispatch } from 'react-redux'
import { actions } from '../store'

const useStyles = makeStyles(theme => ({
  navbar: {
    padding: 0,
    margin: 0,
    position: 'relative',
    height: '50px',
    width: '100%',
    background: colors.darkerGray,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  logoContainer: {
    width: '180px',
    cursor: 'pointer',
  },
  logo: {
    cursor: 'pointer',
    width: '100%',
    marginBottom: '0',
    marginBottom: 0,
  },
  logoText: {
    position: 'absolute',
    top: -5,
    left: '6.5%',
    // opacity: 0.8,
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
    '&:hover': {
      borderBottom: `2px solid ${colors.magenta}`,
    },
  },
}))

const NavBar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const goHome = () => dispatch(actions.pushHistory('/'))
  const [homeActive, setHomeActive] = useState(true)
  const [creatorActive, setCreatorActive] = useState(false)

  const homeClick = () => {
    setHomeActive(true)
    setCreatorActive(false)
  }

  const creatorClick = () => {
      setCreatorActive(true)
      setHomeActive(false);
  }

  return (
    <div className={classes.navbar}>
      <div className={classes.logoContainer} onClick={goHome}>
        <img className={classes.logo} src="/img/NEW_LDLogo.png" />
        <p className={classes.logoText}>BETA</p>
      </div>
      <div className={classes.navLinks}>
        <h4 className={classes.link} onClick={goHome}>
          Discover
        </h4>
        <h4
          className={classes.link}
          onClick={() => dispatch(actions.pushHistory('/creators'))}
        >
          Creators
        </h4>
      </div>
    </div>
  )
}

export default NavBar
