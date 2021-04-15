import React from 'react'
import {useDispatch} from 'react-redux'

import {makeStyles} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

import {actions} from '../../store'

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none',
  },
  logo: {
    cursor: 'pointer',
    maxWidth: '5em',
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '0.5em',
    width: '100%',
  },
  setupMenu: {
    alignItems: 'flex-start',
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    marginRight: '1em',
    padding: '0.5em',
  },
  title: {
    fontSize: '85%',
    fontWeight: theme.typography.weight.bold,
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
  },
}))

const SubjectButton = ({classes, focusedSubject, subject, subjectText}) => {
  const dispatch = useDispatch()
  const focusOnSubject = () => dispatch(actions.pushHistory(`/setup/${subject}`))

  const isFocused = focusedSubject === subject

  return (
    <Button
      className={classes.button}
      disabled={isFocused}
      color="primary"
      onClick={focusOnSubject}
      size="small"
      variant="contained"
    >
      {subjectText}
    </Button>
  )
}

const SubjectButtonRow = props => (
  <div className={props.classes.row}>
    <SubjectButton {...props} />
  </div>
)

const SetupMenu = ({subject}) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const goHome = () => dispatch(actions.pushHistory('/'))

  return (
    <Card className={classes.setupMenu}>
      <div className={classes.row}>
        <img className={classes.logo} onClick={goHome} src="/img/logo.png" />
        <div className={classes.title}>Setup Menu</div>
      </div>
      <SubjectButtonRow classes={classes} focusedSubject={subject} subject="seed-mylist" subjectText="Seed MyList" />
      <SubjectButtonRow classes={classes} focusedSubject={subject} subject="parse-podcast" subjectText="Parse Podcast" />
    </Card>
  )
}

export default SetupMenu
