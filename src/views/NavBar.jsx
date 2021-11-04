import { selectors, actions } from '../store';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import SignInOutButton from './SideNav/SignInOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../styling';
import { Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import { Modal } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useLocationPathname } from '../store';

const useStyles = makeStyles((theme) => ({
  navbar: {
    padding: 0,
    margin: 0,
    position: 'relative',
    height: '7%',
    minHeight: '60px',
    width: '100%',
    background: colors.darkGray,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '-5px 4px 10px -2px black',
  },
  logoContainer: {
    marginLeft: '20px',
    width: '30%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    cursor: 'pointer',
    width: '215px',
    height: '41px',
  },
  logoText: {
    position: 'absolute',
    top: 0,
    left: '6.5%',
    textAlign: 'top',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '150%',
    color: colors.magenta,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'flex-end',
    marginRight: '20px',
  },
  link: {
    cursor: 'pointer',
    position: 'relative',
    borderBottom: `2px solid ${colors.darkerGray}`,
    opacity: 0.8,
    '&:before': {
      content: "''",
      display: 'block',
      width: '100%',
      height: '2px',
      background: `linear-gradient(90deg, ${colors.cyan} 0%, ${colors.magenta} 50%, ${colors.yellow} 100%)`,
      position: 'absolute',
      left: 0,
      zIndex: 100,
      bottom: '-2px',
      transformOrigin: 'left',
      transform: 'scale(0)',
      transition: '0.1s linear',
    },
    '&:hover': {
      opacity: 1,
    },
    '&:hover:before': {
      transform: 'scale(1)',
    },
  },
  selectedLink: {
    marginLeft: '40px',
    borderBottom: `2px solid ${colors.magenta}`,
  },
  profile: {
    marginLeft: '40px',
    borderRadius: '50%',
    height: '50px',
    width: '50px',
    objectFit: 'cover',
    cursor: 'pointer',
    border: `2px solid ${colors.blue}`,
  },
  dropdownCont: {
    position: 'relative',
  },
  dropdown: {
    height: 'auto',
  },
  signInOutButton: {
    fontSize: '95%',
    whiteSpace: 'nowrap',
    width: '45%',
    position: 'absolute',
    color: 'white',
  },
  profileBtn: {
    border: `1px solid ${colors.blue}`,
    borderRadius: '5px',
    transition: '.2s all ease-in-out',
    '&:hover': {
      background: colors.blue,
    },
  },
  inBtn: {
    marginLeft: '40px',
    background: colors.lightGray,
    color: 'white',
    '&:hover': {
      background: colors.lightGray,
      filter: 'brightness(200%)',
    },
  },
  upBtn: {
    marginLeft: '40px',
    background: colors.magenta,
    color: 'white',
    '&:hover': {
      background: colors.magenta,
      filter: 'brightness(150%)',
    },
  },
  userGuideBtn: {
    backgroundColor: colors.blue,
    whiteSpace: 'nowrap',
    width: '85px',
    fontSize: '.8rem',
    color: 'white',
    minWidth: '85px',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  patreonBtn: {
    width: '100%',
    objectFit: 'cover',
    borderRadius: '5px',
    height: '35px',
    background: 'white',
    marginTop: '5%',
    minWidth: '85px',
    marginLeft: '40px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
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
}));

const NavBar = () => {
  const pathname = useLocationPathname();
  const [homeActive, setHomeActive] = useState(pathname === '/');
  const [creatorActive, setCreatorActive] = useState(pathname === '/creators');
  const classes = useStyles();
  const dispatch = useDispatch();
  const goHome = () => dispatch(actions.pushHistory('/'));
  const [profileCreated, setProfileCreated] = useState(false);
  const user = useSelector(selectors.getUser);
  const userProfile = useSelector(selectors.getUserData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const homeClick = () => {
    setHomeActive(true);
    setCreatorActive(false);
  };

  const creatorClick = () => {
    setCreatorActive(true);
    setHomeActive(false);
  };

  useEffect(() => {
    if (userProfile) setProfileCreated(true);
  }, [userProfile]);

  const myprofile = () => {
    dispatch(actions.pushHistory(`/profile/${user.id}`));
  };

  const createProfile = () => dispatch(actions.pushHistory('/create'));

  return (
    <div className={classes.navbar}>
      <div className={classes.logoContainer}>
        <img
          className={classes.logo}
          src="/img/LeagueDayBetaLogo.png"
          onClick={goHome}
        />
      </div>
      <div className={classes.navLinks}>
        <Button className={classes.userGuideBtn} onClick={() => setOpen(true)}>
          user guide
        </Button>
        <a href="https://www.patreon.com/leaguedaygg" target="_blank">
          <img className={classes.patreonBtn} src="/img/patreon.png" alt="" />
        </a>
        <a
          href="
          https://www.kickstarter.com/projects/nickvantzos/leagueday"
          target="_blank"
        >
          <img
            className={classes.patreonBtn}
            src="/img/kickstarterGreen.png"
            alt="kickstarter"
          />
        </a>
        <h4
          className={homeActive ? classes.selectedLink : classes.link}
          onClick={() => {
            goHome();
            homeClick();
          }}
        >
          Discover
        </h4>
        <h4
          className={creatorActive ? classes.selectedLink : classes.link}
          onClick={() => {
            dispatch(actions.pushHistory('/creators'));
            creatorClick();
          }}
        >
          Creators
        </h4>
        {user ? (
          <>
            <img
              className={classes.profile}
              onClick={handleClick}
              src={
                userProfile?.fields?.image
                  ? userProfile?.fields?.image
                  : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues='
              }
              alt=""
            />
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              classes={{ list: classes.dropdown }}
            >
              <div>
                <MenuItem classes={{ root: classes.profileBtn }}>
                  {profileCreated ? (
                    <p onClick={myprofile}>PROFILE</p>
                  ) : (
                    <p onClick={createProfile}>CREATE PROFILE</p>
                  )}
                </MenuItem>
                <MenuItem>
                  <SignInOutButton className={classes.signInOutButton} />
                </MenuItem>
              </div>
            </Menu>
          </>
        ) : (
          <>
            <Button
              className={classes.inBtn}
              onClick={() => dispatch(actions.login())}
              size="medium"
            >
              Log In
            </Button>
            <Button
              className={classes.upBtn}
              onClick={() => dispatch(actions.login())}
              size="medium"
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
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

export default NavBar;
