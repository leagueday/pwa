import React from 'react';
import cx from 'classnames';
import { useLocationPathname } from '../store';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  content: {
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
    },
  },
  square: {
    position: 'relative',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      '&:after': {
        content: '""',
        display: 'block',
        paddingBottom: '80%',
      },
    },
  },
}));

const Square = ({ children, className }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('lg'));
  const location = useLocationPathname();
  const creatorPage = location === '/creator';
  const classes = useStyles();

  return (
    <div className={cx(classes.square, className)}>
      <div
        className={classes.content}
        style={{ minHeight: mdUp && !creatorPage && '200px' }}
      >
        {children}
      </div>
    </div>
  );
};

export default Square;
