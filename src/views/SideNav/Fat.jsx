import React from 'react'
import MyCreators from './MyCreators'
import cx from 'classnames'
import Loading from '../Loading'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../styling'
import { addScrollStyle } from '../util'
import Expander from './Expander'
import MyChannels from './MyChannels'
import MyPodcasts from './MyPodcasts'

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  controls: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'none',
    justifyContent: 'space-around',
    padding: '0.5vw',
    width: '100%',
  },
  expander: {
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    paddingTop: '0.5em',
    marginBottom: '1rem',
  },
  logo: {
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    marginBottom: '0',
  },
  logoContainer: {
    position: 'relative',
    flex: 2,
    paddingRight: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logoText: {
    position: 'absolute',
    top: 0,
    right: '5%',
    opacity: 0.8,
    textAlign: 'top',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '150%',
    color: colors.magenta,
  },
  scroller: addScrollStyle(
    colors.blue,
    theme
  )({
    minHeight: 0,
    overflowY: 'auto',
    width: '100%',
  }),
  scrollerChild: {
    minHeight: '100%',
    width: '100%',
  },
  sideNav: {
    backgroundColor: colors.darkerGray,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'max(min(1.6vw, 14px), 12px)',
    height: '100%',
    width: 'min(19%, 15em)',
  },
  signInOutButton: {
    fontSize: '95%',
    whiteSpace: 'nowrap',
    width: '45%',
    position: 'absolute',
    color: 'white',
  },
  signInOutButtonContainer: {
    paddingTop: '0.25vw',
    position: 'relative',
    marginTop: '25px',
    marginBottom: '25px',
    width: '100%',
  },
  signInOut: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inNOutButton: {
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    marginLeft: '5%',
    color: '#ffffff',
    width: '45%',
    paddingBottom: '0.25vw',
    text: ({ skinny }) => ({
      flex: 1,
      fontSize: skinny ? '60%' : null,
      fontWeight: theme.typography.weight.bold,
      marginLeft: '0.25em',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    }),
  },
}))

const FatSideNav = ({ className, home }) => {
  const classes = useStyles({ home })

  return (
    <div className={cx(classes.sideNav, className)}>
      <React.Suspense fallback={<Loading />}>
        <div className={classes.controls}>
        </div>
        <div className={classes.scroller}>
          <div className={classes.scrollerChild}>
            <Expander
              className={classes.expander}
              text="MY CHANNELS"
              tag="chan"
            >
              <MyChannels />
            </Expander>
              <Expander
              className={classes.expander}
              text="MY CREATORS"
              tag="poca"
              >
              <MyCreators />
              </Expander>
            <MyPodcasts />
          </div>
        </div>
      </React.Suspense>
    </div>
  )
}

export default FatSideNav
