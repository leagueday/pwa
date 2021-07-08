import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import Color from 'color'
import { MyListContext } from '../store/listState'
import { selectors } from '../store'
import { colors } from '../styling'
import { makeIconButton } from './IconButton'
import { IcoMinus, IcoPlus } from './icons'

const MinusButton = makeIconButton(IcoMinus)
const PlusButton = makeIconButton(IcoPlus)

const stopEventPropagation = handler => event => {
  handler(event)
  event.stopPropagation()
}

const PlusMinusButton = ({
  className,
  size,
  subjectId: channelTag,
  subjectKind,
  channel,
}) => {
  const user = useSelector(selectors.getUser)
  const isAuthenticated = !!user
  const [
    listPlaceholder,
    setListPlaceholder,
    globalList,
    getIsOnMyList,
    addToList,
    removeFromList,
    setGlobalList,
  ] = useContext(MyListContext)

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
      backgroundColor={colors.brandBlack}
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
