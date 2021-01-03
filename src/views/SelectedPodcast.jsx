import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

import { getSelectedPodcast } from '../store/selectors'
import * as actions from '../store/actions'
import { channelSelectors, itemSelectors } from '../model/rss'

import * as typography from '../styling/typography'
import usePodcast from '../api/usePodcast'

import Error from './Error'
import Loading from './Loading'
import PodcastDetails from './PodcastDetails'

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
    color: theme.palette.grey[500],
    fontFamily: typography.mono,
    fontSize: '70%',
    marginTop: '1em',
  },
}))

const SelectedPodcast = () => {
  const dispatch = useDispatch()

  const deselectPodcast = () => dispatch(actions.selectPodcast())

  const classes = useStyles()

  const selectedPodcast = useSelector(getSelectedPodcast)

  const {error, rss} = usePodcast(selectedPodcast)

  const maybeItems = channelSelectors.v2.items(rss)

  const maybeLatestItem = maybeItems?.[0]
  console.log(JSON.stringify(maybeLatestItem, null, 2))

  const audioType = itemSelectors.v2.audioType(maybeLatestItem)
  const audioUrl = itemSelectors.v2.audioUrl(maybeLatestItem)

  React.useEffect(
    () => {
      if (!audioType || !audioUrl) return

      dispatch(actions.setAudio(audioUrl, audioType))
    },
    [audioType, audioUrl]
  )

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
            : !rss ? (<Loading />)
            : (
              <div>
                <div className={classes.details}>
                  <PodcastDetails />
                </div>
                <div className={classes.dump}>
                  <pre>{`${JSON.stringify(maybeLatestAudio, null, 2)}`}</pre>
                </div>
                <div className={classes.dump}>
                  <pre>{JSON.stringify(rss, null, 2)}</pre>
                </div>
              </div>
            )
        }
      </div>
    </Modal>
  )
}

export default SelectedPodcast
