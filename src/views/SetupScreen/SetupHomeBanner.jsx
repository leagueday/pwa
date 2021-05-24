import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles(theme => ({
  setupHomeBanner: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}))

const SetupHomeBanner = ({ className }) => {
  const classes = useStyles()

  return (
    <Card className={cx(classes.setupHomeBanner, className)}>
      T.B.D. (migration plan step 13)
    </Card>
  )
}

export default SetupHomeBanner
