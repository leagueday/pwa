import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useSwipeable} from 'react-swipeable'

import {actions, selectors} from '../../store'

const useStyles = makeStyles({
  xsSmallExpandedAudioControls: {

  },
})

const ExtraSmallExpanded = () => {
  const dispatch = useDispatch()

  const swipeHandlers = useSwipeable({
    onSwiped: eventData => {
      const dir = eventData?.dir

      if (dir === 'Down') {
        dispatch(actions.condenseAudioControls())
      }
    },
  })

  return (<div className={classes.xsSmallExpandedAudioControls} {...swipeHandlers}>extra small expanded</div>)
}

export default ExtraSmallExpanded
