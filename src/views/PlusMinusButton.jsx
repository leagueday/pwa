import React from 'react'
import {useSelector} from 'react-redux'
import Color from 'color'

import * as colors from '../styling/colors'
import {selectors} from '../store'
import useMyList from '../api/useMyList'
import {makeIconButton} from './IconButton'
import {IcoMinus, IcoPlus} from './icons'

const MinusButton = makeIconButton(IcoMinus)
const PlusButton = makeIconButton(IcoPlus)

const stopEventPropagation = handler => event => {
  handler(event)
  event.stopPropagation()
}

const PlusMinusButton = ({className, size, subjectId, subjectKind}) => {
  const user = useSelector(selectors.getUser)
  const isAuthenticated = !!user

  const [getIsOnMyList, addToMyList, removeFromMyList] = useMyList(user?.token?.access_token)
  const isOnMyList = getIsOnMyList(subjectKind, subjectId)

  const [onClick, Button] =
    isOnMyList
      ? [
        () => removeFromMyList(subjectKind, subjectId),
        MinusButton
      ] : [
        () => addToMyList(subjectKind, subjectId),
        PlusButton
      ]

  const handler = stopEventPropagation(onClick)

  return isAuthenticated ? (
    <Button backgroundColor={colors.brandBlack}
            className={className}
            color={colors.magenta}
            onClick={handler}
            shadowColor={Color(colors.magenta).darken(0.75).string()}
            size={size ?? '1em'}
            strokeWidth="3"
    />
  ) : null
}

export default PlusMinusButton
