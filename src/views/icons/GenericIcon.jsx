import React from 'react'

const makeGenericIcon = Svg => ({classes, onClick}) => (
  <div className={classes?.outer} onClick={onClick}>
    <Svg className={classes?.inner} />
  </div>
)

export default makeGenericIcon
