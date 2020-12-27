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
  centerCol: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centerRow: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    height: '90%',
    padding: theme.spacing(2),
    width: '90%',
  },
  dump: {
    fontFamily: typography.mono,
    fontSize: '80%',
    maxHeight: '90vh',
    overflowY: 'scroll',
  },
  paper: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
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
      <div className={classes.paper}>
        <div className={classes.centerCol}>
          <div className={classes.centerRow}>
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
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SelectedPodcast
