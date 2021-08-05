import { selectors, actions } from '../store'
import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SignInOutButton from './SideNav/SignInOutButton'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../styling'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocationPathname } from '../store'

const useStyles = makeStyles(theme => ({
  navbar: {
    padding: 0,
    margin: 0,
    position: 'relative',
    height: '7%',
    minHeight: '60px',
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
    width: '30%',
    justifyContent: 'space-evenly',
  },
  link: {
    cursor: 'pointer',
    position: 'relative',
    borderBottom: `2px solid ${colors.darkerGray}`,
    opacity: 0.8,
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
    '&:hover': {
      opacity: 1
    },
    '&:hover:before': {
      transform: 'scale(1)',
    },
  },
  selectedLink: {
    borderBottom: `2px solid ${colors.magenta}`,
  },
  profile: {
    borderRadius: '50%',
    height: '50px',
    width: '50px',
    objectFit: 'cover',
    cursor: 'pointer',
    border: `2px solid ${colors.blue}`,
  },
  dropdownCont: {
    position: 'relative',
  },
  dropdown: {
    height: 'auto',
  },
  signInOutButton: {
    fontSize: '95%',
    whiteSpace: 'nowrap',
    width: '45%',
    position: 'absolute',
    color: 'white',
  },
  profileBtn: {
    border: `1px solid ${colors.blue}`,
    borderRadius: '5px',
    transition: '.2s all ease-in-out',
    // width: '100%',
    // height: '100%',
    '&:hover': {
      background: colors.blue
    }
  }
}))

const NavBar = () => {
  const pathname = useLocationPathname()
  const classes = useStyles()
  const dispatch = useDispatch()
  const goHome = () => dispatch(actions.pushHistory('/'))
  const [homeActive, setHomeActive] = useState(pathname === '/')
  const [creatorActive, setCreatorActive] = useState(pathname === '/creators')
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileCreated, setProfileCreated] = useState(false)
  const [userData, setUserData] = useState({})
  const user = useSelector(selectors.getUser)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const getProfileData = () => {
    const baseId = 'appXoertP1WJjd4TQ'
    let fetchSearch
    if (user) {
      const userId = user['id']
      fetchSearch = `?filterByFormula=({userId}=${JSON.stringify(userId)})`
    }
    fetch('/.netlify/functions/airtable-getprofile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `${baseId}/UserProfile${fetchSearch}` }),
    })
      .then(response => response.json())
      .then(function (response) {
        if (response.records.length > 0) {
          setUserData(response.records[0])
          setProfileCreated(true)
          localStorage.setItem(
            'profilecreated',
            response.records[0].fields.profileCreated
          )
        } else {
          setProfileCreated(false)
        }
      })
      .catch(error => {
        console.log('error while data fetching', error)
      })
  }

  const homeClick = () => {
    setHomeActive(true)
    setCreatorActive(false)
  }

  const creatorClick = () => {
    setCreatorActive(true)
    setHomeActive(false)
  }

  useEffect(() => {
    getProfileData()
  }, [])

  const myprofile = () => {
    dispatch(actions.pushHistory(`/profile/${user.id}`))
  }
  const createProfile = () => dispatch(actions.pushHistory('/create'))

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
        <img
          className={classes.profile}
          onClick={handleClick}
          src={
            userData?.fields?.image
              ? userData?.fields?.image
              : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues='
          }
          alt=""
        />
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          classes={{list: classes.dropdown}}
        >
          <div>
            <MenuItem classes={{ root: classes.profileBtn }} >
              {profileCreated ? (
                <p
                onClick={myprofile}
                >
                  PROFILE
                </p>
              ) : (
                <p
                  onClick={createProfile}
                >
                  CREATE PROFILE
                </p>
              )}
            </MenuItem>
            <MenuItem>
              <SignInOutButton className={classes.signInOutButton} />
            </MenuItem>
          </div>
        </Menu>
      </div>
    </div>
  )
}

export default NavBar
