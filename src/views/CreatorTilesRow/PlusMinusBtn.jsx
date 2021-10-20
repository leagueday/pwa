import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import Color from 'color'
import { MyListContext } from '../../store/stateProviders/listState'
import { selectors } from '../../store'
import { colors } from '../../styling'
import { makeIconButton } from '../IconButton'
import { IcoPlus, IcoMinus } from '../icons'

const stopEventPropagation = handler => event => {
  handler(event)
  event.stopPropagation()
}

const PlusMinusBtn = ({ className, size, userId, creator }) => {
  const user = useSelector(selectors.getUser)
  const isAuthenticated = !!user
  const {
    disabled,
    isOnCreatorsList,
    addToCreatorList,
    removeFromCreatorList,
  } = useContext(MyListContext)

  const MinusButton = makeIconButton(IcoMinus, disabled)
  const PlusButton = makeIconButton(IcoPlus, disabled)

  const isOnMyList = isOnCreatorsList(creator?.username, userId)

  const [onClick, Button] = isOnMyList
    ? [() => removeFromCreatorList(userId), MinusButton]
    : [
        () => addToCreatorList(creator?.username, userId, creator?.image),
        PlusButton,
      ]

  const handler = stopEventPropagation(onClick)

  return isAuthenticated ? (
    <Button
      backgroundColor={'transparent'}
      className={className}
      color={'white'}
      onClick={handler}
      size={size ?? '1em'}
      strokeWidth="3"
    />
  ) : null
}

export default PlusMinusBtn
