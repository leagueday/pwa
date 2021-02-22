import React from 'react'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../styling/colors'
import useHomeBanner from '../api/useHomeBanner'

import IcoDot from './icons/IcoDot'

const useStyles = makeStyles(theme => ({
  bannerImageGroup: ({imageUrl}) => ({
    alignItems: 'flex-start',
    background: `url(${imageUrl})`,
    display: 'flex',
    flexDirection: 'column',
    height: '360px',
    justifyContent: 'flex-end',
    width: '1108px',
  }),
  bannerImageText: {
    fontSize: '90%',
  },
  bannerImageTextGroup: ({accentColor}) => ({
    alignItems: 'flex-start',
    background: `${Color(accentColor).fade(0.1).darken(0.65).toString()}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: '0.5em',
    paddingLeft: '0.33em',
    paddingTop: '0.5em',
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
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '0.5em',
  },
  dotOuter: {
    cursor: 'pointer',
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
}))

const HomeBannerElement = ({classes, text, title}) => (
  <div className={classes.bannerImageGroup}>
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
              console.log(i, currentIndex, isSelected)

              dots.push(
                <IcoDot
                  classes={isSelected ? {
                      inner: classes.dotInnerSelected,
                      outer: classes.dotOuterSelected,
                    } : {
                      inner: classes.dotInner,
                      outer: classes.dotOuter,
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

  const classes = useStyles({accentColor, imageUrl, primaryColor})

  return (
    <div className={classes.homeBanner}>
      { imageUrl && (
          <>
            <HomeBannerElement classes={classes} text={text} title={title} />
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
