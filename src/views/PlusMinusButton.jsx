import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import Color from 'color'
import { MyListContext } from '../store/stateProviders/listState'
import { selectors } from '../store'
import { colors } from '../styling'
import { makeIconButton } from './IconButton'
import { IcoMinus, IcoPlus } from './icons'

const stopEventPropagation = handler => event => {
  handler(event)
  event.stopPropagation()
}

const PlusMinusButton = ({
  className,
  size,
  subjectId: channelTag,
  channel,
}) => {
  const user = useSelector(selectors.getUser)
  const isAuthenticated = !!user
  const {
    disabled,
    getIsOnMyList,
    addToList,
    removeFromList,
  } = useContext(MyListContext)

  const MinusButton = makeIconButton(IcoMinus, disabled)
  const PlusButton = makeIconButton(IcoPlus, disabled)

  const isOnMyList = getIsOnMyList(channel?.title, channelTag)

  const [onClick, Button] = isOnMyList
    ? [() => removeFromList(channelTag), MinusButton]
    : [
        () => addToList(channel?.title, channelTag, channel?.imageUrl),
        PlusButton,
      ]

  const handler = stopEventPropagation(onClick)

  return isAuthenticated ? (
    <Button
      backgroundColor={'transparent'}
      className={className}
      color={'white'}
      onClick={handler}
      size={'25px'}
      strokeWidth="3"
    />
  ) : null
}

export default PlusMinusButton
