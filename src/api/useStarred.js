import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { actions, selectors, thunks } from '../store'
import { IdbKvSet } from './idb'

const idbStore = new IdbKvSet('stars')

const listToLookup = list => {
  const result = {}
  for (let item of list) {
    result[item] = true
  }
  return result
}

const loadStarred = () => idbStore.list().then(listToLookup)

const useStarred = () => {
  const dispatch = useDispatch()

  const add = id => Promise.resolve(dispatch(actions.starPodcast(id))).then(
    () => idbStore.add(id)
  ).catch(
    e => console.error('error during useStarred add', e)
  )

  const remove = id => Promise.resolve(dispatch(actions.unstarPodcast(id))).then(
    () => idbStore.remove(id)
  ).catch(
    e => console.error('error during useStarred remove', e)
  )

  React.useEffect(
    // load into redux on mount
    () => {
      dispatch(thunks.app.initStarred(loadStarred))
    },
    []
  )

  const starred = useSelector(selectors.getStarred)

  const isStar = React.useCallback(
    starred ? podcastId => !!starred[podcastId] : () => false,
    [starred]
  )

  return [isStar, add, remove]
}

export default useStarred
