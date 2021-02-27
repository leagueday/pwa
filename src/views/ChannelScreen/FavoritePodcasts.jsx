import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  favoritePodcasts: { },
}))

const FavoritePodcasts = ({children, className}) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.favoritePodcasts, className)}>
      favorite podcasts
    </div>
  )
}

export default FavoritePodcasts
