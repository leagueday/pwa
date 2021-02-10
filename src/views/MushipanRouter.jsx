import React from 'react'
import { useSelector } from 'react-redux'

import * as analytics from '../analytics'
import { selectors } from '../store'

// MushipanRouter - obtain location from Redux, then pick a view to render

const useLocationPath = () => {
  const location = useSelector(selectors.getRouterLocation)

  if (!location) {
    return [null, null]
  } else if (location.pathname) {
    return [location.pathname, location.key]
  } else {
    return [location.location?.pathname, location.location?.key]
  }
}

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

  const [pathname] = useLocationPath()
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
  return (<View {...viewProps} />)
}

export default MushipanRouter
