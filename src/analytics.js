import ReactGA from 'react-ga'

const logTiming = NODE_ENV === 'development'

ReactGA.initialize('UA-180940239-4')

export const pageview = pathname => ReactGA.pageview(pathname)

export const timing = (category, metric, duration, label = null) => {
  if (logTiming) {
    console.log(`timing ${category}.${metric} ${duration}ms`, label ?? '')
  }

  ReactGA.timing({
    category,
    variable: metric,
    value: duration, // in milliseconds
    label, // optional
  })
}
