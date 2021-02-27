import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  aggregatorContent: { },
})

const AggregatorContent = ({channel}) => {
  const classes = useStyles()

  return (
    <div className={classes.aggregatorContent}>
      aggregator content
    </div>
  )
}

export default AggregatorContent
