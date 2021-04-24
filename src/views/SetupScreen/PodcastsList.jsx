import React from 'react'
import { useSelector } from 'react-redux'
import Color from 'color'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'

import PodcastsListOperations from '../../api/PodcastsListOperations'
import { selectors } from '../../store'
import { colors } from '../../styling'
import { addScrollStyle } from '../util'

const darkMagenta = Color(colors.magenta).darken(0.33).string()

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  inlineButton: {
    height: '1.5em',
    margin: '0 0.5em',
  },
  instructions: {
    border: `1px solid ${darkMagenta}`,
    color: colors.white80,
    display: 'flex',
    flexDirection: 'column',
    margin: '1em',
    padding: '1em',
  },
  instructionsLine: {
    display: 'flex',
    marginBottom: '0.5em',
    width: '100%',
    ['&:last-child']: {
      marginBottom: 0,
    },
  },
  list: addScrollStyle(
    darkMagenta,
    theme
  )({
    display: 'flex',
    flexDirection: 'column',
    fontSize: '85%',
    height: '100%',
    overflow: 'auto',
    width: '100%',
  }),
  listRow: {
    display: 'flex',
    marginBottom: '0.25em',
    width: '100%',
  },
  listRowRemoveButtonCell: {
    marginRight: '0.5em',
    userSelect: 'none',
  },
  listRowUrl: {
    whiteSpace: 'nowrap',
  },
  nonClickable: {
    cursor: 'default',
  },
  podcastsList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1em',
    width: '100%',
  },
  title: {
    fontWeight: theme.typography.weight.bold,
    textDecoration: 'underline',
  },
}))

const useModalStyles = makeStyles(theme => ({
  button: {
    marginRight: '0.5em',
    ['&:last-child']: {
      marginRight: 0,
    },
  },
  buttonCell: {
    display: 'flex',
    marginLeft: 'auto',
  },
  buttonRow: {
    display: 'flex',
    marginTop: '0.5em',
    width: '100%',
  },
  instruction: {},
  modal: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: colors.brandBlack,
    color: colors.white80,
    display: 'flex',
    flexDirection: 'column',
    width: '75%',
    padding: '0.5em',
  },
  textField: {
    margin: '0.5em',
  },
  title: {
    fontWeight: theme.typography.weight.bold,
    textDecoration: 'underline',
  },
}))

const AddPodcastModal = ({ isOpen, onClose, onOk }) => {
  const classes = useModalStyles()

  const [url, setUrl] = React.useState('')

  const onUrlText = event => setUrl(event.target.value)

  const okDisabled = !url

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={classes.modal}>
        <Card className={classes.modalCard}>
          <div className={classes.title}>Add Podcast</div>
          <div className={classes.instruction}>Paste podcast URL:</div>
          <TextField
            className={classes.textField}
            onChange={onUrlText}
            value={url}
            variant="outlined"
          />
          <div className={classes.buttonRow}>
            <div className={classes.buttonCell}>
              <Button
                className={classes.button}
                color="primary"
                disabled={okDisabled}
                onClick={() => onOk(url)}
                size="small"
                variant="contained"
              >
                Ok
              </Button>
              <Button
                className={classes.button}
                color="primary"
                onClick={onClose}
                size="small"
                variant="contained"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  )
}

const RemovePodcastModal = ({ isOpen, onClose, onOk, url }) => {
  const classes = useModalStyles()

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={classes.modal}>
        <Card className={classes.modalCard}>
          <div className={classes.title}>Remove Podcast</div>
          <div className={classes.instruction}>
            Verify - remove podcast with URL:
          </div>
          <div className={classes.textField}>{url}</div>
          <div className={classes.buttonRow}>
            <div className={classes.buttonCell}>
              <Button
                className={classes.button}
                color="primary"
                onClick={() => onOk(url)}
                size="small"
                variant="contained"
              >
                Ok
              </Button>
              <Button
                className={classes.button}
                color="primary"
                onClick={onClose}
                size="small"
                variant="contained"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  )
}

