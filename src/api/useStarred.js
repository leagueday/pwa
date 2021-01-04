import React from 'react'
import { useDispatch } from 'react-redux'

import * as actions from '../store/actions'
import { IdbKvSet } from './idb'

const idbStore = new IdbKvSet('stars')

const listToLookup = list => {
  const result = {}
  for (let item of list) {
    result[item] = true
  }
  return result
}

// this would be more conventionally done with redux-thunk, tbd..

const useStarred = () => {
  const dispatch = useDispatch()

  React.useEffect(
    // load into redux on mount, this will happen duplicate times,
    // acting as a kind of (superfluous) refresh for now
    () => {
      idbStore.list().then(
        listToLookup
      ).then(
        starred => dispatch(actions.setStarred(starred))
      ).catch(
        e => {
          console.error('error in useStarred load-on-mount', e)
        }
      )
    },
    []
  )

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

  return [add, remove]
}

export default useStarred
