import React from 'react';

import { makeStyles } from '@mui/styles';

import PodcastTilesRow from './PodcastTilesRow';

const useStyles = makeStyles((theme) => ({
  facetedPodcastTiles: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const FacetedPodcastTiles = ({ data }) => {
  const classes = useStyles();

  const entries = data ? Array.from(data.entries()) : [];

  let index = -1;

  return (
    <div className={classes.facetedPodcastTiles}>
      {entries.map(([title, podcasts]) => (
        <PodcastTilesRow
          key={index++}
          id={title}
          podcasts={podcasts}
          title={title}
        />
      ))}
    </div>
  );
};

export default FacetedPodcastTiles;
