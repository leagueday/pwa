import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MobileNav from '../MobileNav';
import { makeStyles } from '@mui/styles';
import { isPlatform, getPlatforms } from '@ionic/react';
import { actions, selectors } from '../../store';
import { colors } from '../../styling';
import AppBar from '../AppBar';
import AudioControls from '../AudioControls';
import BrandGradientHorizontalStripe from '../BrandGradientHorizontalStripe';

const useStyles = makeStyles((theme) => ({
  appBar: {
    flex: 2,
  },
  audioControls: {
    flex: 16,
  },
  basicLayoutCol: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  basicLayoutRow: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    minHeight: 0,
  },
  brandStripe: {
    flex: 1,
  },
  contentFrame: {
    backgroundColor: colors.darkGray,
    display: 'flex',
    flex: 75,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: '100%',
    justifyContent: 'flex-start',
    overflowY: 'hidden',
    width: '100%',
  },
  sideNav: {},
}));

const XsBasicLayout = (props) => {
  const platform = isPlatform('hybrid');
  const classes = useStyles();

  const audioItemUrl = useSelector(selectors.getAudioUrl);
  const isAudioDisplayed = !!audioItemUrl;

  const navVisibility = useSelector(selectors.getNavVisibility);

  return (
    <div className={classes.basicLayoutCol}>
      {!platform && (
        <AppBar
          className={classes.appBar}
          home={props.home}
          platform={platform}
        />
      )}
      <BrandGradientHorizontalStripe className={classes.brandStripe} />
      <div className={classes.contentFrame}>{props.children}</div>
      {isAudioDisplayed && (
        <>
          <BrandGradientHorizontalStripe className={classes.brandStripe} />
          <AudioControls
            className={classes.audioControls}
            primaryColor={colors.magenta}
          />
        </>
      )}
      {platform && <MobileNav />}
    </div>
  );
};

export default XsBasicLayout;
