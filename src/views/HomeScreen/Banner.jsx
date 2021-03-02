import React from 'react'
import {useDispatch} from 'react-redux'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import {actions} from '../../store'
import useHomeBanner from '../../api/useHomeBanner'

import SideButtons from './SideButtons'

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
  sideButtons: {

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

const Element = ({classes, imageUrl, text, title, onClick}) => (
  <div className={classes.element}>
    <img className={classes.image} src={imageUrl} draggable="false" />
    <div className={classes.textGroup}>
      <div className={classes.title} onClick={onClick}>{title}</div>
      <div className={classes.text} onClick={onClick}>{text}</div>
    </div>
  </div>
)

const Banner = ({primaryColor}) => {
  const {data} = useHomeBanner()

  const numElements = data ? data.length : 0

  const [currentIndex, setCurrentIndex] = React.useState(0)

  const [imageUrl, title, text, rawAccentColor, link] = currentIndex < numElements ? data[currentIndex] : []

  const accentColor = colors[rawAccentColor] ?? rawAccentColor

  const classes = useStyles({accentColor, primaryColor})

  const dispatch = useDispatch()
  const onClick = () => dispatch(actions.pushHistory(link))
  return (
    <div className={classes.homeBanner}>
      { imageUrl && (
          <SideButtons
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            numElements={data.length}
            primaryColor={primaryColor}>
            <Element classes={classes} text={text} title={title} imageUrl={imageUrl} onClick={onClick} />
          </SideButtons>
        )
      }
    </div>
  )
}

export default Banner
