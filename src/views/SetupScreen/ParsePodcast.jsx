import React from 'react'
import {useSelector} from 'react-redux'
import Color from 'color'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Modal from '@material-ui/core/Modal'
import Snackbar from '@material-ui/core/Snackbar'

import parsePodcast from '../../api/parsePodcast'
import queryPodcast from '../../api/queryPodcast'
import usePodcasts from '../../api/usePodcasts'
import {selectors} from '../../store'
import * as colors from '../../styling/colors'
import {addScrollStyle} from '../util'

const darkMagenta = Color(colors.magenta).darken(0.33).string()

const useStyles = makeStyles(theme => ({
  buttonCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  parseButton: {
    marginBottom: '0.5em',
  },
  parsePodcast: {
    display: 'flex',
    flexDirection: 'row',
  },
  podcast: {
    display: 'flex',
    flexDirection: 'row',
    '&:hover': {
      color: darkMagenta,
    },
  },
  podcastId: {
    marginRight: '2em',
  },
  podcastUrl: { },
  podcastsCol: addScrollStyle(darkMagenta, theme)({
    display: 'flex',
    flexDirection: 'column',
    fontSize: '85%',
    height: '100%',
    marginLeft: '2em',
    overflowY: 'auto',
  }),
  podcastQueryModal: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  podcastQueryModalButton: {
    marginLeft: 'auto',
  },
  podcastQueryModalButtonRow: {
    display: 'flex',
    width: '100%',
  },
  podcastQueryModalCard: {
    backgroundColor: colors.brandBlack,
    color: colors.white80,
    display: 'flex',
    flexDirection: 'column',
    width: '75%',
    padding: '0.5em',
  },
  podcastQueryModalLine: {
    marginBottom: '0.5em',
    maxWidth: '100%',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  queryButton: { },
  selectedPodcast: {
    color: colors.magenta,
    display: 'flex',
    flexDirection: 'row',
  },
}))

const PodcastQueryModal = ({isOpen, onClose, podcastData}) => {
  const classes = useStyles()

  console.log(podcastData)

  const leaguedayParseTimestamp = podcastData ? podcastData.t : '?'

  const [title, itemsLength, latestPubDate, channelImageUrl] = podcastData?.feed ? [
    podcastData.feed.title,
    podcastData.feed.items.length,
    podcastData.feed.items?.[0].isoDate,
    podcastData.feed.image.url,
  ] : [ '?', -1, '?', '?' ]

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={classes.podcastQueryModal}>
        <Card className={classes.podcastQueryModalCard}>
          <div className={classes.podcastQueryModalLine}>
            Title: {title}
          </div>
          <div className={classes.podcastQueryModalLine}>
            Item Count: {itemsLength}
          </div>
          <div className={classes.podcastQueryModalLine}>
            Latest Item Pub Date: {latestPubDate}
          </div>
          <div className={classes.podcastQueryModalLine}>
            LeagueDay parse timestamp: {leaguedayParseTimestamp}
          </div>
          <div className={classes.podcastQueryModalLine}>
            Channel Image URL: {channelImageUrl}
          </div>
          <div className={classes.podcastQueryModalButtonRow}>
            <Button className={classes.podcastQueryModalButton}
                    color="primary"
                    onClick={onClose}
                    size="small"
                    variant="contained"
            >
              Close
            </Button>
          </div>
        </Card>
      </div>
    </Modal>
  )
}

const ParsePodcast = ({className}) => {
  const classes = useStyles()

  const user = useSelector(selectors.getUser)
  const bearerToken = user?.token?.access_token

  const {data:podcasts} = usePodcasts()

  const [selectedPodcast, setSelectedPodcast] = React.useState({
    id: null,
    url: null,
  })

  const onPodcastClick = (id, url) => () => {
    setSelectedPodcast({id, url})
  }

  const isPodcastSelected = id => selectedPodcast.id === id

  const [snackState, setSnackState] = React.useState({
    open: false,
    message: null,
    error: null,
  })

  const [queryModalState, setQueryModalState] = React.useState({isOpen: false, podcastData: null })

  const closeSnack = () => {
    setSnackState({
      open: false,
      message: null,
      error: null,
    })
  }

  const snackSuccessfulParse = podcastUrl => () => {
    setSnackState({
      open: true,
      message: `completed ${podcastUrl}`,
      error: null,
    })
  }

  const snackFailedParse = err => {
    console.error('err', err)
    setSnackState({
      open: true,
      message: null,
      error: String(err),
    })
  }

  const snackFailedFetch = err => {
    console.error('err', err)
    setSnackState({
      open: true,
      message: null,
      error: String(err),
    })
  }

  const modalSuccessfulFetch = podcastData => {
    setQueryModalState({isOpen: true, podcastData})
  }

  const onParseClick = () => {
    parsePodcast(bearerToken, selectedPodcast.id, selectedPodcast.url).then(
      snackSuccessfulParse(selectedPodcast.url),
      snackFailedParse
    )
  }

  const onQueryClick = () => queryPodcast(bearerToken, selectedPodcast.id).then(
    modalSuccessfulFetch,
    snackFailedFetch
  )

  const closePodcastQueryModal = () => setQueryModalState({isOpen: false, podcastData: null})

  return (
    <Card className={cx(classes.parsePodcast, className)}>
      <div className={classes.buttonCol}>
        <Button
          className={classes.parseButton}
          color="primary"
          onClick={onParseClick}
          size="small"
          variant="contained">
          Parse
        </Button>
        <Button
          className={classes.queryButton}
          color="primary"
          onClick={onQueryClick}
          size="small"
          variant="contained">
          Fetch
        </Button>
      </div>
      <div className={classes.podcastsCol}>
        {
          podcasts && podcasts.map(
            ({id, url}) => (
              <div key={id}
                   className={isPodcastSelected(id) ? classes.selectedPodcast : classes.podcast}
                   onClick={onPodcastClick(id, url)}
              >
                <div className={classes.podcastId}>
                  {id}
                </div>
                <div className={classes.podcastUrl}>
                  {url}
                </div>
              </div>
            )
          )
        }
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1500}
        open={snackState.open}
        onClose={closeSnack}
        message={snackState.error ? snackState.error : snackState.message}
      />
      <PodcastQueryModal isOpen={queryModalState.isOpen}
                         onClose={closePodcastQueryModal}
                         podcastData={queryModalState.podcastData} />
    </Card>
  )
}

export default ParsePodcast
