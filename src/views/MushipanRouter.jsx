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

const getViewProps = (descriptor, pathTokens, paramString) => {
  const result = {}

  if (descriptor)
    for (let [propName, strategy] of Object.entries(descriptor)) {
      if (strategy === 'nextPathToken') {
        result[propName] = pathTokens?.[1] ?? null
      }
    }

  return result
}

const MushipanRouter = ({
  routes,
  // useTransitionGroup
}) => {
  const [defaultView, routesMap] = React.useMemo(
    () => {
      let defaultView = null
      const routesMap = {}

      for (let [pathname, view, propsDescriptor] of routes) {
        if (pathname == null) defaultView = view
        else {
          routesMap[pathname] = { propsDescriptor, view }
        }
      }

      return [defaultView, routesMap]
    },
    [routes]
  )

  const pathname = useLocationPathname()
  const [pathTokens, paramString] = parsePathname(pathname)

  const firstPathToken = pathTokens[0]
  // console.log('pathname', pathname, firstPathToken)

  const routeDescriptor = firstPathToken ? routesMap[firstPathToken] : null

  analytics.pageview(pathname)

  const View = routeDescriptor?.view ?? defaultView

  const viewProps = getViewProps(routeDescriptor?.propsDescriptor, pathTokens, paramString)

  // const transitionGroup = useTransitionGroup()
  // <TransitionGroup>
  //   <CSSTransition key={pathname} classNames={transitionGroup} timeout={500}>
  //     <View />
  //   </CSSTransition>
  // </TransitionGroup>
  return (
    <React.Suspense fallback={(<Loading />)}>
      <View {...viewProps} />
    </React.Suspense>
  )
}

export default MushipanRouter
