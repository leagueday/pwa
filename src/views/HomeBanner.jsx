import React from 'react'
import Color from 'color'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import useHomeBanner from '../api/useHomeBanner'

import IcoDot from './icons/IcoDot'

const useStyles = makeStyles(theme => ({
  bannerImageGroup: {
    height: '20em',
    overflow: 'hidden',
    position: 'relative',
    right: 0,
  },
  bannerImageText: {
    fontSize: '90%',
  },
  bannerImageTextGroup: ({accentColor}) => ({
    alignItems: 'flex-start',
    background: `${Color(accentColor).fade(0.1).darken(0.65).toString()}`,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.typography.family.primary,
    justifyContent: 'flex-start',
    paddingBottom: '0.5em',
    paddingLeft: '0.33em',
    paddingTop: '0.5em',
    position: 'absolute',
    userSelect: 'none',
    width: '100%',
  }),
  bannerImageTitle: ({accentColor}) => ({
    color: accentColor,
  }),
  dotInner: {
    color: colors.white80
  },
  dotInnerSelected: ({primaryColor}) => ({
    color: primaryColor,
  }),
  dotNav: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '0.5em',
    paddingTop: '0.5em',
  },
  dotOuter: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dotOuterSelected: {
    cursor: 'default',
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
}))

const HomeBannerElement = ({classes, imageUrl, text, title}) => (
  <div className={classes.bannerImageGroup}>
    <img className={classes.image} src={imageUrl} />
    <div className={classes.bannerImageTextGroup}>
      <div className={classes.bannerImageTitle}>{title}</div>
      <div className={classes.bannerImageText}>{text}</div>
    </div>
  </div>
)

const DotNavigator = ({classes, currentIndex, numElements, setCurrentIndex}) => {
  return (
    <div className={classes.dotNav}>
      {
        (
          () => {
            const dots = []

            for (let i = 0; i < numElements; i++) {
              const isSelected = i === currentIndex

              dots.push(
                <IcoDot
                  key={i}
                  classes={{
                      inner: cx(classes.dotInner, {[classes.dotInnerSelected]: isSelected}),
                      outer: cx(classes.dotOuter, {[classes.dotOuterSelected]: isSelected}),
                    }}
                  onClick={isSelected ? null : () => setCurrentIndex(i)}
                />
              )
            }

            return dots
          }
        )()
      }
    </div>
  )
}

const HomeBanner = ({primaryColor}) => {
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
            <HomeBannerElement classes={classes} text={text} title={title} imageUrl={imageUrl}/>
            <DotNavigator
              classes={classes}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              numElements={data.length}
            />
          </>
        )
      }
    </div>
  )
}

export default HomeBanner
