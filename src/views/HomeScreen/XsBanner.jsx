import React from 'react'
import {useSwipeable} from 'react-swipeable'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import cx from 'classnames'
import Color from 'color'

import {makeStyles} from '@material-ui/core'

import debounce from '../../api/debounce'
import useHomeBanner from '../../api/useHomeBanner'
import usePrevious from '../../api/usePrevious'
import {actions} from '../../store'
import {colors} from '../../styling'
import {slideTransitionGroup} from '../util'

const useStyles = makeStyles(theme => ({
  slider: {
    overflow: 'hidden',
    position: 'relative',
  },
  xsBanner: {
  }
}))

const useElementStyles = makeStyles(theme => ({
  element: {
    minHeight: '35vw',
  },
  imageContainer: ({imageUrl}) => ({
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  }),
  text: { },
  textGroup: ({accentColor}) => ({
    background: `${Color(accentColor).fade(0.1).darken(0.65).toString()}`,
    bottom: 0,
    fontSize: '60%',
    left: 0,
    right: 0,
    padding: '1vw',
    position: 'absolute',
  }),
  title: ({accentColor}) => ({
    color: accentColor,
    fontWeight: theme.typography.weight.bold,
  }),
}))

const useSlideTransitionGroup = makeStyles(slideTransitionGroup)

const db500 = debounce(500)

//  <img className={classes.image} src={imageUrl} />
const Element = ({accentColor, imageUrl, onClick, text, title}) => {
  const classes = useElementStyles({accentColor, imageUrl})

  return (
    <div className={classes.element}>
      <div className={classes.imageContainer}>
        &nbsp;
      </div>
      <div className={classes.textGroup}>
        <div className={classes.title}>
          {title}
        </div>
        <div className={classes.text}>
          {text}
        </div>
      </div>
    </div>
  )
}

const XsBanner = ({className, primaryColor}) => {
  const classes = useStyles()

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const prevIndex = usePrevious(currentIndex)
  const setCurrentIndexDebounced = db500(setCurrentIndex)

  const {data} = useHomeBanner()
  const numElements = data ? data.length : 0

  const [onRightSwipe, onLeftSwipe] = numElements === 0 ? [
    () => {},
    () => {},
  ] : [
    (
      prevIndex => {
        return () => setCurrentIndexDebounced(prevIndex)
      }
    )(
      currentIndex === 0 ? numElements - 1 : currentIndex - 1
    ),
    (
      nextIndex => () => setCurrentIndexDebounced(nextIndex)
    )(
      (currentIndex + 1) % numElements
    ),
  ]

  const swipeHandlers = useSwipeable({
    onSwiped: eventData => {
      const dir = eventData?.dir

      if (dir === 'Left') {
        onLeftSwipe()
      } else if (dir === 'Right') {
        onRightSwipe()
      }
    },
    preventDefaultTouchmoveEvent: true,
  })

  // slides left when the index is increasing, wraparound notwithstanding
  const isSlidingLeft =
    (currentIndex === 0 && prevIndex === numElements - 1)
    || (currentIndex > prevIndex && (currentIndex !== numElements - 1 || prevIndex !== 0))

  const slideTransition = useSlideTransitionGroup({isSlidingLeft})

  const [imageUrl, title, text, rawAccentColor, link] = currentIndex < numElements ? data[currentIndex] : []

  const onClick = () => dispatch(actions.pushHistory(link))
  const accentColor = colors[rawAccentColor] ?? rawAccentColor

  return (
    <div className={cx(classes.xsBanner, className)}>
      <div className={classes.slider} {...swipeHandlers}>
        <TransitionGroup component={null}>
          <CSSTransition key={`${prevIndex} ${currentIndex}`}
                         classNames={slideTransition}
                         timeout={500}>
            <Element accentColor={accentColor} imageUrl={imageUrl} onClick={onClick} text={text} title={title} />
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  )
}

export default XsBanner