// test subject -  https://anchor.fm/s/307396c/podcast/rss (too big)
const PodcastsList = ({ className }) => {
  const classes = useStyles()

  // main data, loaded by effect below
  const [podcastsList, setPodcastsList] = React.useState()

  // add/remove modals controller
  const [addRemovePodcastModal, setAddRemovePodcastModal] = React.useState({
    url: null,
    which: 'neither',
  })
  const showAddPodcastModal = () =>
    setAddRemovePodcastModal({
      url: null,
      which: 'add',
    })
  const showRemovePodcastModal = url =>
    setAddRemovePodcastModal({
      url,
      which: 'remove',
    })
  const hideAddRemovePodcastModal = () =>
    setAddRemovePodcastModal({
      url: null,
      which: 'neither',
    })

  // mechanism to refresh data
  const [refreshCounter, setRefreshCounter] = React.useState(1)
  const refreshData = () => setRefreshCounter(refreshCounter + 1)

  // request credentials
  const user = useSelector(selectors.getUser)
  const bearerToken = user?.token?.access_token

  // data loading effect
  React.useEffect(() => {
    if (bearerToken)
      PodcastsListOperations.fetch(bearerToken).then(list => {
        list.sort((a, b) => {
          const { url: aUrl } = a
          const { url: bUrl } = b
          return aUrl.localeCompare(bUrl)
        })
        setPodcastsList(list)
      })
  }, [bearerToken, refreshCounter])

  // wait to enable operations til data is arrivee'
  const isMaintenanceOpsEnabled = !!podcastsList

  // operations wrapper functions
  const onAddPodcast = url =>
    PodcastsListOperations.add(bearerToken, url)
      .then(refreshData)
      .then(hideAddRemovePodcastModal)
  const onRemovePodcast = url =>
    PodcastsListOperations.remove(bearerToken, url)
      .then(refreshData)
      .then(hideAddRemovePodcastModal)

  return (
    <Card className={cx(classes.podcastsList, className)}>
      <div className={classes.title}>Podcasts Master List</div>
      <div className={classes.instructions}>
        <div className={classes.instructionsLine}>Instructions:</div>
        <div className={classes.instructionsLine}>
          This list drives the fetch-parse-store job. When adding a podcast,
          there will be a delay before the data is picked up by the job. This
          can be avoided by using the "Parse Podcast" setup page to manually run
          the fetch-parse-store on the added podcast. Similarly, when removing a
          podcast from this list, the data will still be available from previous
          fetch-parse-store jobs, if any were successfully run on the podcast.
          To remove a podcast from the display, remove it from any Facets using
          the "Facets" setup page.
        </div>
        <div className={classes.instructionsLine}>
          Press "Remove" button to remove a podcast from the list.
        </div>
        <div className={classes.instructionsLine}>
          Press{' '}
          <span>
            <Button
              className={classes.inlineButton}
              disabled={!isMaintenanceOpsEnabled}
              color="primary"
              onClick={showAddPodcastModal}
              size="small"
              variant="contained"
            >
              Add Podcast
            </Button>
          </span>{' '}
          button to add a podcast to the list.
        </div>
      </div>
      <div className={classes.list}>
        {podcastsList &&
          podcastsList.map(({ url, disabled }) => (
            <div key={url} className={classes.listRow}>
              <div className={classes.listRowRemoveButtonCell}>
                <Button
                  className={classes.inlineButton}
                  disabled={!isMaintenanceOpsEnabled}
                  color="primary"
                  onClick={() => showRemovePodcastModal(url)}
                  size="small"
                  variant="contained"
                >
                  Remove
                </Button>
              </div>
              <div className={classes.listRowUrl}>{url}</div>
            </div>
          ))}
      </div>
      <AddPodcastModal
        isOpen={addRemovePodcastModal.which === 'add'}
        onClose={hideAddRemovePodcastModal}
        onOk={onAddPodcast}
      />
      <RemovePodcastModal
        isOpen={addRemovePodcastModal.which === 'remove'}
        onClose={hideAddRemovePodcastModal}
        onOk={onRemovePodcast}
        url={addRemovePodcastModal.url}
      />
    </Card>
  )
}

export default PodcastsList
