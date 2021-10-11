import React, { useState } from 'react'
import { useLocationPathname } from '../../store'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../styling'

import { useTheme } from '@material-ui/core/styles'
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    background: colors.darkerGray,
  },
  text: {
    fontSize: '.5rem',
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const MobileNav = () => {
  
  const pathname = useLocationPathname()
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.down('xs'))
  const user = useSelector(selectors.getUser)
  const [homeActive, setHomeActive] = useState(pathname === '/')
  const [creatorActive, setCreatorActive] = useState(pathname === '/creators')
  const [profileActive, setProfileActive] = useState(
    pathname === `/profile/${user.id}`
  )

  return (
    smUp && (
      <div className={classes.wrapper}>
        <p
          className={classes.link}
          onClick={() => dispatch(actions.pushHistory(`/`))}
        >
          {homeActive ? <HomeIcon /> : <HomeOutlinedIcon />}
          <span className={classes.text}>Discover</span>
        </p>
        <p
          className={classes.link}
          onClick={() => dispatch(actions.pushHistory(`/creators`))}
        >
          {creatorActive ? <GroupAddIcon /> : <GroupAddOutlinedIcon />}
          <span className={classes.text}>Social</span>
        </p>
        <p
          className={classes.link}
          onClick={() => dispatch(actions.pushHistory(`/profile/${user?.id}`))}
        >
          {profileActive ? <PersonIcon /> : <PersonOutlineIcon />}
          <span className={classes.text}>Profile</span>
        </p>
      </div>
    )
  )
}

export default MobileNav
