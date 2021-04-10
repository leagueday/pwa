import React from 'react'
import {useSelector} from 'react-redux'

import {selectors} from '../../store'
import ExtraSmallCondensed from './ExtraSmallCondensed'
import ExtraSmallExpanded from './ExtraSmallExpanded'

const ExtraSmall = props => {
  const audioControlsIsExpanded = useSelector(selectors.getAudioControlsExpanded)

  return audioControlsIsExpanded ? (
    <ExtraSmallExpanded {...props} />
  ) : (
    <ExtraSmallCondensed {...props} />
  )
}

export default ExtraSmall
