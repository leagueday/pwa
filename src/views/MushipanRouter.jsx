import React from 'react'

import * as analytics from '../analytics'
import useLocationPathname from '../store/api/useLocationPathname'

import Loading from './Loading'

// MushipanRouter - obtain location from Redux, then pick a view to render

const parsePathname = pathname => {
  if (!pathname) return [[], '']

  let s = pathname
  let p = ''

  s = s[0] === '/' ? s.substring(1) : s

  const questOffset = s.indexOf('?')
  if (questOffset >= 0) {
    p = s.substring(questOffset + 1)
    s = s.substring(0, questOffset)
  }

  return [s.split('/'), p]
}

const matchView = (routes, pathTokens, paramString) => {
  for (let [testRoute, View, getViewProps] of routes) {
    if (testRoute(pathTokens, paramString)) {
      return [View, getViewProps(pathTokens, paramString)]
    }
  }
}

const MushipanRouter = ({
  routes,
}) => {
  const pathname = useLocationPathname()
  const [pathTokens, paramString] = parsePathname(pathname)

  const [View, viewProps] = matchView(routes, pathTokens, paramString)

  React.useEffect(
    () => analytics.pageview(pathname)
  )

  return (
    <React.Suspense fallback={(<Loading />)}>
      <View {...viewProps} />
    </React.Suspense>
  )
}

export default MushipanRouter
