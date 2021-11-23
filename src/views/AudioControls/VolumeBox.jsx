import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import Color from 'color';

import { makeStyles } from '@mui/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

import { actions, selectors } from '../../store';
import { colors } from '../../styling';

const useStyles = makeStyles((theme) => ({
  VolumeBox: {
    minWidth: '8vw',
    paddingLeft: '0.33em',
    paddingRight: '0.33em',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  sliderColor: {
    color: colors.blue,
  },
  sliderThumbColor: {
    backgroundColor: colors.violet,
  },
  volumeLabel: {
    display: 'none',
    fontFamily: theme.typography.family.secondary,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      width: '100%',
    },
  },
  sliderVolumeTooltip: {
    background: Color(colors.brandBlack).fade(0.4).toString(),
    border: `1px solid ${colors.cyan}`,
    borderRadius: '1em',
    color: colors.cyan,
    fontFamily: theme.typography.family.secondary,
    fontSize: '90%',
    height: '2em',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const TooltipVolume = ({ children, open, value }) => {
  const classes = useStyles();

  const volume = useSelector(selectors.getAudioVolume);

  return (
    <Tooltip
      classes={{ tooltip: classes.sliderVolumeTooltip }}
      open={open}
      enterTouchDelay={0}
      placement="right"
      title={`${volume}/100`}
    >
      {children}
    </Tooltip>
  );
};

const VolumeBox = ({ className, isExpanded }) => {
  const classes = useStyles({ isExpanded });

  const volume = useSelector(selectors.getAudioVolume);
  const dispatch = useDispatch();

  const onChange = (event, value) => {
    dispatch(actions.setAudioVolume(value));
  };

  return (
    <div className={cx(classes.VolumeBox, className)}>
      <label htmlFor="volume" className={classes.volumeLabel}>
        Volume ({volume}/100)
      </label>
      <Slider
        id="volume"
        classes={{
          colorPrimary: classes.sliderColor,
          thumbColorPrimary: classes.sliderThumbColor,
        }}
        value={volume}
        onChange={onChange}
        max={100}
        min={0}
        ValueLabelComponent={TooltipVolume}
      />
    </div>
  );
};

VolumeBox.defaultProps = {
  isExpanded: false,
};

export default VolumeBox;
