import React from 'react'

import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import {colors} from '../../styling'
import ParsePodcast from './ParsePodcast'
import SetupMenu from './SetupMenu'
import SetupMyChannelsSeed from './SetupMyChannelsSeed'

const contentBySubject = {
  'parse-podcast': ParsePodcast,
  'seed-mylist': SetupMyChannelsSeed,
}

const useStyles = makeStyles({
  setupScreen: {
    backgroundColor: colors.lightGray,
    display: 'flex',
    flexDirection: 'row',
    margin: '1em',
    padding: '1em',
    width: '100%',
  },
  setupContent: {
    flex: 8,
    overflow: 'auto',
    padding: '0.5em',
    width: '100%',
  },
})

const NoContent = ({className}) => (<Card className={className} />)

const SetupScreen = ({subject}) => {
  const classes = useStyles()

  const Content = contentBySubject[subject] ?? NoContent

  return (
    <Card className={classes.setupScreen}>
      <SetupMenu subject={subject} />
      <Content className={classes.setupContent} />
    </Card>
  )
}

export default SetupScreen
