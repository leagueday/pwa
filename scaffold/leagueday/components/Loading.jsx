import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { cycleColorSequence } from 'components/util'

const useStyles = makeStyles(theme => ({
  loading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontFamily: theme.typography.family.primary,
  },
}))

// x cycles/second
// 1/x s/cycle
// 1000/x ms/cycle
const makeCounter = (cycleRate, state, setState) => {
  let stopped = false
  let intervalId = null

  const max = cycleColorSequence.length - 1

  intervalId = setInterval(() => {
    setState(state === max ? 0 : state + 1)
  }, 1000 / cycleRate)

  return () => {
    stopped = true
    if (intervalId) clearInterval(intervalId)
  }
}

const makeColorize = s => {
  const numColors = cycleColorSequence.length
  const sa = Array.from(s)

  return iteration => (
    <>
      {(() => {
        const spans = []

        let i = iteration

        for (let j = 0; j < sa.length; j++) {
          const color = cycleColorSequence[i]

          spans.push(
            <span key={j} style={{ color }}>
              {sa[j]}
            </span>
          )

          i = i + 1
          if (i === numColors) i = 0
        }

        return spans
      })()}
    </>
  )
}

const Loading = () => {
  const classes = useStyles()

  const [cycle, setCycle] = React.useState(0)

  // tbd stop calling this fn on each render
  // note to self: grow a brain
  const stopCounter = makeCounter(5, cycle, setCycle)

  const colorize = React.useCallback(makeColorize('Loading...'))

  React.useEffect(() => stopCounter)

  return (
    <div className={classes.loading}>
      <div className={classes.text}>{colorize(cycle)}</div>
    </div>
  )
}

export default Loading
