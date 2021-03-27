import React from 'react'
import {useDispatch} from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Color from 'color'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import {actions} from '../../store'
import debounce from '../../api/debounce'
import useHomeBanner from '../../api/useHomeBanner'
import usePrevious from '../../api/usePrevious'

import SideButtons from '../SideButtons'

const useStyles = makeStyles(theme => ({
  banner: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: '25%',
      overflow: 'hidden',
    },
  },
  element: {
    cursor: 'pointer',
    height: '100%',
    overflow: 'clip',
    position: 'relative',
    width: '100%',
  },
  image: {
    display: 'block',
    width: '100%',
  },
  imageContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  text: {
    fontSize: '90%',
    fontWeight: theme.typography.weight.bold,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
    color: accentColor,
    fontWeight: theme.typography.weight.bold,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
    transition: 'transform 500ms ease-in-out',
    width: '100%',
  },
  enterDone: {
  },
  exit: {
    overflow: 'hidden',
    transform: 'translateX(0%)',
  },
  exitActive: ({isSlidingLeft}) => isSlidingLeft ? {
    overflow: 'hidden',
    transform: 'translateX(-100%)',
    transition: 'transform 500ms ease-in-out',
  } : {
    overflow: 'hidden',
    transform: 'translateX(100%)',
    transition: 'transform 500ms ease-in-out',
  },
  exitDone: {
  }
})

const Element = ({classes, imageUrl, text, title, onClick}) => (
  <div className={classes.element} onClick={onClick}>
    <div className={classes.imageContainer}>
      <img className={classes.image} src={imageUrl} draggable="false" />
    </div>
    <div className={classes.textGroup}>
      <div className={classes.title}>{title}</div>
      <div className={classes.text} onClick={onClick}>{text}</div>
    </div>
  </div>
)

const db500 = debounce(500)

const SmUpBanner = ({className, primaryColor}) => {
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
    || (currentIndex > prevIndex && (currentIndex !== numElements - 1 || prevIndex !== 0))

  const slideTransition = useSlideTransitionGroup({isSlidingLeft})

  const dispatch = useDispatch()
  const onClick = () => dispatch(actions.pushHistory(link))

  const setCurrentIndexDebounced = db500(setCurrentIndex)

  const [onLeftClick, onRightClick] = numElements === 0 ? [
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

  return (
    <div className={cx(classes.banner, className)}>
      stuff
      {
        imageUrl && (
          <SideButtons
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndexDebounced}
            numElements={data.length}
            onLeftClick={onLeftClick}
            onRightClick={onRightClick}
            primaryColor={accentColor}>
              <TransitionGroup component={null}>
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

export default SmUpBanner
