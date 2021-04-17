import React from 'react'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import { IcoMagnifier } from '../icons'

const useStyles = makeStyles(theme => ({
  entryContainer: {
    backgroundColor: colors.lightGray,
    borderBottomLeftRadius: '1em',
    borderTopLeftRadius: '1em',
    flex: 1,
    height: '2em',
    paddingLeft: '1em',
  },
  magnifierIcon: {
    color: colors.white30,
    height: '1em',
    width: '1em',
  },
  magnifierIconContainer: {
    paddingTop: '0.25em',
    paddingLeft: '0.5em',
    paddingRight: '1em',
  },
  searchLozenge: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
}))

const SearchLozenge = ({className}) => {
  const classes = useStyles()

  return (
    <div className={cx(className, classes.searchLozenge)}>
      <IcoMagnifier classes={{inner: classes.magnifierIcon, outer: classes.magnifierIconContainer}} strokeWidth={3} />
      <div className={classes.entryContainer} />
    </div>
  )
}

export default SearchLozenge
