import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'

import {makeStyles, useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Container from '@material-ui/core/Container'
import Modal from '@material-ui/core/Modal'

import { getSelectedPodcast } from '../store/selectors'
import * as actions from '../store/actions'
import * as colors from '../styling/colors'

import * as consts from './consts'
import PodcastDetails from './PodcastDetails'

const useStyles = makeStyles(theme => ({
  details: {
    maxHeight: '100%',
    width: '100%',
  },
  modalClientContainer: {
    alignItems: 'stretch',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${colors.bluishBlack}`,
    bottom: 0,
    boxShadow: theme.shadows[1],
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    outline: 'none',
    overflowX: 'hidden',
    overflowY: 'hidden',
    padding: theme.spacing(1),
    position: 'absolute',
    right: 0,
    top: consts.APPBAR_HEIGHT,
  },
  // modalClientContainerLarge: {
  //   top: '50%',
  //   left: '50%',
  //   maxHeight: '85vh',
  //   padding: '0 1em',
  //   transform: 'translate(-50%, -50%)'
  // },
  // modalClientContainerSmall: {
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   top: consts.APPBAR_HEIGHT,
  // },
}))

const SelectedPodcast = () => {
  const dispatch = useDispatch()

  const deselectPodcast = () => dispatch(actions.selectPodcast())

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const classes = useStyles()

  const selectedPodcast = useSelector(getSelectedPodcast)

  return (
    <Modal
      open={!!selectedPodcast}
      onBackdropClick={deselectPodcast}
      onClose={deselectPodcast}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      maxWidth="md"
    >
      <Container
        className={classes.modalClientContainer}
        maxWidth="md"
        disableGutters={smDown}
      >
        {
          (<PodcastDetails className={classes.details} />)
        }
      </Container>
    </Modal>
  )
}

export default SelectedPodcast
