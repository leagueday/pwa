import React from 'react'
import {useSelector} from 'react-redux'
import Color from 'color'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

import parsePodcast from '../../api/parsePodcast'
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

  const onParseClick = () => {
    parsePodcast(bearerToken, selectedPodcast.id, selectedPodcast.url)
  }

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
    </Card>
  )
}

export default ParsePodcast
