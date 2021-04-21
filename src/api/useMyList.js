import { useDispatch, useSelector } from 'react-redux'

import { actions, selectors } from '../store'
import { makeRequestHeaders } from './util'

const TOGGLE_MYLIST_ENDPOINT = `/.netlify/functions/fauna-toggle-mylist`

const useMyList = bearerToken => {
  const dispatch = useDispatch()
  const myList = useSelector(selectors.getMyList)

  const getIsOnMyList = (kind, id) => {
    if (!myList) return false

    return !!myList.find(
      ({ kind: liKind, id: liId }) => liKind === kind && liId === id
    )
  }

  const isMyListEmpty = !myList || myList.length === 0

  const makeToggle = op => (kind, id) =>
    fetch(
      `${TOGGLE_MYLIST_ENDPOINT}?${new URLSearchParams({ op, id, kind })}`,
      {
        headers: makeRequestHeaders(bearerToken),
      }
    ).then(
      dispatch(
        op === '+'
          ? actions.addToMyList(kind, id)
          : actions.removeFromMyList(kind, id)
      )
    )

  const addToMyList = makeToggle('+')
  const removeFromMyList = makeToggle('-')

  return [getIsOnMyList, addToMyList, removeFromMyList, isMyListEmpty]
}

export default useMyList
