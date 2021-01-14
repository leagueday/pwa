// provide a smidge of durability

import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {constants as storeConstants, selectors, thunks} from '../store'

import * as constants from './consts'
import { IdbKvMap } from './idb'

const idbStore = new IdbKvMap('chronicle')

const getLatestListen = async () => idbStore.get(constants.CHRONICLE_LATEST_LISTEN_ID)

const useChronicle = () => {
  const dispatch = useDispatch()

  React.useEffect(
    // on mount, check if the "latest listen" might be useful wrt current redux
    // i.e. if no audio is already selected, then autoload..
    () => {
      dispatch(thunks.audio.maybeUseLatestListen(getLatestListen))
    },
    []
  )

}

export default useChronicle
