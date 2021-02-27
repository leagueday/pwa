import React from 'react'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import useHomeBanner from '../../api/useHomeBanner'

import DotNavigator from './DotNavigator'

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
    color: accentColor,
    fontWeight: theme.typography.weight.bold,
  }),
}))

const Element = ({classes, imageUrl, text, title}) => (
  <div className={classes.element}>
    <img className={classes.image} src={imageUrl} />
    <div className={classes.textGroup}>
      <div className={classes.title}>{title}</div>
      <div className={classes.text}>{text}</div>
    </div>
  </div>
)

const Banner = ({primaryColor}) => {
  const {data} = useHomeBanner()

  const numElements = data ? data.length : 0

  const [currentIndex, setCurrentIndex] = React.useState(0)

  const [imageUrl, title, text, rawAccentColor] = currentIndex < numElements ? data[currentIndex] : []

  const accentColor = colors[rawAccentColor] ?? rawAccentColor

  const classes = useStyles({accentColor, primaryColor})

  return (
    <div className={classes.homeBanner}>
      { imageUrl && (
          <>
            <Element classes={classes} text={text} title={title} imageUrl={imageUrl}/>
            <DotNavigator
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              numElements={data.length}
              primaryColor={primaryColor}
            />
          </>
        )
      }
    </div>
  )
}

export default Banner
