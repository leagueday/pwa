import React from 'react'
import {useSelector} from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import {selectors} from '../../store'
import {colors} from '../../styling'
import {formatSecondsDuration, maybeHmsToSecondsOnly} from '../dateutil'

const useStyles = makeStyles(theme => ({
  childrenContainer: {
    maxWidth: '100%',
  },
  podcastName: ({primaryColor}) => ({
    color: primaryColor,
    fontSize: '3.5vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  titleText: {
    color: theme.palette.text.secondary,
    fontSize: '3.5vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  titleTextContainer: ({halfHeight}) => ({
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    height: '100%',
    justifyContent: 'center',
    minWidth: 0,
    maxWidth: '100%',
    overflow: 'hidden',
    paddingLeft: `calc(${halfHeight} / 4)`,
    paddingRight: `calc(${halfHeight} / 4)`,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  }),
  titleFlex: ({halfHeight, height}) => ({
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    borderRadius: halfHeight,
    display: 'flex',
    flex: 1,
    height,
    justifyContent: 'flex-start',
    minWidth: 0,
    overflow: 'visible',
  }),
}))

const XsTitle = ({ children,
                   className,
                   halfHeight,
                   height,
                   onClick,
                   podcastName,
                   primaryColor,
                   title,
}) => {
  const classes = useStyles({halfHeight, height, primaryColor})

  const itemIndex = useSelector(selectors.getAudioItemIndex)
  const duration = maybeHmsToSecondsOnly(
    useSelector(selectors.getAudioDuration)
  )

  const durationLabel = React.useMemo(
      () => {
        let formattedDuration = formatSecondsDuration(duration)

        if (formattedDuration.startsWith('0:'))
          formattedDuration = formattedDuration.substr(2)

        if (formattedDuration.startsWith('0'))
          formattedDuration = formattedDuration.substr(1)

        return formattedDuration
      },
    [duration]
  )

  return (
    <div className={cx(classes.titleFlex, className)}>
      <div className={classes.childrenContainer}>
        {children}
      </div>
      <div className={classes.titleTextContainer} onClick={onClick}>
        <div className={classes.titleText}>
          {title}
        </div>
        <div className={classes.podcastName}>
          {podcastName}&nbsp;
        </div>
        <div className={classes.titleText}>
          Episode {itemIndex+1} | Run length {durationLabel}&nbsp;
        </div>
      </div>
    </div>
  )
}

export default XsTitle
