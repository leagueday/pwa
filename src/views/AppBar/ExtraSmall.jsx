import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import BrandGradientHorizontalStripe from '../BrandGradientHorizontalStripe';
import { makeStyles } from '@mui/styles';
import { actions, selectors } from '../../store';
import { colors } from '../../styling';
import MenuNav from '../SideNav/MenuNav';
import { makeIconButton } from '../IconButton';

import { IcoMenu } from '../icons';

const MenuButton = makeIconButton(IcoMenu);

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    top: 0,
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: '2vw',
  },
  logo: {
    display: 'block',
    height: 'auto',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  logoContainer: {
    width: '8vw',
  },
  menuButtonContainer: {
    marginLeft: 'auto',
  },
  title: {
    padding: '0 2vw',
    cursor: 'pointer',
  },
}));

//
const XsAppBar = ({ className, home }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorRef, setAnchorRef] = React.useState();
  const navButtonRef = React.useRef();
  const isMenuNavVisible = true === useSelector(selectors.getNavVisibility);
  const hideMenuNav = () => dispatch(actions.hideNav());
  const showMenuNav = () => dispatch(actions.showNav());

  const toggleMenuNavVisibility = () => {
    if (isMenuNavVisible) {
      hideMenuNav();
    } else {
      setAnchorRef(navButtonRef.current);
      showMenuNav();
    }
  };

  const maybeGoHome = () => dispatch(actions.pushHistory('/'));

  return (
    <>
      <div className={cx(classes.appBar, className)}>
        <div className={classes.logoContainer} onClick={maybeGoHome}>
          <img
            className={classes.logo}
            src="/img/logo_square_transparent.png"
          />
        </div>
        <div className={classes.title} onClick={maybeGoHome}>
          LeagueDay
        </div>
        <div className={classes.menuButtonContainer}>
          <span ref={navButtonRef}>
            <MenuButton
              className={classes.menuButton}
              strokeWidth={3}
              onClick={toggleMenuNavVisibility}
            />
          </span>
          <MenuNav
            anchor={anchorRef}
            isVisible={isMenuNavVisible}
            hide={hideMenuNav}
            home={home}
          />
        </div>
      </div>
    </>
  );
};

export default XsAppBar;
