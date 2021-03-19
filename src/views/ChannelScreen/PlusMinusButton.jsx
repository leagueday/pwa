import React from 'react'
import {useSelector} from 'react-redux'
import Color from 'color'

import * as colors from '../../styling/colors'
import {selectors} from '../../store'
import useMyList from '../../api/useMyList'
import {makeIconButton} from '../IconButton'
import {IcoMinus, IcoPlus} from '../icons'

const MinusButton = makeIconButton(IcoMinus)
const PlusButton = makeIconButton(IcoPlus)

const PlusMinusButton = ({channelTag, className}) => {
  const user = useSelector(selectors.getUser)
  const isAuthenticated = !!user

  const [getIsOnMyList, addToMyList, removeFromMyList] = useMyList(user?.token?.access_token)
  const isOnMyList = getIsOnMyList('channel', channelTag)

  const [onClick, Button] =
    isOnMyList
      ? [
        () => removeFromMyList('channel', channelTag),
        MinusButton
      ] : [
        () => addToMyList('channel', channelTag),
        PlusButton
      ]

  return isAuthenticated ? (
    <Button backgroundColor={colors.brandBlack}
            className={className}
            color={colors.magenta}
            onClick={onClick}
            shadowColor={Color(colors.magenta).darken(0.75).string()}
            size="1em"
    />
  ) : null
}

export default PlusMinusButton
