import React, { useState } from 'react';
import MyCreators from './MyCreators';
import cx from 'classnames';
import TopFive from './TopFive';
import Loading from '../Loading';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { colors } from '../../styling';
import { addScrollStyle } from '../util';
import Expander from './Expander';
import MyChannels from './MyChannels';
import MyPodcasts from './MyPodcasts';

const useStyles = makeStyles((theme) => ({
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
    fontSize: '1rem',
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
    overflowX: 'hidden',
    width: '100%',
    maxHeight: '35%',
  }),
  scrollerChild: {
    minHeight: '100%',
    width: '100%',
  },
  sideNav: {
    backgroundColor: colors.lightGray,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 'max(min(1.6vw, 14px), 12px)',
    height: '100%',
    width: 'min(23%, 17.5em)',
  },
  userGuideBtn: {
    backgroundColor: colors.blue,
    fontSize: '95%',
    whiteSpace: 'nowrap',
    width: '45%',
    color: 'white',
    marginTop: '30%',
    marginBottom: '2%',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
  },
  patreonBtn: {
    width: '100%',
    objectFit: 'cover',
    borderRadius: '5px',
    height: '35px',
    background: 'white',
    marginTop: '5%',
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
  patreonBtn: {
    width: '100%',
    objectFit: 'cover',
    borderRadius: '5px',
    height: '35px',
    background: 'white',
    marginTop: '5%',
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
}));

const FatSideNav = ({ className, home }) => {
  const classes = useStyles({ home });
  const [open, setOpen] = useState(false);

  const handleModalClose = () => {
    setOpen(false);
  };

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
        <div className={classes.scroller}>
          <div className={classes.scrollerChild}>
            <Expander
              className={classes.expander}
              text="CREATOR LEADERBOARD"
              tag="poca"
            >
              <TopFive />
            </Expander>
          </div>
        </div>
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
  );
};

export default FatSideNav;
