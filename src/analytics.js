import ReactGA from 'react-ga'

const MODE_GA = 1
const MODE_CONSOLE = 2

const mode = NODE_ENV === 'development' ? MODE_CONSOLE : MODE_GA

ReactGA.initialize('UA-180940239-4')

export const pageview =
  mode === MODE_GA
    ? pathname => ReactGA.pageview(pathname)
    : pathname => console.log(`Page View: ${pathname}`)

export const timing =
  mode === MODE_GA
    ? (category, metric, duration, label=null) =>
        ReactGA.timing({
          category,
          variable: metric,
          value: duration, // in milliseconds
          label, // optional
        })
    : (category, metric, duration, label=null) =>
        console.log(`timing:${category}.${variable} ${value}ms`, label ? `(${label})`: '')
