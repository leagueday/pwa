import React from 'react'
import {useDispatch} from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import {actions} from '../../store'
import useHomeBanner from '../../api/useHomeBanner'

import SideButtons from './SideButtons'

const usePrevious = value => {
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const useStyles = makeStyles(theme => ({
  element: {
    height: '20em',
    overflow: 'hidden',
    position: 'relative',
    right: 0,
  },
  homeBanner: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
  image: {
    width: '100%',
    minHeight: '100%',
  },
  text: {
    cursor: 'pointer',
    fontSize: '90%',
    fontWeight: theme.typography.weight.bold,
  },
  textGroup: ({accentColor}) => ({
    alignItems: 'flex-start',
    background: `${Color(accentColor).fade(0.1).darken(0.65).toString()}`,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: '0.5em',
    paddingLeft: '0.33em',
    paddingTop: '0.5em',
    position: 'absolute',
    userSelect: 'none',
    width: '100%',
  }),
  title: ({accentColor}) => ({
    cursor: 'pointer',
    color: accentColor,
    fontWeight: theme.typography.weight.bold,
  }),
}))

const useSlideTransitionGroup = makeStyles({
  enter: ({isSlidingLeft}) => isSlidingLeft ? {
    position: 'absolute',
    overflow: 'hidden',
    transform: 'translateX(100%)',
  } : {
    position: 'absolute',
    overflow: 'hidden',
    transform: 'translateX(-100%)',
  },
  enterActive: ({isSlidingLeft}) => isSlidingLeft ? {
    position: 'absolute',
    overflow: 'hidden',
    transform: 'translateX(0%)',
    transition: 'transform 500ms ease-in-out',
    width: '100%',
  } : {
    position: 'absolute',
    overflow: 'hidden',
    transform: 'translateX(0%)',
    transition: 'transform 500ms ease-in-out'
  },
  enterDone: {
  },
  exit: {
    overflow: 'hidden',
    transform: 'translateX(0%)'
  },
  exitActive: ({isSlidingLeft}) => isSlidingLeft ? {
    overflow: 'hidden',
    transform: 'translateX(-100%)',
    transition: 'transform 500ms ease-in-out'
  } : {
    overflow: 'hidden',
    transform: 'translateX(100%)',
    transition: 'transform 500ms ease-in-out'
  },
  exitDone: {
  }
})

const Element = ({classes, imageUrl, text, title, onClick}) => (
  <div className={classes.element}>
    <img className={classes.image} src={imageUrl} draggable="false" />
    <div className={classes.textGroup}>
      <div className={classes.title} onClick={onClick}>{title}</div>
      <div className={classes.text} onClick={onClick}>{text}</div>
    </div>
  </div>
)

const debounce = minIntervalMs => {
  let wait = false

  return f => (...args) => {
      if (wait) return

      wait = true
      setTimeout(
        () => { wait = false },
        minIntervalMs
      )

      f(...args)
    }
  }

const db500 = debounce(500)

const Banner = ({primaryColor}) => {
  const {data} = useHomeBanner()

  const numElements = data ? data.length : 0

  const [currentIndex, setCurrentIndex] = React.useState(0)

  const prevIndex = usePrevious(currentIndex)

  const [imageUrl, title, text, rawAccentColor, link] = currentIndex < numElements ? data[currentIndex] : []

  const accentColor = colors[rawAccentColor] ?? rawAccentColor

  const classes = useStyles({accentColor, primaryColor})

  // slides left when the index is increasing, wraparound notwithstanding
  const isSlidingLeft =
    (currentIndex === 0 && prevIndex === numElements - 1)
    // (currentIndex === numElements - 1 && prevIndex === 0)
    || (currentIndex > prevIndex && (currentIndex !== numElements - 1 || prevIndex !== 0))

  const slideTransition = useSlideTransitionGroup({isSlidingLeft})

  const dispatch = useDispatch()
  const onClick = () => dispatch(actions.pushHistory(link))
  return (
    <div className={classes.homeBanner}>
      { imageUrl && (
          <SideButtons
            currentIndex={currentIndex}
            setCurrentIndex={db500(setCurrentIndex)}
            numElements={data.length}
            primaryColor={accentColor}>
              <TransitionGroup>
                <CSSTransition key={`${prevIndex} ${currentIndex}`}
                               classNames={slideTransition}
                               timeout={500}>
                  <Element classes={classes} text={text} title={title} imageUrl={imageUrl} onClick={onClick} />
                </CSSTransition>
              </TransitionGroup>
          </SideButtons>
        )
      }
    </div>
  )
}

export default Banner
