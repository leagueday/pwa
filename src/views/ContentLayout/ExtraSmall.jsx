import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { actions } from '../../store'
import Grid from '@material-ui/core/Grid'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { colors } from '../../styling'
import { addScrollStyle } from '../util'

// Top-Left/Right and Bottom-Scroller

const useStyles = makeStyles(theme => ({
  bottomSection: {
    flexGrow: 1,
    flexShrink: 1,
    width: '100%',
  },
  content: ({ accentColor }) =>
    addScrollStyle(
      accentColor,
      theme
    )({
      alignItems: 'stretch',
      display: 'flex',
      flexDirection: 'column',
      minHeigh: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
      paddingLeft: '0.25em',
    }),
  topSection: {
    position: 'relative',
    flexShrink: 0,
    width: '100%',
  },
  topRightGridItem: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

const ContentLayout = ({
  accentColor,
  children,
  renderTop,
  renderTopLeft,
  renderTopRight,
}) => {
  const classes = useStyles({ accentColor })
  const dispatch = useDispatch()

  return (
    <div className={classes.content}>
      <div className={classes.topSection}>
        <p
          onClick={() => dispatch(actions.pushHistory('/'))}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: '.85rem',
          }}
        >
          <ArrowBackIosIcon style={{ fontSize: 'inherit' }} />
          Go back
        </p>
        {renderTop ? (
          renderTop()
        ) : (
          <Grid container>
            <Grid item xs={4} sm={3} lg={2}>
              {renderTopLeft()}
            </Grid>
            <Grid
              className={classes.topRightGridItem}
              item
              xs={12}
              sm={9}
              lg={10}
            >
              {renderTopRight()}
            </Grid>
          </Grid>
        )}
      </div>
      <div className={classes.bottomSection}>{children}</div>
    </div>
  )
}

ContentLayout.defaultProps = {
  accentColor: colors.white80,
}

export default ContentLayout
