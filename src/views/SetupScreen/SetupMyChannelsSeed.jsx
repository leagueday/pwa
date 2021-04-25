import React from 'react'
import { useSelector } from 'react-redux'
import Color from 'color'
import cx from 'classnames'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

import alterUser from '../../api/alterUser.js'
import fetchUserData from '../../api/fetchUserData'
import useChannels from '../../api/useChannels'
import { selectors } from '../../store'
import { colors } from '../../styling'
import { addScrollStyle } from '../util'

const darkMagenta = Color(colors.magenta).darken(0.33).string()

const useStyles = makeStyles(theme => ({
  allChannels: addScrollStyle(
    darkMagenta,
    theme
  )({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1em',
    overflowX: 'hidden',
  }),
  field: {
    marginRight: '0.25em',
  },
  instructions: {
    color: colors.lightGray,
    padding: '0.5em',
  },
  instructionsItem: {
    marginBottom: '0.25em',
    width: '100%',
  },
  instructionsButtonItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0.25em',
    width: '100%',
  },
  listItem: {
    backgroundColor: colors.lightGray,
    display: 'flex',
    flexDirection: 'row',
    fontFamily: theme.typography.family.secondary,
    fontSize: '60%',
    height: '2em',
    justifyContent: 'space-between',
    marginBottom: '0.5em',
    maxWidth: '100%',
    minHeight: '2em',
    minWidth: 0,
    overflowX: 'hidden',
    padding: '0.25em',
    userSelect: 'none',
  },
  listedItem: {
    backgroundColor: darkMagenta,
  },
  saveButton: {
    marginLeft: 'auto',
    marginRight: '2em',
  },
  seedMyChannels: {
    display: 'flex',
    flexDirection: 'column',
  },
  setupMyChannelsSeed: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    whiteSpace: 'nowrap',
  },
}))

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,
  // backgroundColor: isDragging ? colors.lime : null,
  ...draggableStyle,
})

const getLeftListStyle = isDraggingOver => ({
  backgroundColor: colors.darkerGray,
  padding: '2.25em 0.25em 2.25em 0.25em',
})

const getRightListStyle = isDraggingOver => ({
  backgroundColor: colors.darkerGray,
  padding: '0.25em',
})

const SetupMyChannelsSeed = ({ className }) => {
  const classes = useStyles()

  const user = useSelector(selectors.getUser)
  const bearerToken = user?.token?.access_token

  const { list } = useChannels()

  const [seedList, setSeedlist] = React.useState([])
  console.log(seedList)

  React.useEffect(
    // null bearer token -> anon user data
    () => {
      if (list && seedList.length === 0)
        fetchUserData().then(maybeData => {
          if (NODE_ENV === 'development') console.log('user data', maybeData)
          if (typeof maybeData === 'object') {
            setSeedlist(maybeData.my)
          }
        })
    },
    [list, seedList]
  )

  const add = (destinationIndex, tagMoving, nextList) => {
    if (!nextList) nextList = seedList

    setSeedlist(
      nextList
        .slice(0, destinationIndex)
        .concat([{ id: tagMoving, kind: 'channel' }])
        .concat(nextList.slice(destinationIndex))
    )
  }

  const remove = sourceIndex => {
    setSeedlist(
      seedList.slice(0, sourceIndex).concat(seedList.slice(sourceIndex + 1))
    )
  }

  const reorder = (destinationIndex, sourceIndex) => {
    if (destinationIndex === sourceIndex) return

    const { id } = seedList[sourceIndex]

    const trimmedList = seedList
      .slice(0, sourceIndex)
      .concat(seedList.slice(sourceIndex + 1))

    add(destinationIndex, id, trimmedList)
  }

  const onDragEnd = result => {
    console.log('onDragEnd', result)

    if (result.destination.droppableId === 'seedList') {
      if (result.source.droppableId === 'seedList') {
        reorder(result.destination.index, result.source.index)
      } else if (result.source.droppableId === 'allChannels') {
        add(result.destination.index, result.draggableId)
      }
    } else if (result.destination.droppableId === 'allChannels') {
      if (result.source.droppableId === 'seedList') {
        remove(result.source.index)
      }
    }
  }

  const getIsOnDraftList = tag =>
    seedList && seedList.findIndex(({ id }) => id === tag) >= 0

  const onSave = () => {
    console.log('onSave')

    alterUser(bearerToken, 'ANON', { my: seedList }).then(
      window.location.reload(false)
    )
  }

  return (
    <Card className={cx(classes.setupMyChannelsSeed, className)}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.seedMyChannels}>
          <div className={classes.title}>MyChannels Seed for</div>
          <div className={classes.title}>New or Anonymous Users</div>
          <Droppable droppableId="seedList">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getLeftListStyle(snapshot.isDraggingOver)}
              >
                {seedList &&
                  seedList.map(({ kind, id }, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <Card
                            className={cx(classes.listItem, classes.listedItem)}
                          >
                            {id}
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
              </div>
            )}
          </Droppable>
        </div>
        <div className={classes.allChannels}>
          <div className={classes.title}>All Defined Channels</div>
          <Droppable droppableId="allChannels">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getRightListStyle(snapshot.isDraggingOver)}
              >
                {list.map((listItem, index) =>
                  getIsOnDraftList(listItem.tag) ? (
                    <Card
                      className={cx(classes.listItem, classes.listedItem)}
                      key={listItem.tag}
                    >
                      <div className={classes.field}>{listItem.tag}</div>
                      <div className={classes.field}>{listItem.title}</div>
                      <div className={classes.field}>
                        {listItem.children.length === 0
                          ? 'aggregator'
                          : 'broadcaster'}
                      </div>
                    </Card>
                  ) : (
                    <Draggable
                      key={listItem.tag}
                      draggableId={listItem.tag}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <Card
                            className={cx(classes.listItem)}
                            key={listItem.tag}
                          >
                            <div className={classes.field}>{listItem.tag}</div>
                            <div className={classes.field}>
                              {listItem.title}
                            </div>
                            <div className={classes.field}>
                              {listItem.children.length === 0
                                ? 'aggregator'
                                : 'broadcaster'}
                            </div>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  )
                )}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <div className={classes.instructions}>
        <div className={classes.instructionsItem}>
          ▫Drag items within the left-hand side to reorder.
        </div>
        <div className={classes.instructionsItem}>
          ▫Drag items from All Defined Channels to the left-hand side to add.
        </div>
        <div className={classes.instructionsItem}>
          ▫Drag items from the left-hand side to All Defined Channels to remove.
        </div>
        <div className={classes.instructionsItem}>
          ▫Refresh or leave page to cancel.
        </div>
        <div className={classes.instructionsItem}>▫Click Save to confirm:</div>
        <div className={classes.instructionsButtonItem}>
          <Button
            className={classes.saveButton}
            color="primary"
            onClick={onSave}
            size="small"
            variant="contained"
          >
            Save
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default SetupMyChannelsSeed
