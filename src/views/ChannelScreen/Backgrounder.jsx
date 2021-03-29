import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  backgrounder: {
    userSelect: 'none',
  },
  clicker: ({color}) => ({
    color,
    cursor: 'pointer',
    paddingLeft: '0.5em',
    [theme.breakpoints.only('xs')]: {
      paddingLeft: '2vw',
    },
  }),
}))

const Backgrounder = ({className, text, textMore, color}) => {
  const classes = useStyles({color})

  const [isExpanded, setIsExpanded] = React.useState(false)

  const onClick = isExpanded ? () => setIsExpanded(false) : () => setIsExpanded(true)

  return (
    <div className={cx(classes.backgrounder, className)}>
      <div className={classes.text}>
        <span>{text}</span>
        {
          isExpanded ? (
            <>
              <span>{textMore}</span>
              <span className={classes.clicker} onClick={onClick}>less</span>
            </>
          ) : (
            <span className={classes.clicker} onClick={onClick}>more...</span>
          )
        }
      </div>
    </div>
  )
}

export default Backgrounder
