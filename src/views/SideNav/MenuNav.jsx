import React from 'react'
import {useDispatch} from 'react-redux'

import {makeStyles} from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles(theme => ({
}))

const MenuNav = ({anchor, hide, isVisible}) => {
  const classes = useStyles()

  return (
    <Menu
      id="menu-nav"
      anchorEl={anchor}
      keepMounted
      open={isVisible}
      onClose={hide}
    >
      <MenuItem onClick={hide}>Three</MenuItem>
      <MenuItem onClick={hide}>Mocked</MenuItem>
      <MenuItem onClick={hide}>MenuItems</MenuItem>
    </Menu>
  )
}

export default MenuNav
