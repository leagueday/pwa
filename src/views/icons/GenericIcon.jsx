import React from 'react'

const makeGenericIcon = Svg => ({classes, onClick, strokeWidth}) => (
  <div className={classes?.outer} onClick={onClick}>
    <Svg className={classes?.inner} strokeWidth={strokeWidth} />
  </div>
)

export default makeGenericIcon
