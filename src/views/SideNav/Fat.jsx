import React, { useState } from 'react'
import MyCreators from './MyCreators'
import cx from 'classnames'
import Loading from '../Loading'
import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
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
    maxHeight: '35%',
  }),
  scrollerChild: {
    minHeight: '100%',
    width: '100%',
  },
  sideNav: {
    backgroundColor: colors.darkerGray,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 'max(min(1.6vw, 14px), 12px)',
    height: '100%',
    width: 'min(19%, 15em)',
  },
  userGuideBtn: {
    backgroundColor: colors.blue,
    fontSize: '95%',
    whiteSpace: 'nowrap',
    width: '45%',
    color: 'white',
    marginTop: '40%',
    marginBottom: '10%',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
  },
  modalWrapper: {
    position: 'absolute',
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.darkGray,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: 'white',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    borderRadius: '5px',
    height: 250,
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
  patreonBtn: {
    width: '100%',
    objectFit: 'contain',
  },
}))

const FatSideNav = ({ className, home }) => {
  const classes = useStyles({ home })
  const [open, setOpen] = useState(false)

  const handleModalClose = () => {
    setOpen(false)
  }

  return (
    <div className={cx(classes.sideNav, className)}>
      <React.Suspense fallback={<Loading />}>
        <div className={classes.controls}></div>
        <div className={classes.scroller}>
          <div className={classes.scrollerChild}>
            <Expander
              className={classes.expander}
              text="MY CHANNELS"
              tag="chan"
            >
              <MyChannels />
            </Expander>
          </div>
        </div>
        <div className={classes.scroller}>
          <div className={classes.scrollerChild}>
            <Expander
              className={classes.expander}
              text="MY CREATORS"
              tag="poca"
            >
              <MyCreators />
            </Expander>
          </div>
        </div>
        <Button className={classes.userGuideBtn} onClick={() => setOpen(true)}>
          user guide
        </Button>
        <a
          style={{ width: '45%' }}
          href="https://www.patreon.com/leaguedaygg"
          target="_blank"
        >
          <img className={classes.patreonBtn} src="/img/patreon.png" alt="" />
        </a>
        <MyPodcasts />
      </React.Suspense>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalWrapper}>
          <img src="/img/userGuide.png" alt="" />
        </div>
      </Modal>
    </div>
  )
}

export default FatSideNav
