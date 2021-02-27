import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  bottomBlock: { },
}))

const BottomBlock = ({children, className, title}) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.bottomBlock, className)}>
      <div>{title} bottom block</div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default BottomBlock
