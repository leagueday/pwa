import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import * as colors from '../styling/colors'
import {addScrollStyle} from './util'

// Top-Left/Right and Bottom-Scroller

const useStyles = makeStyles({
  bottomSection: ({accentColor}) => addScrollStyle(accentColor)({
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'auto',
    paddingRight: '0.25em',
    width: '100%',
  }),
  content: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: '0.25em',
  },
  topSection: {
    flexShrink: 0,
    width: '100%',
  },
  topRightGridItem: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

const ContentLayout = ({accentColor, children, renderTop, renderTopLeft, renderTopRight}) => {
  const classes = useStyles({accentColor})

  return (
    <div className={classes.content}>
      <div className={classes.topSection}>
        {
          renderTop ? renderTop() : (
            <Grid container>
              <Grid item xs={4} sm={3} lg={2}>
                {renderTopLeft()}
              </Grid>
              <Grid className={classes.topRightGridItem} item xs={12} sm={9} lg={10}>
                {renderTopRight()}
              </Grid>
            </Grid>
          )
        }
      </div>
      <div className={classes.bottomSection}>
        {children}
      </div>
    </div>
  )
}

ContentLayout.defaultProps = {
  accentColor: colors.white80,
}

export default ContentLayout
