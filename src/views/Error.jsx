import React from 'react';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.warning.main,
  },
}));

const Error = ({ e }) => {
  const classes = useStyles();

  return <div className={classes.error}>{String(e)}</div>;
};

export default Error;
