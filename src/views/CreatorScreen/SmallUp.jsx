import React from 'react';
import { makeStyles } from '@mui/styles';
import useAirtable from '../../api/useAirtable';
import CreatorTile from '../CreatorTilesRow/CreatorTile';
import BasicLayout from '../BasicLayout';
import { colors } from '../../styling';
const useStyles = makeStyles((theme) => ({
  creatorWrapper: {
    position: 'relative',
    minHeight: '25vh',
    overflowX: 'hidden',
    [theme.breakpoints.down('sm')]: {
      overflow: 'scroll',
    },
  },
  creator: {
    textAlign: 'center',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  line: {
    width: '38%',
    borderBottom: `0.2em solid ${colors.white80}`,
  },
  creatorContainer: {
    margin: 5,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      background: 'inherit',
    },
  },
}));

const SmallUp = () => {
  const classes = useStyles();
  const { data } = useAirtable('appXoertP1WJjd4TQ', 'UserProfile');

  return (
    <BasicLayout home>
      <div className={classes.creatorWrapper}>
        <div className={classes.headerContainer}>
          <span className={classes.line}></span>
          <h2 className={classes.creator}>LeagueDay Creators</h2>
          <span className={classes.line}></span>
        </div>
        <div className={classes.creatorContainer}>
          {data?.map((user, key) => {
            const { fields } = user;
            return <CreatorTile user={fields} />;
          })}
        </div>
      </div>
    </BasicLayout>
  );
};

export default SmallUp;
