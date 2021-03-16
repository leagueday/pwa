import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const TITLE_HEIGHT = '2em'

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    fontSize: '90%',
    fontWeight: theme.typography.weight.bold,
    overflow: 'hidden',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
  titleFlex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    height: TITLE_HEIGHT,
    minWidth: 0,
  },
}))

const Title = ({title, onClick}) => {
  const classes = useStyles()

  return (
    <div className={classes.titleFlex}>
      <div className={classes.title} onClick={onClick}>
        {title}
      </div>
    </div>
  )
}

export default Title
