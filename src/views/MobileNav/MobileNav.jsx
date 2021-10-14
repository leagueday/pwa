import React, { useState } from 'react'
import { useLocationPathname } from '../../store'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../styling'
import { useTheme } from '@material-ui/core/styles'
import { isPlatform } from '@ionic/react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import HomeIcon from '@mui/icons-material/Home'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PersonIcon from '@mui/icons-material/Person'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { actions, selectors } from '../../store'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: colors.darkerGray,
  },
  text: {
    fontSize: '.75rem',
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '1.5rem',
  },
}))

const MobileNav = () => {
  const pathname = useLocationPathname()
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.down('xs'))
  const user = useSelector(selectors.getUser)
  const profile = useSelector(selectors.getUserData)
  const homeActive = pathname === '/'
  const creatorActive = pathname === '/creators'
  const profileActive = pathname === `/profile/${user?.id}`

  const handleProfileClick = e => {
    if (!user) {
      dispatch(actions.login())
    } else if (user && !profile) {
      dispatch(actions.pushHistory('/create'))
    } else if (profile) {
      dispatch(actions.pushHistory(`/profile/${user?.id}`))
    }
  }

  return (
    smUp && (
      <div className={classes.wrapper}>
        <p
          className={classes.link}
          onClick={() => dispatch(actions.pushHistory(`/`))}
        >
          {homeActive ? (
            <HomeIcon fontSize={'inherit'} />
          ) : (
            <HomeOutlinedIcon fontSize={'inherit'} />
          )}
          <span className={classes.text}>Discover</span>
        </p>
        <p
          className={classes.link}
          onClick={() => dispatch(actions.pushHistory(`/creators`))}
        >
          {creatorActive ? (
            <GroupAddIcon fontSize={'inherit'} />
          ) : (
            <GroupAddOutlinedIcon fontSize={'inherit'} />
          )}
          <span className={classes.text}>Social</span>
        </p>
        <p className={classes.link} onClick={handleProfileClick}>
          {profileActive ? (
            <PersonIcon fontSize={'inherit'} />
          ) : (
            <PersonOutlineIcon fontSize={'inherit'} />
          )}
          <span className={classes.text}>Profile</span>
        </p>
      </div>
    )
  )
}

export default MobileNav
