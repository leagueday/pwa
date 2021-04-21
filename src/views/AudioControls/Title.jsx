import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'

const TITLE_HEIGHT = '2em'
const HALF_HEIGHT = '1em'

const TITLE_HEIGHT_MD = '1.4em'
const HALF_HEIGHT_MD = '0.7em'

const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: colors.darkGray,
    borderRadius: HALF_HEIGHT,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    fontSize: '90%',
    fontWeight: theme.typography.weight.bold,
    overflow: 'hidden',
    paddingLeft: HALF_HEIGHT,
    paddingRight: HALF_HEIGHT,
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '95%',
    '&:hover': {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.only('md')]: {
      borderRadius: HALF_HEIGHT_MD,
      paddingLeft: HALF_HEIGHT_MD,
      paddingRight: HALF_HEIGHT_MD,
    },
  },
  titleFlex: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    height: TITLE_HEIGHT,
    minWidth: 0,
    [theme.breakpoints.only('md')]: {
      height: TITLE_HEIGHT_MD,
    },
  },
}))

const Title = ({ onClick, title }) => {
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
