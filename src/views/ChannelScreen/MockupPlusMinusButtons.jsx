import React from 'react'
import {useSelector} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import * as colors from '../../styling/colors'
import {selectors} from '../../store'
import useMyList from '../../api/useMyList'

const useStyles = makeStyles(theme => ({
  mockupPlusMinusButtons: {
    alignItems: 'flex-start',
    backgroundColor: colors.violet,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  note: {
    color: colors.white80,
    fontSize: '80%',
    fontStyle: 'oblique',
    fontWeight: theme.typography.weight.normal,
  }
}))

const MockupPlusMinusButtons = ({channelTitle, channelTag}) => {
  const classes = useStyles()

  const user = useSelector(selectors.getUser)
  const isAuthenticated = !!user

  const [getIsOnMyList, addToMyList, removeFromMyList] = useMyList(user?.token?.access_token)
  const isOnMyList = getIsOnMyList('channel', channelTag)

  const [onClick, text] =
    isOnMyList
      ? [
        () => removeFromMyList('channel', channelTag),
        `Remove ${channelTitle} from MyChannels`
      ] : [
        () => addToMyList('channel', channelTag),
        `Add ${channelTitle} to MyChannels`
      ]

  return isAuthenticated ? (
    <div className={classes.mockupPlusMinusButtons}>
      <div className={classes.mockupPlusMinusButtons}>
        <div className={classes.note}>
          Note that this button is just a stand-in to demonstrate functionality.
        </div>
        <Button color="primary" onClick={onClick} variant="contained">
          {text}
        </Button>
      </div>
    </div>
  ) : null
}

export default MockupPlusMinusButtons
