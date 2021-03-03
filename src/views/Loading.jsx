import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

import {makeNextColor} from './util'

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

const cycleColorsSequence = (
  () => {
    const nextColor = makeNextColor()
    const result = [nextColor()]

    for (let nC = nextColor(); nC !== result[0]; nC = nextColor())
      result.push(nC)

    return result
  }
)()

// x cycles/second
// 1/x s/cycle
// 1000/x ms/cycle
const makeCounter = (cycleRate, state, setState) => {
  let stopped = false
  let intervalId = null

  const max = cycleColorsSequence.length - 1

  intervalId = setInterval(
    () => {
      setState(state === max ? 0 : state + 1)
    },
    1000 / cycleRate
  )

  return () => {
    stopped = true
    if (intervalId) clearInterval(intervalId)
  }
}

const makeColorize = (nextColor, s) => {
  const numColors = cycleColorsSequence.length
  const sa = Array.from(s)

  return iteration => (<>{(() => {
        const spans = []

        let i = iteration

        for (let c of sa) {
          const color = cycleColorsSequence[i]

          spans.push(<span style={{color}}>{c}</span>)

          i = i + 1
          if (i === numColors) i = 0
        }

        return spans
      }
    )()}</>)
}

const Loading = () => {
  const classes = useStyles()

  const [cycle, setCycle] = React.useState(0)
  const stopCounter = makeCounter(5, cycle, setCycle)

  const colorize = React.useCallback(
    makeColorize(makeNextColor(), 'Loading...')
  )

  React.useEffect(() => stopCounter)

  return (
    <div className={classes.loading}>
      <div className={classes.text}>
        {colorize(cycle)}
      </div>
    </div>
  )
}

export default Loading
