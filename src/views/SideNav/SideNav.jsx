import React from 'react'

import Hidden from '@material-ui/core/Hidden'

import FatSideNav from './Fat'
import SkinnySideNav from './Skinny'

const SideNav = ({ className, home, visible }) => {
  return visible ? (
    <>
      <Hidden smDown>
        {visible && <FatSideNav className={className} home={home} />}
      </Hidden>
    </>
  ) : null
}

export default SideNav
