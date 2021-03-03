import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import * as colors from '../styling/colors'
import {addScrollStyle} from './util'

// Top-Left/Right and Bottom-Scroller

const useStyles = makeStyles({
  bottomSection: ({channelColor}) => addScrollStyle(channelColor)({
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'auto',
    width: '100%',
  }),
  content: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '0.25em',
  },
  topSection: {
    flexShrink: 0,
    width: '100%',
  },
  gridFullCol2: ({channelColor}) => addScrollStyle(channelColor)({
    flexShrink: 1,
    overflow: 'auto',
    width: '100%',
  }),
  topRightGridItem: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

const ContentLayout = ({channelColor, children, renderTopLeft, renderTopRight}) => {
  const classes = useStyles({channelColor})

  return (
    <div className={classes.content}>
      <div className={classes.topSection}>
        <Grid container>
          <Grid item xs={6} sm={4} lg={3}>
            {renderTopLeft()}
          </Grid>
          <Grid className={classes.topRightGridItem} item xs={12} sm={8} lg={9}>
            {renderTopRight()}
          </Grid>
        </Grid>
      </div>
      <div className={classes.bottomSection}>
        {children}
      </div>
    </div>
  )
}

ContentLayout.defaultProps = {
  channelColor: colors.white80,
}

export default ContentLayout
