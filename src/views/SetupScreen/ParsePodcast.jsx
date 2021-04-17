import React from 'react'
import {useSelector} from 'react-redux'
import Color from 'color'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
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
  parseButton: { },
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
  queryButton: { },
  selectedPodcast: {
    color: colors.magenta,
    display: 'flex',
    flexDirection: 'row',
  },
}))

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

  const xarsePodcast = () => Promise.reject('mock error local')

  const onParseClick = () => {
    parsePodcast(bearerToken, selectedPodcast.id, selectedPodcast.url).then(
      snackSuccessfulParse(selectedPodcast.url),
      snackFailedParse
    )
  }

  const onQueryClick = () => queryPodcast(bearerToken, selectedPodcast.id).then(
    response => console.log(response)
  )

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
    </Card>
  )
}

export default ParsePodcast
