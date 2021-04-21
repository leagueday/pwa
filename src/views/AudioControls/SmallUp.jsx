import React from 'react'
import { useSelector } from 'react-redux'
import Color from 'color'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import {
  IcoFastFwdStop,
  IcoForwardStop,
  IcoMinus,
  IcoPlus,
  IcoRewindStop,
} from '../icons'

import { selectors } from '../../store'
import {colors} from '../../styling'
import {makeIconButton} from '../IconButton'
import ToggleImageButton from '../ToggleImageButton'
import Connector from './Connector'
import ProgressBox from './ProgressBox'
import Title from './Title'

const FastFwdStopButton = makeIconButton(IcoFastFwdStop)
const ForwardStopButton = makeIconButton(IcoForwardStop)
const MinusButton = makeIconButton(IcoMinus)
const PlusButton = makeIconButton(IcoPlus)
const RewindStopButton = makeIconButton(IcoRewindStop)

const useStyles = makeStyles(theme => ({
  audioControlsRow: {
    alignItems: 'stretch',
    backgroundColor: colors.brandBlack,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    maxHeight: '6em',
    minHeight: '6em',
    userSelect: 'none',
    width: '100%',
    [theme.breakpoints.only('md')]: {
      maxHeight: '4em',
      minHeight: '4em',
    },
  },
  barsideButton: {
    margin: '0.25em',
  },
  barsideButtonIcon: {
    transform: 'scaleY(0.5)',
  },
  disabledButtonColor: {
    color: colors.white30,
  },
  enabledButtonColor: {
    color: colors.magenta,
  },
  logoButton: {
    marginLeft: '0.5em',
    maxHeight: '100%',
    userSelect: 'none',
  },
  logoButtonCenter: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mainColumn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '75%',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '55%',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '45%',
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: '35%',
    },
  },
  progressBoxFlex: {
    flex: 1,
    marginTop: '0.25em',
  },
  progressRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: '1em',
    paddingRight: '1em',
    [theme.breakpoints.only('md')]: {
      paddingLeft: '2.5em',
      paddingRight: '2.5em',
      paddingTop: 0,
    },
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '0.25em',
    padding: '0.25em 0.25em 0 0.25em',
    [theme.breakpoints.only('md')]: {
      marginLeft: '0.5em',
    },
  },
}))

const SmUpAudioControls = () => {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.only('md'))
  const classes = useStyles()

  const itemTitle = useSelector(selectors.getAudioTitle)
  const [titleHalfHeight, titleHeight] = isMd
    ? ['0.7em', '1.4em']
    : ['1em', '2em']

  const buttonShadowColor = Color(colors.brandBlack).darken(0.5).string()

  return (
    <Connector>
      {({
        forwardButtonOnclick,
        isDisabled,
        isOnMyList,
        isPlaying,
        nextButtonOnclick,
        plusOrMinusOnclick,
        popOnclick,
        replayButtonOnclick,
        titleOnclick,
      }) =>
        ((PlusOrMinusButton, buttonColor) => (
          <div className={classes.audioControlsRow}>
            <div className={classes.logoButtonCenter}>
              <ToggleImageButton
                className={classes.logoButton}
                size={isMd ? '3.5em' : '5em'}
                on={isPlaying}
                onClick={popOnclick}
                onImage="/img/logo_pause.png"
                offImage="/img/logo_play.png"
                shadowColor={buttonShadowColor}
              />
            </div>
            <div className={classes.mainColumn}>
              <div className={classes.titleRow}>
                <PlusOrMinusButton
                  backgroundColor={colors.brandBlack}
                  color={buttonColor}
                  onClick={plusOrMinusOnclick}
                  shadowColor={buttonShadowColor}
                  size={isMd ? '1.5em' : '2em'}
                  strokeWidth="3"
                />
                <Title title={itemTitle} onClick={titleOnclick} />
                <ForwardStopButton
                  color={buttonColor}
                  backgroundColor={colors.brandBlack}
                  size={isMd ? '1.5em' : '2em'}
                  onClick={nextButtonOnclick}
                  shadowColor={buttonShadowColor}
                />
              </div>
              <div className={classes.progressRow}>
                <RewindStopButton
                  className={classes.barsideButton}
                  iconClassName={classes.barsideButtonIcon}
                  color={buttonColor}
                  backgroundColor={colors.brandBlack}
                  size="1.5em"
                  onClick={replayButtonOnclick}
                  shadowColor={buttonShadowColor}
                />
                <div className={classes.progressBoxFlex}>
                  <ProgressBox />
                </div>
                <FastFwdStopButton
                  className={classes.barsideButton}
                  iconClassName={classes.barsideButtonIcon}
                  color={buttonColor}
                  backgroundColor={colors.brandBlack}
                  size="1.5em"
                  onClick={forwardButtonOnclick}
                  shadowColor={buttonShadowColor}
                />
              </div>
            </div>
          </div>
        ))(
          isOnMyList ? MinusButton : PlusButton,
          isDisabled ? colors.darkGray : colors.magenta
        )
      }
    </Connector>
  )
}

export default SmUpAudioControls
