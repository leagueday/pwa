import React from 'react'

const makeGenericIcon = Svg => (classes={}) => (
  <div className={classes.outer}>
    <Svg className={classes.inner} />
  </div>
)

export default makeGenericIcon
