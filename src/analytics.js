import ReactGA from 'react-ga'

ReactGA.initialize('UA-180940239-4')

export const pageview = pathname => ReactGA.pageview(pathname)

export const timing = (category, metric, duration, label=null) =>
  ReactGA.timing({
    category,
    variable: metric,
    value: duration, // in milliseconds
    label, // optional
  })
