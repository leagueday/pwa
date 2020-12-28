import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

import { getSelectedPodcast } from '../store/selectors'
import { selectPodcast } from '../store/actions'

import * as typography from '../styling/typography'
import usePodcast from '../api/usePodcast'

import Error from './Error'
import Loading from './Loading'

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    maxHeight: '80vh',
    maxWidth: '85vw',
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: theme.spacing(1),
    position: 'absolute',
    top: '50%',
    width: '85vw',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  dump: {
    fontFamily: typography.mono,
    fontSize: '80%',
  },
}))

const SelectedPodcast = () => {
  const dispatch = useDispatch()

  const deselectPodcast = () => dispatch(selectPodcast())

  const classes = useStyles()

  const selectedPodcast = useSelector(getSelectedPodcast)

  const {data, error} = usePodcast(selectedPodcast)

  return (
    <Modal
      open={!!selectedPodcast}
      onBackdropClick={deselectPodcast}
      onClose={deselectPodcast}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.content}>
        {
          error ? (<Error e={error} />)
            : !data ? (<Loading />)
            : (
              <div className={classes.dump}>
                <pre>
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )
        }
      </div>
    </Modal>
  )
}

export default SelectedPodcast
