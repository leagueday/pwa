import React from 'react'
import {useSelector} from 'react-redux'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import {selectors} from '../../store'
import useMyList from '../../api/useMyList'

const useStyles = makeStyles(theme => ({
  plusMinusButton: {
    "&:hover": {
      backgroundColor: theme.palette.primary.active,
    },
  }
}))

const PlusMinusButton = ({channelTag, channelTitle, className}) => {
  const classes = useStyles()

  const user = useSelector(selectors.getUser)
  const isAuthenticated = !!user

  const [getIsOnMyList, addToMyList, removeFromMyList] = useMyList(user?.token?.access_token)
  const isOnMyList = getIsOnMyList('channel', channelTag)

  const [onClick, text] =
    isOnMyList
      ? [
        () => removeFromMyList('channel', channelTag),
        `Remove ${channelTitle} from My Channels`
      ] : [
        () => addToMyList('channel', channelTag),
        `Add ${channelTitle} to My Channels`
      ]

  return (
    <Button
      className={cx(classes.plusMinusButton, className)}
      color="primary"
      onClick={onClick}
      size="small"
      variant="contained"
    >
      {text}
    </Button>
  )
}

export default PlusMinusButton
